import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroForm } from './components/HeroForm';
import { ResultDisplay } from './components/ResultDisplay';
import { HeroFormState, LoadingState } from './types';
import { generateActionFigureImage } from './services/geminiService';

const App: React.FC = () => {
  const [loadingState, setLoadingState] = useState<LoadingState>(LoadingState.IDLE);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFormSubmit = async (data: HeroFormState) => {
    if (!data.image) return;

    setLoadingState(LoadingState.GENERATING);
    setError(null);
    setGeneratedImage(null);

    try {
      const imageUrl = await generateActionFigureImage(
        data.image,
        data.name,
        data.profession,
        data.superpower
      );
      
      setGeneratedImage(imageUrl);
      setLoadingState(LoadingState.SUCCESS);
    } catch (err: any) {
      setLoadingState(LoadingState.ERROR);
      setError(err.message || "Ismeretlen hiba történt.");
    }
  };

  return (
    <div className="min-h-screen bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] bg-fixed">
      <Header />
      
      <main className="container mx-auto px-4 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Input */}
          <div className="lg:col-span-4 z-10">
            <div className="sticky top-28">
              <HeroForm 
                onSubmit={handleFormSubmit} 
                isLoading={loadingState === LoadingState.GENERATING} 
              />
              
              <div className="mt-6 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded shadow-md">
                <p className="font-bold text-sm">💡 Tipp:</p>
                <p className="text-xs mt-1">
                  A legjobb eredmény érdekében tölts fel egy világos, éles fotót, ahol jól látszik az arcod. 
                  A "Banana" modell (Gemini Flash) készíti a képet!
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Display */}
          <div className="lg:col-span-8 min-h-[600px]">
            <ResultDisplay 
              loadingState={loadingState} 
              generatedImage={generatedImage}
              error={error}
            />
          </div>

        </div>
      </main>
      
      <footer className="text-center py-8 text-gray-500 text-sm">
        <p>Powered by Google Gemini API (Flash Image Model)</p>
      </footer>
    </div>
  );
};

export default App;