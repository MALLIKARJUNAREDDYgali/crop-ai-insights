
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
import { Loader2, Fertilizer as FertilizerIcon, Check } from 'lucide-react';
import { toast } from 'sonner';
import ResultCard from '@/components/ResultCard';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Form schema with validation
const formSchema = z.object({
  cropName: z.string().min(1, { message: 'Crop name is required' }),
  soilN: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
    message: 'Nitrogen must be a positive number',
  }),
  soilP: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
    message: 'Phosphorus must be a positive number',
  }),
  soilK: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
    message: 'Potassium must be a positive number',
  }),
  soilPH: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 0 && Number(val) <= 14, {
    message: 'pH must be a number between 0 and 14',
  }),
  growthStage: z.string().min(1, { message: 'Growth stage is required' }),
});

type FormValues = z.infer<typeof formSchema>;

const cropOptions = ['Rice', 'Wheat', 'Maize', 'Cotton', 'Sugarcane', 'Potato', 'Tomato', 'Soybean', 'Sunflower'];
const growthStages = ['Seedling', 'Vegetative', 'Flowering', 'Fruiting', 'Maturity'];

// Mock API response function (simulating backend ML response)
const getMockApiResponse = (formData: FormValues) => {
  return new Promise<{
    recommendedFertilizer: string;
    n: number;
    p: number;
    k: number;
    applicationMethod: string;
    applicationTiming: string;
    additionalNotes: string;
  }>((resolve) => {
    setTimeout(() => {
      // This is where you would call your actual ML API
      // For now, we'll return mock data based on the form input
      
      // Convert input strings to numbers
      const soilN = Number(formData.soilN);
      const soilP = Number(formData.soilP);
      const soilK = Number(formData.soilK);
      const soilPH = Number(formData.soilPH);
      
      let fertilizer = '';
      let method = '';
      let timing = '';
      let notes = '';
      let nRec = 0, pRec = 0, kRec = 0;
      
      // Logic for fertilizer recommendation based on crop and soil nutrients
      if (soilN < 30) {
        if (formData.cropName === 'Rice' || formData.cropName === 'Wheat') {
          fertilizer = 'Urea + DAP';
          nRec = 120;
          pRec = 60;
          kRec = 40;
        } else if (formData.cropName === 'Tomato' || formData.cropName === 'Potato') {
          fertilizer = 'NPK 14-35-14';
          nRec = 100;
          pRec = 90;
          kRec = 80;
        } else {
          fertilizer = 'Ammonium Sulfate';
          nRec = 80;
          pRec = 40;
          kRec = 40;
        }
      } else if (soilP < 15) {
        if (formData.cropName === 'Maize' || formData.cropName === 'Cotton') {
          fertilizer = 'NPK 10-26-26';
          nRec = 60;
          pRec = 80;
          kRec = 60;
        } else {
          fertilizer = 'Single Super Phosphate + MOP';
          nRec = 40;
          pRec = 80;
          kRec = 40;
        }
      } else if (soilK < 20) {
        fertilizer = 'Muriate of Potash (MOP)';
        nRec = 40;
        pRec = 40;
        kRec = 80;
      } else if (soilPH < 6.0) {
        fertilizer = 'Dolomite Lime + NPK 20-20-20';
        nRec = 60;
        pRec = 60;
        kRec = 60;
        notes = 'Apply lime 2 weeks before fertilizer application to raise soil pH';
      } else if (soilPH > 7.5) {
        fertilizer = 'Ammonium Sulfate + SSP';
        nRec = 70;
        pRec = 60;
        kRec = 40;
        notes = 'Consider adding gypsum to help reduce soil pH over time';
      } else {
        fertilizer = 'Balanced NPK 17-17-17';
        nRec = 60;
        pRec = 60;
        kRec = 60;
      }

      // Application method based on growth stage
      switch (formData.growthStage) {
        case 'Seedling':
          method = 'Basal application (mixed with soil before planting)';
          timing = 'Apply before or during planting';
          break;
        case 'Vegetative':
          method = 'Side dressing (applied in bands alongside the growing plants)';
          timing = 'Apply when plants show 4-6 true leaves';
          break;
        case 'Flowering':
          method = 'Foliar spray (diluted solution sprayed on leaves)';
          timing = 'Apply early morning or late afternoon during flowering stage';
          break;
        case 'Fruiting':
          method = 'Drip fertigation (applying through irrigation system)';
          timing = 'Apply once every 7-10 days during fruiting';
          break;
        case 'Maturity':
          method = 'Minimal application recommended';
          timing = 'Reduce fertilizer application as plants reach maturity';
          notes += notes ? ' Excessive fertilization at this stage may delay harvest.' : 'Excessive fertilization at this stage may delay harvest.';
          break;
        default:
          method = 'Broadcast application (spreading evenly across soil surface)';
          timing = 'Apply according to soil test recommendations';
      }
      
      resolve({
        recommendedFertilizer: fertilizer,
        n: nRec,
        p: pRec,
        k: kRec,
        applicationMethod: method,
        applicationTiming: timing,
        additionalNotes: notes || 'Water thoroughly after applying fertilizer to prevent root burn.'
      });
    }, 1500); // Simulate API delay
  });
};

const Fertilizer = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<null | {
    recommendedFertilizer: string;
    n: number;
    p: number;
    k: number;
    applicationMethod: string;
    applicationTiming: string;
    additionalNotes: string;
  }>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cropName: '',
      soilN: '',
      soilP: '',
      soilK: '',
      soilPH: '',
      growthStage: '',
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    try {
      // Call to ML API (mocked for now)
      const response = await getMockApiResponse(data);
      setResult(response);
      toast.success('Fertilizer recommendation ready!');
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred while generating recommendations');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Fertilizer Recommendations</h1>
          <p className="text-gray-600">
            Enter your soil nutrient levels and crop information to receive AI-powered fertilizer recommendations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="cropName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Crop Name</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select crop name" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {cropOptions.map((crop) => (
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

                <div className="grid grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="soilN"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nitrogen (N)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="mg/kg" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="soilP"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phosphorus (P)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="mg/kg" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="soilK"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Potassium (K)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="mg/kg" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="soilPH"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Soil pH Level</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="pH (0-14)" 
                          min="0"
                          max="14"
                          step="0.1"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="growthStage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current Growth Stage</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select growth stage" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {growthStages.map((stage) => (
                            <SelectItem key={stage} value={stage}>
                              {stage}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
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
                    'Get Fertilizer Recommendations'
                  )}
                </Button>
              </form>
            </Form>
          </div>

          <div>
            {result ? (
              <div className="space-y-4">
                <ResultCard title="Fertilizer Recommendation">
                  <div className="flex items-center mb-4">
                    <FertilizerIcon className="h-5 w-5 text-primary mr-2" />
                    <h3 className="font-semibold text-lg">{result.recommendedFertilizer}</h3>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="text-sm text-gray-600 mb-2">Recommended NPK Ratio (kg/ha)</h4>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="bg-blue-50 p-3 rounded text-center">
                        <div className="text-blue-600 font-semibold text-lg">{result.n}</div>
                        <div className="text-xs text-gray-600">Nitrogen (N)</div>
                      </div>
                      <div className="bg-green-50 p-3 rounded text-center">
                        <div className="text-green-600 font-semibold text-lg">{result.p}</div>
                        <div className="text-xs text-gray-600">Phosphorus (P)</div>
                      </div>
                      <div className="bg-purple-50 p-3 rounded text-center">
                        <div className="text-purple-600 font-semibold text-lg">{result.k}</div>
                        <div className="text-xs text-gray-600">Potassium (K)</div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium text-gray-800">Application Method</h4>
                      <p className="text-gray-600">{result.applicationMethod}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-800">Timing</h4>
                      <p className="text-gray-600">{result.applicationTiming}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-800">Additional Notes</h4>
                      <div className="bg-amber-50 p-3 rounded border-l-2 border-amber-500">
                        <p className="text-gray-700">{result.additionalNotes}</p>
                      </div>
                    </div>
                  </div>
                </ResultCard>

                <ResultCard title="Best Practices">
                  <ul className="space-y-2">
                    <li className="flex">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                      <span>Always perform a soil test before applying fertilizers</span>
                    </li>
                    <li className="flex">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                      <span>Apply fertilizers in the early morning or late afternoon</span>
                    </li>
                    <li className="flex">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                      <span>Avoid applying fertilizers before heavy rainfall</span>
                    </li>
                    <li className="flex">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                      <span>Follow the recommended application rates to prevent nutrient runoff</span>
                    </li>
                    <li className="flex">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                      <span>Consider using slow-release fertilizers for extended nutrient availability</span>
                    </li>
                  </ul>
                </ResultCard>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center border-2 border-dashed border-gray-200 rounded-lg p-8 bg-gray-50">
                <div className="text-center">
                  <FertilizerIcon className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                  <h3 className="text-lg font-medium text-gray-600 mb-1">No Data Yet</h3>
                  <p className="text-gray-500">
                    Fill out the form to get tailored fertilizer recommendations for your crops
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

export default Fertilizer;
