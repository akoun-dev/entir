import React from 'react';

/**
 * Tableau de bord du module Inventaire
 */
const InventoryDashboardView: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Tableau de bord Inventaire</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-2">Total Produits</h3>
          <p className="text-3xl font-bold">1 245</p>
          <p className="text-sm text-green-500 mt-2">+15 ce mois</p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-2">Valeur du stock</h3>
          <p className="text-3xl font-bold">156 780 €</p>
          <p className="text-sm text-green-500 mt-2">+8% ce mois</p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-2">Produits en rupture</h3>
          <p className="text-3xl font-bold">24</p>
          <p className="text-sm text-red-500 mt-2">+5 ce mois</p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-2">Mouvements de stock</h3>
          <p className="text-3xl font-bold">342</p>
          <p className="text-sm text-gray-500 mt-2">Ce mois</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Produits à faible stock</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Produit</th>
                  <th className="text-left py-2">Code</th>
                  <th className="text-right py-2">Stock</th>
                  <th className="text-right py-2">Minimum</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-2">Écran LCD 24"</td>
                  <td className="py-2">LCD-24</td>
                  <td className="py-2 text-right">5</td>
                  <td className="py-2 text-right">10</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">Clavier sans fil</td>
                  <td className="py-2">KB-W10</td>
                  <td className="py-2 text-right">8</td>
                  <td className="py-2 text-right">15</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">Souris optique</td>
                  <td className="py-2">MS-OPT</td>
                  <td className="py-2 text-right">12</td>
                  <td className="py-2 text-right">20</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Derniers mouvements</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Référence</th>
                  <th className="text-left py-2">Date</th>
                  <th className="text-left py-2">Type</th>
                  <th className="text-right py-2">Quantité</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-2">MOV-2023-156</td>
                  <td className="py-2">28/06/2023</td>
                  <td className="py-2">Entrée</td>
                  <td className="py-2 text-right">+50</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">MOV-2023-155</td>
                  <td className="py-2">27/06/2023</td>
                  <td className="py-2">Sortie</td>
                  <td className="py-2 text-right">-15</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">MOV-2023-154</td>
                  <td className="py-2">26/06/2023</td>
                  <td className="py-2">Entrée</td>
                  <td className="py-2 text-right">+25</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryDashboardView;
