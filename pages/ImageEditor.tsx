import React, { useState } from 'react';
import { Camera, Upload, Wand2, Download, AlertCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { editImage } from '../services/geminiService';

const ImageEditor: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size too large. Please keep it under 5MB.");
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setResultImage(null); // Reset result when new image uploaded
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = async () => {
    if (!selectedImage || !prompt) {
      toast.error("Please upload an image and enter a prompt.");
      return;
    }

    setLoading(true);
    try {
      const result = await editImage(selectedImage, prompt);
      if (result) {
        setResultImage(result);
        toast.success("Image generated successfully!");
      } else {
        toast.error("Could not generate image. Try a different prompt.");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
          <Camera className="text-teal-600" /> Art Therapy
        </h1>
        <p className="text-slate-600 mt-2">
          Use AI to visualize calmness or creatively express your emotions. 
          Upload an image and ask the AI to change it (e.g., "Add a sunset background", "Make it look like a painting").
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h2 className="text-lg font-bold text-slate-900 mb-4">1. Upload Image</h2>
            <div className="flex items-center justify-center w-full">
              <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-slate-300 border-dashed rounded-lg cursor-pointer bg-slate-50 hover:bg-slate-100 transition-colors">
                {selectedImage ? (
                  <img src={selectedImage} alt="Preview" className="h-full object-contain p-2" />
                ) : (
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-10 h-10 mb-3 text-slate-400" />
                    <p className="mb-2 text-sm text-slate-500"><span className="font-semibold">Click to upload</span></p>
                    <p className="text-xs text-slate-500">PNG, JPG (MAX. 5MB)</p>
                  </div>
                )}
                <input id="dropzone-file" type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
              </label>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h2 className="text-lg font-bold text-slate-900 mb-4">2. Describe Change</h2>
            <div className="space-y-4">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="E.g., Make the sky purple, add a cat in the corner, turn this into a sketch..."
                className="w-full rounded-lg border-slate-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 p-3 min-h-[100px]"
              />
              <button
                onClick={handleEdit}
                disabled={loading || !selectedImage || !prompt}
                className="w-full flex items-center justify-center bg-teal-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {loading ? (
                  <>Processing...</>
                ) : (
                  <><Wand2 className="mr-2 h-5 w-5" /> Generate Magic</>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Output Section */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col h-full">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Result</h2>
          <div className="flex-1 bg-slate-50 rounded-xl flex items-center justify-center border border-slate-200 min-h-[400px] relative overflow-hidden">
            {loading ? (
              <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-teal-200 border-t-teal-600 rounded-full animate-spin"></div>
                <p className="text-slate-500 font-medium animate-pulse">AI is reimagining your image...</p>
              </div>
            ) : resultImage ? (
              <img src={resultImage} alt="Edited Result" className="max-w-full max-h-full object-contain" />
            ) : (
              <div className="text-center p-8 text-slate-400">
                <Camera className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p>Your creation will appear here</p>
              </div>
            )}
          </div>
          {resultImage && (
             <a 
               href={resultImage} 
               download="stress-meter-art.png"
               className="mt-4 flex items-center justify-center w-full border border-slate-300 text-slate-700 px-4 py-3 rounded-lg font-medium hover:bg-slate-50 transition-colors"
             >
               <Download className="mr-2 h-5 w-5" /> Download Art
             </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageEditor;
