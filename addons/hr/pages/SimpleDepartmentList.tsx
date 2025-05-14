import * as React from 'react';

/**
 * Version simplifiée de la liste des départements
 */
const SimpleDepartmentList = () => {
  // Données fictives des départements
  const departments = [
    { id: 1, name: 'Direction Générale', code: 'DIR', manager: 'Jean Dupont', employees: 5, budget: '500 000 €' },
    { id: 2, name: 'Ressources Humaines', code: 'RH', manager: 'Marie Martin', employees: 8, budget: '250 000 €' },
    { id: 3, name: 'Finance', code: 'FIN', manager: 'Pierre Durand', employees: 10, budget: '300 000 €' },
    { id: 4, name: 'Informatique', code: 'IT', manager: 'Sophie Petit', employees: 15, budget: '400 000 €' },
    { id: 5, name: 'Marketing', code: 'MKT', manager: 'Thomas Leroy', employees: 12, budget: '350 000 €' }
  ];

  return React.createElement(
    'div', 
    { className: 'container mx-auto py-6' },
    React.createElement(
      'h1', 
      { className: 'text-3xl font-bold tracking-tight mb-2' }, 
      'Départements'
    ),
    React.createElement(
      'p', 
      { className: 'text-muted-foreground mb-6' }, 
      'Gérez les départements de votre entreprise'
    ),
    React.createElement(
      'div', 
      { className: 'bg-white rounded-lg shadow overflow-hidden' },
      React.createElement(
        'table', 
        { className: 'min-w-full divide-y divide-gray-200' },
        React.createElement(
          'thead', 
          { className: 'bg-gray-50' },
          React.createElement(
            'tr',
            null,
            React.createElement('th', { className: 'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider' }, 'Nom'),
            React.createElement('th', { className: 'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider' }, 'Code'),
            React.createElement('th', { className: 'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider' }, 'Responsable'),
            React.createElement('th', { className: 'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider' }, 'Employés'),
            React.createElement('th', { className: 'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider' }, 'Budget')
          )
        ),
        React.createElement(
          'tbody', 
          { className: 'bg-white divide-y divide-gray-200' },
          departments.map(department => 
            React.createElement(
              'tr',
              { key: department.id },
              React.createElement('td', { className: 'px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900' }, department.name),
              React.createElement('td', { className: 'px-6 py-4 whitespace-nowrap text-sm text-gray-500' }, department.code),
              React.createElement('td', { className: 'px-6 py-4 whitespace-nowrap text-sm text-gray-500' }, department.manager),
              React.createElement('td', { className: 'px-6 py-4 whitespace-nowrap text-sm text-gray-500' }, department.employees),
              React.createElement('td', { className: 'px-6 py-4 whitespace-nowrap text-sm text-gray-500' }, department.budget)
            )
          )
        )
      )
    )
  );
};

export default SimpleDepartmentList;
