import React from 'react';

/**
 * Vue des rapports financiers
 */
const ReportsView: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Rapports Financiers</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-4">Bilan</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
            Vue d'ensemble des actifs, passifs et capitaux propres de l'entreprise.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md w-full">
            Générer le rapport
          </button>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-4">Compte de résultat</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
            Analyse des revenus, coûts et dépenses sur une période donnée.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md w-full">
            Générer le rapport
          </button>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-4">Flux de trésorerie</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
            Suivi des entrées et sorties de trésorerie de l'entreprise.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md w-full">
            Générer le rapport
          </button>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow mb-8">
        <h2 className="text-xl font-bold mb-4">Rapports personnalisés</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Type de rapport</label>
            <select className="w-full px-3 py-2 border rounded-md">
              <option>Chiffre d'affaires par client</option>
              <option>Chiffre d'affaires par produit</option>
              <option>Analyse des dépenses</option>
              <option>Analyse de la rentabilité</option>
              <option>Âge des créances</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Période</label>
            <select className="w-full px-3 py-2 border rounded-md">
              <option>Ce mois</option>
              <option>Ce trimestre</option>
              <option>Cette année</option>
              <option>Année précédente</option>
              <option>Personnalisé</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Format</label>
            <select className="w-full px-3 py-2 border rounded-md">
              <option>PDF</option>
              <option>Excel</option>
              <option>CSV</option>
            </select>
          </div>
          
          <div className="flex items-end">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md w-full">
              Générer
            </button>
          </div>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Rapports récents</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Nom</th>
                <th className="text-left py-2">Type</th>
                <th className="text-left py-2">Date de génération</th>
                <th className="text-left py-2">Format</th>
                <th className="text-right py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-2">Bilan - Juin 2023</td>
                <td className="py-2">Bilan</td>
                <td className="py-2">30/06/2023</td>
                <td className="py-2">PDF</td>
                <td className="py-2 text-right">
                  <button className="text-blue-600 hover:text-blue-900 mr-3">
                    Télécharger
                  </button>
                </td>
              </tr>
              <tr className="border-b">
                <td className="py-2">CA par client - Q2 2023</td>
                <td className="py-2">Chiffre d'affaires</td>
                <td className="py-2">28/06/2023</td>
                <td className="py-2">Excel</td>
                <td className="py-2 text-right">
                  <button className="text-blue-600 hover:text-blue-900 mr-3">
                    Télécharger
                  </button>
                </td>
              </tr>
              <tr className="border-b">
                <td className="py-2">Flux de trésorerie - Mai 2023</td>
                <td className="py-2">Flux de trésorerie</td>
                <td className="py-2">15/06/2023</td>
                <td className="py-2">PDF</td>
                <td className="py-2 text-right">
                  <button className="text-blue-600 hover:text-blue-900 mr-3">
                    Télécharger
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReportsView;
