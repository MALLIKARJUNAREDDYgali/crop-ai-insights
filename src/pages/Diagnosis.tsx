
import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { Loader2, Upload, Virus } from 'lucide-react';
import { toast } from 'sonner';
import ResultCard from '@/components/ResultCard';
import { Card } from '@/components/ui/card';

interface DiseaseResult {
  diseaseName: string;
  confidence: number;
  description: string;
  treatment: string[];
  prevention: string[];
}

const Diagnosis = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [result, setResult] = useState<DiseaseResult | null>(null);

  // Mock API call for disease detection
  const detectDisease = async (file: File): Promise<DiseaseResult> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Random disease outcome for demonstration purposes
        const diseases = [
          {
            diseaseName: 'Powdery Mildew',
            confidence: 92.7,
            description: 'Powdery mildew is a fungal disease that affects a wide range of plants. It appears as a white to gray powdery growth on leaf surfaces, stems, and sometimes flowers and fruit.',
            treatment: [
              'Apply fungicides that contain sulfur, neem oil, or potassium bicarbonate',
              'Remove and destroy infected plant parts',
              'Increase air circulation around plants',
              'Apply milk spray (1:10 milk to water ratio) as an organic treatment'
            ],
            prevention: [
              'Plant resistant varieties when available',
              'Ensure proper spacing between plants for good air circulation',
              'Avoid overhead watering to keep foliage dry',
              'Maintain proper sanitation by removing plant debris'
            ]
          },
          {
            diseaseName: 'Early Blight',
            confidence: 89.3,
            description: 'Early blight is a common fungal disease that affects plants in the nightshade family, particularly tomatoes and potatoes. It appears as dark brown spots with concentric rings that form a "bull\'s-eye" pattern.',
            treatment: [
              'Apply copper-based fungicides or other approved fungicides',
              'Remove and destroy infected leaves and plants',
              'Apply compost tea as an organic treatment',
              'Maintain adequate plant nutrition through balanced fertilization'
            ],
            prevention: [
              'Use disease-free seeds and plants',
              'Practice crop rotation (3-4 year cycle)',
              'Mulch around plants to prevent soil splash',
              'Stake plants to improve air circulation'
            ]
          },
          {
            diseaseName: 'Bacterial Leaf Spot',
            confidence: 87.5,
            description: 'Bacterial leaf spot is a common disease affecting a wide variety of plants. It appears as water-soaked spots that later turn dark brown or black with yellow halos.',
            treatment: [
              'Apply copper-based bactericides early in disease development',
              'Remove infected plant parts and destroy them',
              'Avoid overhead watering to prevent spread',
              'Apply streptomycin sulfate for severe cases (where legally permitted)'
            ],
            prevention: [
              'Use disease-free seeds and resistant varieties',
              'Practice crop rotation (2-3 year cycle)',
              'Avoid working with plants when they are wet',
              'Disinfect garden tools regularly'
            ]
          },
          {
            diseaseName: 'Septoria Leaf Spot',
            confidence: 91.2,
            description: 'Septoria leaf spot is a fungal disease commonly affecting tomatoes and other plants. It appears as numerous small, circular spots with dark brown margins and lighter centers.',
            treatment: [
              'Apply fungicides containing chlorothalonil, copper, or mancozeb',
              'Remove infected leaves immediately',
              'Apply compost tea as an organic preventative',
              'Maintain proper plant nutrition'
            ],
            prevention: [
              'Practice crop rotation (at least 2 years)',
              'Keep leaves dry by using drip irrigation',
              'Space plants properly for air circulation',
              'Apply mulch to prevent soil splashing onto leaves'
            ]
          }
        ];
        
        const randomDisease = diseases[Math.floor(Math.random() * diseases.length)];
        resolve(randomDisease);
      }, 2000);
    });
  };

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;
    
    const file = acceptedFiles[0];
    
    // Check file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }
    
    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size should be less than 5MB');
      return;
    }
    
    // Display preview
    const objectUrl = URL.createObjectURL(file);
    setPreviewImage(objectUrl);
    
    // Reset previous results
    setResult(null);
    
    // Process image
    setIsLoading(true);
    try {
      // In a real app, you would send this file to your backend API
      const diseaseResult = await detectDisease(file);
      setResult(diseaseResult);
      toast.success('Disease analysis complete!');
    } catch (error) {
      console.error('Error analyzing image:', error);
      toast.error('Error analyzing image. Please try again.');
    } finally {
      setIsLoading(false);
    }
    
    // Cleanup function to revoke the object URL to avoid memory leaks
    return () => URL.revokeObjectURL(objectUrl);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    maxFiles: 1
  });

  const resetAnalysis = () => {
    if (previewImage) {
      URL.revokeObjectURL(previewImage);
    }
    setPreviewImage(null);
    setResult(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Plant Disease Diagnosis</h1>
          <p className="text-gray-600">
            Upload an image of your plant to identify diseases and get treatment recommendations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Card className="p-6 border-2 border-dashed bg-white">
              <div
                {...getRootProps()}
                className={`flex flex-col items-center justify-center p-8 rounded-lg cursor-pointer transition-all ${
                  isDragActive 
                    ? 'bg-primary/5 border-primary' 
                    : 'bg-gray-50 border-gray-200 hover:bg-primary/5 hover:border-primary'
                }`}
              >
                <input {...getInputProps()} />
                <Upload className="h-10 w-10 text-gray-400 mb-4" />
                <p className="text-center text-gray-600 mb-2">
                  {isDragActive
                    ? "Drop the image here"
                    : "Drag & drop a plant image here, or click to select"
                }
                </p>
                <p className="text-xs text-gray-500 text-center">
                  Supports: JPG, JPEG, PNG, WebP (Max 5MB)
                </p>
              </div>
            </Card>

            {previewImage && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Uploaded Image</h3>
                <div className="relative border rounded-lg overflow-hidden">
                  <img 
                    src={previewImage} 
                    alt="Plant preview" 
                    className="max-h-80 w-full object-contain bg-gray-100"
                  />
                </div>
                <div className="flex justify-between">
                  <Button variant="outline" onClick={resetAnalysis}>
                    Upload Different Image
                  </Button>
                  {!isLoading && !result && (
                    <Button onClick={() => onDrop([])}>
                      Analyze Image
                    </Button>
                  )}
                </div>
              </div>
            )}

            {isLoading && (
              <div className="p-4 text-center">
                <Loader2 className="animate-spin h-8 w-8 mx-auto text-primary mb-4" />
                <p className="text-gray-600">Analyzing image...</p>
                <p className="text-xs text-gray-500 mt-1">This may take a moment</p>
              </div>
            )}
          </div>

          <div>
            {result ? (
              <div className="space-y-4">
                <ResultCard title="Diagnosis Result">
                  <div className="mb-4">
                    <div className="flex items-center mb-3">
                      <Virus className="h-5 w-5 text-red-500 mr-2" />
                      <h3 className="font-semibold text-lg text-gray-800">{result.diseaseName}</h3>
                    </div>
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-gray-600">Confidence</span>
                        <span className="text-sm font-medium">{result.confidence.toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full"
                          style={{ width: `${result.confidence}%` }}
                        />
                      </div>
                    </div>
                    <div className="mb-4">
                      <p className="text-gray-700">{result.description}</p>
                    </div>
                  </div>
                </ResultCard>

                <ResultCard title="Treatment Recommendations">
                  <ul className="list-disc list-inside space-y-2 pl-1">
                    {result.treatment.map((item, index) => (
                      <li key={index} className="text-gray-700">{item}</li>
                    ))}
                  </ul>
                </ResultCard>

                <ResultCard title="Prevention Measures">
                  <ul className="list-disc list-inside space-y-2 pl-1">
                    {result.prevention.map((item, index) => (
                      <li key={index} className="text-gray-700">{item}</li>
                    ))}
                  </ul>
                </ResultCard>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center border-2 border-dashed border-gray-200 rounded-lg p-8 bg-gray-50">
                <div className="text-center">
                  <Virus className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                  <h3 className="text-lg font-medium text-gray-600 mb-1">No Diagnosis Yet</h3>
                  <p className="text-gray-500">
                    Upload a clear image of the affected plant part to get disease diagnosis and treatment recommendations
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-12 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Tips for Better Diagnosis</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-gray-800 mb-2">Taking Good Plant Photos</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>Take photos in natural daylight</li>
                <li>Include both healthy and affected parts for comparison</li>
                <li>Take close-up shots of specific symptoms</li>
                <li>Capture multiple angles of the affected area</li>
                <li>Ensure the image is clear and in focus</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-gray-800 mb-2">For Accurate Results</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>Clean the leaves before taking photos</li>
                <li>Remove any water droplets from the plant</li>
                <li>Avoid shadows in the image</li>
                <li>Include as much of the symptomatic area as possible</li>
                <li>For comprehensive analysis, provide multiple images</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Diagnosis;
