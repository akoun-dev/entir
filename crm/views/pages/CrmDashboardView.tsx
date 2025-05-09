import React from 'react';

/**
 * Tableau de bord du module CRM
 */
const CrmDashboardView: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Tableau de bord CRM</h1>
      
      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-2">Leads</h3>
          <p className="text-3xl font-bold">124</p>
          <p className="text-sm text-green-500 mt-2">+12 cette semaine</p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-2">Opportunités</h3>
          <p className="text-3xl font-bold">45</p>
          <p className="text-sm text-green-500 mt-2">+5 cette semaine</p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-2">Clients</h3>
          <p className="text-3xl font-bold">78</p>
          <p className="text-sm text-green-500 mt-2">+3 ce mois</p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-2">Chiffre d'affaires prévisionnel</h3>
          <p className="text-3xl font-bold">245 000 €</p>
          <p className="text-sm text-gray-500 mt-2">Ce trimestre</p>
        </div>
      </div>
      
      {/* Graphiques et tableaux */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Pipeline de ventes</h2>
          <div className="h-64 flex items-center justify-center">
            <p className="text-gray-500">Graphique du pipeline (à implémenter)</p>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Conversion des leads</h2>
          <div className="h-64 flex items-center justify-center">
            <p className="text-gray-500">Graphique de conversion (à implémenter)</p>
          </div>
        </div>
      </div>
      
      {/* Activités récentes et opportunités */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Activités récentes</h2>
          <div className="space-y-4">
            <div className="border-b pb-3">
              <div className="flex justify-between">
                <p className="font-medium">Appel avec Dupont SA</p>
                <p className="text-sm text-gray-500">Aujourd'hui, 10:30</p>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">Discussion sur le nouveau projet</p>
            </div>
            <div className="border-b pb-3">
              <div className="flex justify-between">
                <p className="font-medium">Email à Martin SARL</p>
                <p className="text-sm text-gray-500">Hier, 15:45</p>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">Envoi de la proposition commerciale</p>
            </div>
            <div className="border-b pb-3">
              <div className="flex justify-between">
                <p className="font-medium">Réunion avec Durand & Fils</p>
                <p className="text-sm text-gray-500">22/06/2023</p>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">Présentation des nouveaux services</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Opportunités à suivre</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Opportunité</th>
                  <th className="text-left py-2">Client</th>
                  <th className="text-right py-2">Montant</th>
                  <th className="text-right py-2">Probabilité</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-2">Projet ERP</td>
                  <td className="py-2">Dupont SA</td>
                  <td className="py-2 text-right">75 000 €</td>
                  <td className="py-2 text-right">70%</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">Migration cloud</td>
                  <td className="py-2">Martin SARL</td>
                  <td className="py-2 text-right">45 000 €</td>
                  <td className="py-2 text-right">50%</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">Développement application</td>
                  <td className="py-2">Durand & Fils</td>
                  <td className="py-2 text-right">120 000 €</td>
                  <td className="py-2 text-right">30%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrmDashboardView;
