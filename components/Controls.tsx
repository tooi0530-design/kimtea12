import React from 'react';
import { WallpaperOptions, WALLPAPER_STYLES, GenerationStatus } from '../types';
import { Wand2, Image as ImageIcon, Smartphone, Square, Monitor, Settings2, Sparkles } from 'lucide-react';

interface ControlsProps {
  options: WallpaperOptions;
  setOptions: React.Dispatch<React.SetStateAction<WallpaperOptions>>;
  onGenerate: () => void;
  status: GenerationStatus;
}

const Controls: React.FC<ControlsProps> = ({ options, setOptions, onGenerate, status }) => {
  const isGenerating = status === GenerationStatus.GENERATING || status === GenerationStatus.ENHANCING;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setOptions({ ...options, prompt: e.target.value });
  };

  const handleStyleSelect = (styleId: string) => {
    setOptions({ ...options, style: styleId });
  };

  return (
    <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 shadow-2xl">
      {/* Prompt Input */}
      <div className="mb-6">
        <label htmlFor="prompt" className="block text-sm font-medium text-slate-300 mb-2">
          Describe your wallpaper
        </label>
        <div className="relative">
          <textarea
            id="prompt"
            rows={3}
            className="block w-full rounded-xl border-0 bg-slate-800/50 py-3 pl-4 pr-12 text-white shadow-sm ring-1 ring-inset ring-slate-700 placeholder:text-slate-500 focus:ring-2 focus:ring-inset focus:ring-brand-500 sm:text-sm sm:leading-6 resize-none transition-all"
            placeholder="e.g., A futuristic city in the clouds with flying cars at sunset..."
            value={options.prompt}
            onChange={handleInputChange}
            disabled={isGenerating}
          />
          <div className="absolute bottom-3 right-3">
             <button
                type="button"
                onClick={() => setOptions(prev => ({...prev, enhancePrompt: !prev.enhancePrompt}))}
                className={`p-1.5 rounded-lg transition-all ${options.enhancePrompt ? 'bg-brand-500/20 text-brand-400' : 'text-slate-500 hover:text-slate-300'}`}
                title="Magic Prompt Enhancer"
             >
                <Wand2 className="w-4 h-4" />
             </button>
          </div>
        </div>
        <div className="mt-2 flex items-center gap-2">
           <span className={`text-xs transition-colors ${options.enhancePrompt ? 'text-brand-400' : 'text-slate-500'}`}>
              {options.enhancePrompt ? '✨ Magic Enhance Active' : 'Magic Enhance Off'}
           </span>
        </div>
      </div>

      {/* Style Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-slate-300 mb-2">Art Style</label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {WALLPAPER_STYLES.map((style) => (
            <button
              key={style.id}
              onClick={() => handleStyleSelect(style.id)}
              disabled={isGenerating}
              className={`px-3 py-2 rounded-lg text-xs font-medium transition-all text-center border ${
                options.style === style.id
                  ? 'bg-brand-600 border-brand-500 text-white shadow-[0_0_15px_rgba(14,165,233,0.3)]'
                  : 'bg-slate-800/50 border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              {style.label}
            </button>
          ))}
        </div>
      </div>

      {/* Configuration Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {/* Aspect Ratio */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
            <ImageIcon className="w-4 h-4 text-brand-400" /> Aspect Ratio
          </label>
          <div className="flex bg-slate-800/50 rounded-lg p-1 border border-slate-700">
            <button
              onClick={() => setOptions({ ...options, aspectRatio: '9:16' })}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-xs font-medium transition-all ${
                options.aspectRatio === '9:16'
                  ? 'bg-slate-700 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Smartphone className="w-3 h-3" /> 9:16
            </button>
            <button
              onClick={() => setOptions({ ...options, aspectRatio: '16:9' })}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-xs font-medium transition-all ${
                options.aspectRatio === '16:9'
                  ? 'bg-slate-700 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Monitor className="w-3 h-3" /> 16:9
            </button>
             <button
              onClick={() => setOptions({ ...options, aspectRatio: '1:1' })}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-xs font-medium transition-all ${
                options.aspectRatio === '1:1'
                  ? 'bg-slate-700 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Square className="w-3 h-3" /> 1:1
            </button>
          </div>
        </div>

        {/* Resolution */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
            <Settings2 className="w-4 h-4 text-brand-400" /> Quality
          </label>
          <div className="flex bg-slate-800/50 rounded-lg p-1 border border-slate-700">
            <button
              onClick={() => setOptions({ ...options, resolution: '1K' })}
              className={`flex-1 py-2 rounded-md text-xs font-medium transition-all ${
                options.resolution === '1K'
                  ? 'bg-slate-700 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Standard (1K)
            </button>
            <button
              onClick={() => setOptions({ ...options, resolution: '2K' })}
              className={`flex-1 py-2 rounded-md text-xs font-medium transition-all ${
                options.resolution === '2K'
                  ? 'bg-slate-700 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              High (2K)
            </button>
          </div>
        </div>
      </div>

      {/* Generate Button */}
      <button
        onClick={onGenerate}
        disabled={isGenerating || !options.prompt.trim()}
        className={`group w-full relative flex items-center justify-center gap-2 py-4 rounded-xl text-white font-semibold text-base transition-all ${
          isGenerating || !options.prompt.trim()
            ? 'bg-slate-700 cursor-not-allowed opacity-50'
            : 'bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-400 shadow-[0_0_20px_rgba(14,165,233,0.3)] hover:shadow-[0_0_30px_rgba(14,165,233,0.5)] transform hover:-translate-y-0.5'
        }`}
      >
        {isGenerating ? (
          <>
             <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            {status === GenerationStatus.ENHANCING ? 'Enhancing Prompt...' : 'Dreaming up Wallpaper...'}
          </>
        ) : (
          <>
            <Sparkles className="w-5 h-5 group-hover:animate-pulse" />
            Generate Wallpaper
          </>
        )}
      </button>
    </div>
  );
};

export default Controls;