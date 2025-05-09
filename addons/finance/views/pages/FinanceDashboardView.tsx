import React from 'react';

/**
 * Tableau de bord du module Finance
 */
const FinanceDashboardView: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Tableau de bord Finance</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-2">Total Factures</h3>
          <p className="text-3xl font-bold">24 500 €</p>
          <p className="text-sm text-green-500 mt-2">+12% ce mois</p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-2">Paiements reçus</h3>
          <p className="text-3xl font-bold">18 200 €</p>
          <p className="text-sm text-green-500 mt-2">+8% ce mois</p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-2">Factures en attente</h3>
          <p className="text-3xl font-bold">6 300 €</p>
          <p className="text-sm text-red-500 mt-2">+15% ce mois</p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-2">Dépenses</h3>
          <p className="text-3xl font-bold">12 800 €</p>
          <p className="text-sm text-gray-500 mt-2">-3% ce mois</p>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow mb-8">
        <h2 className="text-xl font-bold mb-4">Aperçu des revenus</h2>
        <div className="h-64 flex items-center justify-center">
          <p className="text-gray-500">Graphique des revenus (à implémenter)</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Factures récentes</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Numéro</th>
                  <th className="text-left py-2">Client</th>
                  <th className="text-left py-2">Date</th>
                  <th className="text-right py-2">Montant</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-2">INV-2023-001</td>
                  <td className="py-2">Dupont SA</td>
                  <td className="py-2">15/06/2023</td>
                  <td className="py-2 text-right">3 500 €</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">INV-2023-002</td>
                  <td className="py-2">Martin SARL</td>
                  <td className="py-2">18/06/2023</td>
                  <td className="py-2 text-right">2 800 €</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">INV-2023-003</td>
                  <td className="py-2">Durand & Fils</td>
                  <td className="py-2">22/06/2023</td>
                  <td className="py-2 text-right">4 200 €</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Paiements récents</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Référence</th>
                  <th className="text-left py-2">Client</th>
                  <th className="text-left py-2">Date</th>
                  <th className="text-right py-2">Montant</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-2">PAY-2023-001</td>
                  <td className="py-2">Dupont SA</td>
                  <td className="py-2">20/06/2023</td>
                  <td className="py-2 text-right">3 500 €</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">PAY-2023-002</td>
                  <td className="py-2">Durand & Fils</td>
                  <td className="py-2">25/06/2023</td>
                  <td className="py-2 text-right">4 200 €</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">PAY-2023-003</td>
                  <td className="py-2">Bernard SAS</td>
                  <td className="py-2">28/06/2023</td>
                  <td className="py-2 text-right">1 800 €</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinanceDashboardView;
