import React from 'react';

/**
 * Vue des paiements
 */
const PaymentsView: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Paiements</h1>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">
          Nouveau Paiement
        </button>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden mb-6">
        <div className="p-4 border-b">
          <div className="flex items-center space-x-4">
            <input 
              type="text" 
              placeholder="Rechercher..." 
              className="px-3 py-2 border rounded-md w-full max-w-md"
            />
            <select className="px-3 py-2 border rounded-md">
              <option>Tous les types</option>
              <option>Entrant</option>
              <option>Sortant</option>
            </select>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Référence
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Partenaire
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Méthode
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Montant
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
              {[1, 2, 3, 4, 5].map((i) => (
                <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    PAY-2023-00{i}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {`${i + 15}/06/2023`}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    Partenaire {i}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {i % 2 === 0 ? 'Virement bancaire' : 'Carte bancaire'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                    {`${i * 1200 + 300} €`}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      i % 2 === 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {i % 2 === 0 ? 'Entrant' : 'Sortant'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">
                      Voir
                    </button>
                    <button className="text-gray-600 hover:text-gray-900">
                      Éditer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="px-6 py-4 border-t">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500">
              Affichage de 1 à 5 sur 38 entrées
            </div>
            <div className="flex space-x-2">
              <button className="px-3 py-1 border rounded-md">Précédent</button>
              <button className="px-3 py-1 bg-blue-600 text-white rounded-md">1</button>
              <button className="px-3 py-1 border rounded-md">2</button>
              <button className="px-3 py-1 border rounded-md">3</button>
              <button className="px-3 py-1 border rounded-md">Suivant</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentsView;
