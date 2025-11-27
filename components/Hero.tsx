import React from 'react';
import { Sparkles } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <div className="relative overflow-hidden py-12 sm:py-16 lg:py-20 text-center">
      <div className="absolute inset-0 z-0 opacity-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-500 via-slate-900 to-slate-950"></div>
      <div className="relative z-10 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex justify-center mb-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-brand-500/10 text-brand-300 text-xs font-medium ring-1 ring-inset ring-brand-500/20">
            <Sparkles className="w-3 h-3 mr-1" />
            Powered by Gemini 3 Pro
          </span>
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-white via-brand-100 to-brand-300 pb-2">
          LuminaWalls AI
        </h1>
        <p className="mt-4 text-lg leading-8 text-slate-400 max-w-2xl mx-auto">
          Transform your ideas into stunning, high-resolution smartphone wallpapers in seconds.
        </p>
      </div>
    </div>
  );
};

export default Hero;
