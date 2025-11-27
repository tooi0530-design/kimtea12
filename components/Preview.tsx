import React from 'react';
import { GeneratedImage, GenerationStatus } from '../types';
import { Download, Share2, Maximize2, AlertCircle } from 'lucide-react';

interface PreviewProps {
  image: GeneratedImage | null;
  status: GenerationStatus;
}

const Preview: React.FC<PreviewProps> = ({ image, status }) => {
  const isLoading = status === GenerationStatus.GENERATING || status === GenerationStatus.ENHANCING;
  const isError = status === GenerationStatus.ERROR;

  const downloadImage = () => {
    if (!image) return;
    const link = document.createElement('a');
    link.href = image.url;
    link.download = `lumina-walls-${image.id}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="h-full flex flex-col">
      <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
        <Maximize2 className="w-5 h-5 text-brand-400" />
        Preview
      </h2>
      
      <div className="flex-1 min-h-[500px] relative bg-slate-900/50 rounded-2xl border border-slate-800 overflow-hidden flex items-center justify-center">
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 z-0 opacity-10" 
             style={{ backgroundImage: 'radial-gradient(circle, #38bdf8 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="relative z-10 text-center p-8">
            <div className="relative w-24 h-24 mx-auto mb-6">
              <div className="absolute inset-0 rounded-full border-t-2 border-r-2 border-brand-500 animate-spin"></div>
              <div className="absolute inset-2 rounded-full border-l-2 border-b-2 border-brand-300 animate-spin-reverse"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                 <Sparkles className="w-8 h-8 text-brand-400 animate-pulse" />
              </div>
            </div>
            <h3 className="text-xl font-medium text-white mb-2">Creating Magic</h3>
            <p className="text-slate-400 text-sm max-w-xs mx-auto">
              Our AI is painting pixels one by one. This might take a moment...
            </p>
          </div>
        )}

        {/* Empty State */}
        {!image && !isLoading && !isError && (
          <div className="relative z-10 text-center p-8 opacity-50">
            <div className="w-20 h-20 bg-slate-800 rounded-2xl mx-auto mb-4 flex items-center justify-center transform rotate-3">
              <ImageIcon className="w-8 h-8 text-slate-500" />
            </div>
            <p className="text-slate-400 text-sm">Your masterpiece will appear here</p>
          </div>
        )}

        {/* Error State */}
        {isError && (
          <div className="relative z-10 text-center p-8">
            <div className="w-16 h-16 bg-red-500/10 rounded-full mx-auto mb-4 flex items-center justify-center">
              <AlertCircle className="w-8 h-8 text-red-500" />
            </div>
            <h3 className="text-lg font-medium text-white mb-2">Generation Failed</h3>
            <p className="text-slate-400 text-sm max-w-xs mx-auto mb-4">
              Something went wrong while generating your image. Please try again or check your API Key limits.
            </p>
          </div>
        )}

        {/* Image Result */}
        {image && !isLoading && (
          <div className="relative w-full h-full p-4 flex items-center justify-center">
            <img 
              src={image.url} 
              alt={image.prompt}
              className="max-h-full max-w-full rounded-lg shadow-2xl object-contain"
            />
            
            {/* Overlay Actions */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3 z-20">
               <button 
                  onClick={downloadImage}
                  className="bg-white/90 hover:bg-white text-slate-900 px-6 py-3 rounded-full font-semibold shadow-lg backdrop-blur-sm transition-all hover:scale-105 flex items-center gap-2"
               >
                  <Download className="w-4 h-4" /> Download
               </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Helper for empty state icon
function ImageIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
  )
}

function Sparkles(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M9 3v4"/><path d="M3 5h4"/><path d="M3 9h4"/></svg>
    )
}

export default Preview;
