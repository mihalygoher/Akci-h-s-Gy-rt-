import React, { useState, useRef } from 'react';
import { HeroFormState } from '../types';

interface HeroFormProps {
  onSubmit: (data: HeroFormState) => void;
  isLoading: boolean;
}

export const HeroForm: React.FC<HeroFormProps> = ({ onSubmit, isLoading }) => {
  const [name, setName] = useState('');
  const [profession, setProfession] = useState('');
  const [superpower, setSuperpower] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (image && name && profession && superpower) {
      onSubmit({ name, profession, superpower, image });
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-2xl border-4 border-black transform rotate-1 transition-transform hover:rotate-0 duration-300">
      <h2 className="text-3xl font-comic text-action-blue mb-6 uppercase border-b-2 border-dashed border-gray-300 pb-2">
        Hős Adatok
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Image Upload */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1 uppercase">
            Töltsd fel a fotódat
          </label>
          <div 
            onClick={() => fileInputRef.current?.click()}
            className={`
              relative w-full h-48 border-4 border-dashed rounded-lg cursor-pointer 
              flex flex-col items-center justify-center bg-gray-50 hover:bg-blue-50 transition-colors
              ${!image ? 'border-gray-300' : 'border-action-blue'}
            `}
          >
            {previewUrl ? (
              <img 
                src={previewUrl} 
                alt="Preview" 
                className="h-full w-full object-cover rounded-md opacity-80"
              />
            ) : (
              <div className="text-center p-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p className="text-gray-500 text-sm font-bold">Kattints a feltöltéshez</p>
              </div>
            )}
            <input 
              type="file" 
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />
          </div>
        </div>

        {/* Text Inputs */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1 uppercase">Hős Neve</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Pl. Kovács a Pusztító"
            className="w-full px-4 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-action-blue font-bold text-gray-900 placeholder-gray-400"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1 uppercase">Foglalkozás (Civilben)</label>
          <input
            type="text"
            value={profession}
            onChange={(e) => setProfession(e.target.value)}
            placeholder="Pl. Szoftverfejlesztő"
            className="w-full px-4 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-action-blue font-bold text-gray-900 placeholder-gray-400"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1 uppercase">Szuperképesség / Kiegészítők</label>
          <input
            type="text"
            value={superpower}
            onChange={(e) => setSuperpower(e.target.value)}
            placeholder="Pl. Végtelen Kávé és Bugirtás"
            className="w-full px-4 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-action-blue font-bold text-gray-900 placeholder-gray-400"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading || !image}
          className={`
            w-full py-4 px-6 rounded-lg font-comic text-2xl tracking-wide text-white shadow-[4px_4px_0_rgba(0,0,0,1)]
            transform transition-all active:translate-x-1 active:translate-y-1 active:shadow-none
            ${isLoading || !image 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-action-yellow text-black hover:bg-yellow-300 rotate-1'}
          `}
        >
          {isLoading ? 'GYÁRTÁS FOLYAMATBAN...' : 'FIGURA KÉSZÍTÉSE!'}
        </button>
      </form>
    </div>
  );
};