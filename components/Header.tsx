import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="w-full py-6 bg-action-red shadow-lg border-b-4 border-action-yellow sticky top-0 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border-2 border-black text-black font-bold text-xl transform -rotate-6">
            ★
          </div>
          <h1 className="text-4xl font-comic tracking-wider text-white drop-shadow-[2px_2px_0_rgba(0,0,0,1)] uppercase">
            Akcióhős Gyár
          </h1>
        </div>
        <div className="hidden md:block text-sm font-bold text-yellow-200 uppercase tracking-widest">
          Készítsd el a saját figurádat!
        </div>
      </div>
    </header>
  );
};