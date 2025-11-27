import React from 'react';
import { Key } from 'lucide-react';

interface ApiKeyModalProps {
  isOpen: boolean;
  onSelectKey: () => void;
}

const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ isOpen, onSelectKey }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 max-w-md w-full shadow-2xl text-center">
        <div className="w-16 h-16 bg-brand-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <Key className="w-8 h-8 text-brand-400" />
        </div>
        
        <h2 className="text-2xl font-bold text-white mb-3">API Key Required</h2>
        <p className="text-slate-400 mb-8">
          To generate high-quality 2K wallpapers with Gemini 3 Pro, you need to connect your Google Cloud Project.
        </p>

        <div className="space-y-4">
          <button
            onClick={onSelectKey}
            className="w-full bg-brand-600 hover:bg-brand-500 text-white font-semibold py-3 px-6 rounded-xl transition-all shadow-lg shadow-brand-500/20"
          >
            Select API Key
          </button>
          
          <p className="text-xs text-slate-500">
             By continuing, you agree to the usage terms of the Gemini API. <br/>
             <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noopener noreferrer" className="text-brand-400 hover:underline">
               Learn about billing & quotas
             </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ApiKeyModal;
