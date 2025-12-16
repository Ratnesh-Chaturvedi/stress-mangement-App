import React, { useState } from 'react';
import { Camera, Upload, Wand2, Download } from 'lucide-react';
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
        setResultImage(null);
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
    <div className="container" style={{ padding: '2rem 1rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.875rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-main)' }}>
          <Camera color="var(--primary)" /> Art Therapy
        </h1>
        <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>
          Upload an image and ask the AI to change it creatively to visualize calmness.
        </p>
      </div>

      <div className="grid grid-cols-1 md-grid-cols-2 gap-8">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="card">
            <h2 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '1rem' }}>1. Upload Image</h2>
            <label style={{ 
              border: '2px dashed var(--border-color)', borderRadius: 'var(--radius-md)', 
              height: '200px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', background: '#f8fafc' 
            }}>
              {selectedImage ? (
                <img src={selectedImage} alt="Preview" style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} />
              ) : (
                <>
                  <Upload size={32} color="#94a3b8" style={{ marginBottom: '0.5rem' }} />
                  <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Click to upload</span>
                </>
              )}
              <input type="file" hidden accept="image/*" onChange={handleImageUpload} />
            </label>
          </div>

          <div className="card">
            <h2 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '1rem' }}>2. Describe Change</h2>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="E.g., Make the sky purple, add a cat..."
              className="input-field"
              style={{ minHeight: '100px', resize: 'vertical' }}
            />
            <button
              onClick={handleEdit}
              disabled={loading || !selectedImage || !prompt}
              className="btn btn-primary"
              style={{ width: '100%', opacity: (loading || !selectedImage) ? 0.6 : 1 }}
            >
              {loading ? 'Processing...' : <><Wand2 size={18} style={{ marginRight: '0.5rem' }} /> Generate Magic</>}
            </button>
          </div>
        </div>

        <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
           <h2 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '1rem' }}>Result</h2>
           <div style={{ 
             background: '#f8fafc', flex: 1, minHeight: '400px', borderRadius: 'var(--radius-md)', 
             border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center' 
           }}>
              {loading ? (
                 <div style={{ color: 'var(--primary)', fontWeight: 600 }}>Creating art...</div>
              ) : resultImage ? (
                 <img src={resultImage} alt="Result" style={{ maxWidth: '100%', maxHeight: '400px', objectFit: 'contain' }} />
              ) : (
                 <div style={{ color: 'var(--text-muted)', textAlign: 'center' }}>
                    <Camera size={48} style={{ opacity: 0.2, margin: '0 auto 1rem' }} />
                    <p>Your creation will appear here</p>
                 </div>
              )}
           </div>
           {resultImage && (
             <a href={resultImage} download="art-therapy.png" className="btn btn-secondary" style={{ marginTop: '1rem', justifyContent: 'center' }}>
               <Download size={18} style={{ marginRight: '0.5rem' }} /> Download
             </a>
           )}
        </div>
      </div>
    </div>
  );
};

export default ImageEditor;