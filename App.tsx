import React, { useState, useEffect } from 'react';
import Hero from './components/Hero';
import Controls from './components/Controls';
import Preview from './components/Preview';
import ApiKeyModal from './components/ApiKeyModal';
import { WallpaperOptions, GeneratedImage, GenerationStatus } from './types';
import { generateWallpaper, enhanceUserPrompt } from './services/geminiService';

const App: React.FC = () => {
  const [status, setStatus] = useState<GenerationStatus>(GenerationStatus.IDLE);
  const [generatedImage, setGeneratedImage] = useState<GeneratedImage | null>(null);
  const [showKeyModal, setShowKeyModal] = useState(false);
  
  const [options, setOptions] = useState<WallpaperOptions>({
    prompt: '',
    style: 'cinematic', // Default style
    aspectRatio: '9:16', // Default to phone
    resolution: '1K',
    enhancePrompt: true,
  });

  // Check for API Key on mount
  useEffect(() => {
    const checkKey = async () => {
      const win = window as any;
      if (win.aistudio && win.aistudio.hasSelectedApiKey) {
        const hasKey = await win.aistudio.hasSelectedApiKey();
        if (!hasKey) {
          setShowKeyModal(true);
        }
      }
    };
    checkKey();
  }, []);

  const handleSelectKey = async () => {
    try {
      const win = window as any;
      if (win.aistudio && win.aistudio.openSelectKey) {
        await win.aistudio.openSelectKey();
        setShowKeyModal(false);
      }
    } catch (error) {
        console.error("Failed to select key", error);
        // If selection fails (e.g. user cancels), we might want to keep the modal open or reset
        // For now, we assume success as per instructions to avoid race conditions
        setShowKeyModal(false); 
    }
  };

  const handleGenerate = async () => {
    try {
      setStatus(GenerationStatus.ENHANCING);
      
      let promptToUse = options.prompt;
      
      if (options.enhancePrompt) {
        promptToUse = await enhanceUserPrompt(options.prompt);
      }

      setStatus(GenerationStatus.GENERATING);
      
      const image = await generateWallpaper({
        ...options,
        prompt: promptToUse
      });
      
      setGeneratedImage(image);
      setStatus(GenerationStatus.COMPLETE);
    } catch (error: any) {
      console.error(error);
      setStatus(GenerationStatus.ERROR);
      
      // If error suggests missing key (404/403 often related to project not found or invalid key context)
      // Or explicitly if message contains "Requested entity was not found" per instructions
      if (error.message?.includes("Requested entity was not found") || error.toString().includes("Requested entity was not found")) {
          setShowKeyModal(true);
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-brand-500/30">
      <ApiKeyModal isOpen={showKeyModal} onSelectKey={handleSelectKey} />
      
      <main className="container mx-auto px-4 pb-12 max-w-6xl">
        <Hero />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-8">
            <Controls 
              options={options} 
              setOptions={setOptions} 
              onGenerate={handleGenerate}
              status={status}
            />
            
            <div className="bg-slate-900/30 rounded-xl p-4 border border-slate-800 text-sm text-slate-500">
               <p className="mb-2 font-semibold text-slate-400">Pro Tip:</p>
               <p>For best results with smartphone wallpapers, keep the aspect ratio at <span className="text-brand-400">9:16</span>. Try the "Cinematic" style for realistic backgrounds.</p>
            </div>
          </div>
          
          <div className="lg:col-span-7 h-full">
            <Preview image={generatedImage} status={status} />
          </div>
        </div>
      </main>

       {/* Footer */}
       <footer className="py-8 text-center text-slate-600 text-sm">
        <p>&copy; {new Date().getFullYear()} LuminaWalls AI. Powered by Gemini.</p>
      </footer>
    </div>
  );
};

export default App;