import React from 'react';
import { Calculator } from 'lucide-react';

export const ProjectDescription = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-12 hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl flex items-center justify-center">
          <Calculator className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-xl font-bold text-gray-900">
          À propos du projet
        </h3>
      </div>
      <p className="text-gray-600 leading-relaxed">
      Ce projet met en avant les principaux types de tests logiciels — tests unitaires, tests d'intégration et tests fonctionnels — à travers une application interactive. 
       Il vise à illustrer l'importance des tests dans le cycle de développement et à offrir un support pédagogique clair pour comprendre et appliquer les bonnes pratiques de validation logicielle.
   </p>
    </div>
  );
}; 