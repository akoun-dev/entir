import React from 'react';

/**
 * Tableau de bord du module Projet
 */
const ProjectDashboardView: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Tableau de bord Projets</h1>
      
      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-2">Projets actifs</h3>
          <p className="text-3xl font-bold">12</p>
          <p className="text-sm text-green-500 mt-2">+2 ce mois</p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-2">Tâches en cours</h3>
          <p className="text-3xl font-bold">48</p>
          <p className="text-sm text-yellow-500 mt-2">15 en retard</p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-2">Heures enregistrées</h3>
          <p className="text-3xl font-bold">256</p>
          <p className="text-sm text-gray-500 mt-2">Ce mois</p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-2">Taux de complétion</h3>
          <p className="text-3xl font-bold">68%</p>
          <p className="text-sm text-green-500 mt-2">+5% ce mois</p>
        </div>
      </div>
      
      {/* Graphiques et tableaux */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Répartition des tâches</h2>
          <div className="h-64 flex items-center justify-center">
            <p className="text-gray-500">Graphique de répartition (à implémenter)</p>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Progression des projets</h2>
          <div className="h-64 flex items-center justify-center">
            <p className="text-gray-500">Graphique de progression (à implémenter)</p>
          </div>
        </div>
      </div>
      
      {/* Projets et tâches */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Projets récents</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Projet</th>
                  <th className="text-left py-2">Client</th>
                  <th className="text-right py-2">Progression</th>
                  <th className="text-right py-2">Échéance</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-2">Refonte site web</td>
                  <td className="py-2">Dupont SA</td>
                  <td className="py-2 text-right">75%</td>
                  <td className="py-2 text-right">15/07/2023</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">Application mobile</td>
                  <td className="py-2">Martin SARL</td>
                  <td className="py-2 text-right">45%</td>
                  <td className="py-2 text-right">30/08/2023</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">Migration ERP</td>
                  <td className="py-2">Durand & Fils</td>
                  <td className="py-2 text-right">20%</td>
                  <td className="py-2 text-right">15/10/2023</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Tâches à faire</h2>
          <div className="space-y-4">
            <div className="border-b pb-3">
              <div className="flex justify-between">
                <p className="font-medium">Maquettes page d'accueil</p>
                <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800">Urgent</span>
              </div>
              <div className="flex justify-between mt-1">
                <p className="text-sm text-gray-600 dark:text-gray-300">Refonte site web</p>
                <p className="text-sm text-gray-500">Échéance: 10/07/2023</p>
              </div>
            </div>
            <div className="border-b pb-3">
              <div className="flex justify-between">
                <p className="font-medium">Développement API</p>
                <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">Moyenne</span>
              </div>
              <div className="flex justify-between mt-1">
                <p className="text-sm text-gray-600 dark:text-gray-300">Application mobile</p>
                <p className="text-sm text-gray-500">Échéance: 20/07/2023</p>
              </div>
            </div>
            <div className="border-b pb-3">
              <div className="flex justify-between">
                <p className="font-medium">Analyse des données</p>
                <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Normale</span>
              </div>
              <div className="flex justify-between mt-1">
                <p className="text-sm text-gray-600 dark:text-gray-300">Migration ERP</p>
                <p className="text-sm text-gray-500">Échéance: 25/07/2023</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDashboardView;
