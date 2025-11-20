import React from 'react';
import { LoadingState } from '../types';

interface ResultDisplayProps {
  loadingState: LoadingState;
  generatedImage: string | null;
  error: string | null;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ loadingState, generatedImage, error }) => {
  return (
    <div className="h-full min-h-[500px] bg-plastic-black rounded-xl border-4 border-gray-700 p-4 relative flex items-center justify-center shadow-2xl overflow-hidden group">
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-500 via-black to-black"></div>

      {loadingState === LoadingState.IDLE && (
        <div className="text-center z-10 p-8">
          <div className="text-6xl mb-4 grayscale opacity-30">🧸</div>
          <h3 className="text-gray-500 font-comic text-2xl">Várjuk a megrendelést...</h3>
          <p className="text-gray-600 mt-2 text-sm">Töltsd ki az adatlapot a bal oldalon!</p>
        </div>
      )}

      {loadingState === LoadingState.GENERATING && (
        <div className="text-center z-10 flex flex-col items-center">
          <div className="animate-spin rounded-full h-24 w-24 border-b-4 border-action-yellow mb-6"></div>
          <h3 className="text-action-yellow font-comic text-3xl animate-pulse">Műanyag öntése...</h3>
          <p className="text-gray-400 mt-2 font-mono text-xs">AI Modellek illesztése...</p>
        </div>
      )}

      {loadingState === LoadingState.ERROR && (
        <div className="text-center z-10 p-6 bg-red-900/50 rounded-lg border-2 border-red-500">
          <div className="text-4xl mb-4">💥</div>
          <h3 className="text-white font-bold text-xl mb-2">Hiba történt a gyártósoron!</h3>
          <p className="text-red-200 text-sm">{error || "Valami félrement. Próbáld újra!"}</p>
        </div>
      )}

      {loadingState === LoadingState.SUCCESS && generatedImage && (
        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
           <div className="relative bg-white p-2 pb-8 shadow-[0_20px_50px_rgba(0,0,0,0.7)] transform transition-transform duration-500 hover:scale-105 rotate-1">
              {/* Hook hole for display */}
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-white rounded-t-lg border-t border-l border-r border-gray-200 flex items-center justify-center">
                 <div className="w-3 h-3 bg-gray-800 rounded-full"></div>
              </div>
              
              <img 
                src={generatedImage} 
                alt="Generated Action Figure" 
                className="max-h-[600px] w-auto object-contain rounded-sm border border-gray-200"
              />
              
              <div className="absolute bottom-2 right-4">
                 <span className="font-comic text-gray-400 text-xs">LIMITED EDITION</span>
              </div>
           </div>
           
           <a 
             href={generatedImage} 
             download="my-action-figure.png"
             className="mt-8 inline-block bg-action-blue text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-blue-600 transition-colors uppercase tracking-wider text-sm"
           >
             Kép Letöltése
           </a>
        </div>
      )}
    </div>
  );
};