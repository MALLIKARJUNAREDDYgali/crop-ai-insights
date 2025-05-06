
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Sprout } from 'lucide-react';
import { toast } from 'sonner';
import ResultCard from '@/components/ResultCard';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Form schema with validation
const formSchema = z.object({
  cropType: z.string().min(1, { message: 'Crop type is required' }),
  soilType: z.string().min(1, { message: 'Soil type is required' }),
  temperature: z.string().refine((val) => !isNaN(Number(val)), {
    message: 'Temperature must be a number',
  }),
  humidity: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 0 && Number(val) <= 100, {
    message: 'Humidity must be a number between 0 and 100',
  }),
  rainfall: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
    message: 'Rainfall must be a positive number',
  }),
});

type FormValues = z.infer<typeof formSchema>;

const cropTypes = ['Rice', 'Wheat', 'Maize', 'Cotton', 'Sugarcane', 'Potato', 'Tomato'];
const soilTypes = ['Clay', 'Sandy', 'Loamy', 'Silt', 'Peaty', 'Chalky', 'Clayey Loam'];

// Mock API response function (simulating backend ML response)
const getMockApiResponse = (formData: FormValues) => {
  return new Promise<{
    recommendedCrops: string[];
    growthPeriod: string;
    waterRequirements: string;
    soilSuitability: string;
    tips: string[];
  }>((resolve) => {
    setTimeout(() => {
      // This is where you would call your actual ML API
      // For now, we'll return mock data based on the form input
      
      let waterReq = 'Medium';
      if (Number(formData.rainfall) < 50) waterReq = 'High';
      if (Number(formData.rainfall) > 150) waterReq = 'Low';
      
      const recommendations: Record<string, any> = {
        Rice: {
          crops: ['Rice', 'Water Chestnut', 'Taro'],
          period: '120-150 days',
          water: 'High',
          soil: formData.soilType === 'Clay' ? 'Excellent' : 'Good',
          tips: [
            'Maintain 2-5 cm of standing water in fields',
            'Apply fertilizers in split doses',
            'Monitor for rice blast and stem borers'
          ]
        },
        Wheat: {
          crops: ['Wheat', 'Barley', 'Rye'],
          period: '100-130 days',
          water: 'Medium',
          soil: formData.soilType === 'Loamy' ? 'Excellent' : 'Good',
          tips: [
            'Seed at the appropriate depth (1-2 inches)',
            'Apply nitrogen fertilizer at critical growth stages',
            'Control weeds early in the growing season'
          ]
        },
        Maize: {
          crops: ['Maize', 'Sorghum', 'Millet'],
          period: '90-120 days',
          water: 'Medium',
          soil: formData.soilType === 'Sandy Loam' ? 'Excellent' : 'Good',
          tips: [
            'Ensure proper spacing between plants',
            'Apply balanced fertilization',
            'Control fall armyworm and corn earworm'
          ]
        },
        Cotton: {
          crops: ['Cotton', 'Sunflower', 'Sesame'],
          period: '150-180 days',
          water: 'Medium-Low',
          soil: formData.soilType === 'Loamy' ? 'Excellent' : 'Good',
          tips: [
            'Manage soil moisture carefully during flowering',
            'Monitor for bollworms and aphids',
            'Apply potassium for better fiber quality'
          ]
        },
        default: {
          crops: ['Corn', 'Soybeans', 'Alfalfa'],
          period: '90-120 days',
          water: waterReq,
          soil: 'Moderate to Good',
          tips: [
            'Regularly monitor soil moisture levels',
            'Apply organic matter to improve soil structure',
            'Implement crop rotation for better pest management',
            'Consider intercropping compatible plants'
          ]
        }
      };
      
      const result = recommendations[formData.cropType] || recommendations.default;
      
      resolve({
        recommendedCrops: result.crops,
        growthPeriod: result.period,
        waterRequirements: result.water,
        soilSuitability: result.soil,
        tips: result.tips
      });
    }, 1500); // Simulate API delay
  });
};

const CropManagement = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<null | {
    recommendedCrops: string[];
    growthPeriod: string;
    waterRequirements: string;
    soilSuitability: string;
    tips: string[];
  }>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cropType: '',
      soilType: '',
      temperature: '',
      humidity: '',
      rainfall: '',
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    try {
      // Call to ML API (mocked for now)
      const response = await getMockApiResponse(data);
      setResult(response);
      toast.success('Analysis complete!');
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred during analysis');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Crop Management</h1>
          <p className="text-gray-600">
            Enter your field conditions below to receive AI-powered crop recommendations and management tips.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="cropType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Crop Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select crop type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {cropTypes.map((crop) => (
                            <SelectItem key={crop} value={crop}>
                              {crop}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="soilType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Soil Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select soil type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {soilTypes.map((soil) => (
                            <SelectItem key={soil} value={soil}>
                              {soil}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="temperature"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Temperature (°C)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="Enter average temperature" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="humidity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Humidity (%)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="Enter average humidity" 
                          min="0"
                          max="100"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="rainfall"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Rainfall (mm)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="Enter average rainfall" 
                          min="0"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    'Get Recommendations'
                  )}
                </Button>
              </form>
            </Form>
          </div>

          <div>
            {result ? (
              <div className="space-y-4">
                <ResultCard title="Crop Recommendations">
                  <div className="flex items-center mb-3">
                    <Sprout className="h-5 w-5 text-primary mr-2" />
                    <h4 className="font-semibold text-gray-800">Recommended Crops</h4>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {result.recommendedCrops.map((crop) => (
                      <span key={crop} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                        {crop}
                      </span>
                    ))}
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Growth Period:</span>
                      <span className="font-medium">{result.growthPeriod}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Water Requirements:</span>
                      <span className="font-medium">{result.waterRequirements}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Soil Suitability:</span>
                      <span className="font-medium">{result.soilSuitability}</span>
                    </div>
                  </div>
                </ResultCard>

                <ResultCard title="Management Tips">
                  <ul className="space-y-2">
                    {result.tips.map((tip, index) => (
                      <li key={index} className="flex items-start">
                        <span className="inline-block h-5 w-5 bg-primary/10 text-primary rounded-full text-xs flex items-center justify-center mr-2 mt-0.5">
                          {index + 1}
                        </span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </ResultCard>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center border-2 border-dashed border-gray-200 rounded-lg p-8 bg-gray-50">
                <div className="text-center">
                  <Sprout className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                  <h3 className="text-lg font-medium text-gray-600 mb-1">No Data Yet</h3>
                  <p className="text-gray-500">
                    Fill out the form and submit to see AI-powered crop recommendations
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CropManagement;
