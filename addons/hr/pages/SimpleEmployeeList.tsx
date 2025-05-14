import * as React from 'react';

/**
 * Version simplifiée de la liste des employés
 */
const SimpleEmployeeList = () => {
  // Données fictives des employés
  const employees = [
    { id: 1, name: 'Jean Dupont', email: 'jean.dupont@example.com', department: 'Informatique', position: 'Développeur Senior' },
    { id: 2, name: 'Marie Martin', email: 'marie.martin@example.com', department: 'Ressources Humaines', position: 'Responsable RH' },
    { id: 3, name: 'Pierre Durand', email: 'pierre.durand@example.com', department: 'Finance', position: 'Comptable' },
    { id: 4, name: 'Sophie Petit', email: 'sophie.petit@example.com', department: 'Informatique', position: 'Développeur' },
    { id: 5, name: 'Thomas Leroy', email: 'thomas.leroy@example.com', department: 'Marketing', position: 'Responsable Marketing' }
  ];

  return React.createElement(
    'div', 
    { className: 'container mx-auto py-6' },
    React.createElement(
      'h1', 
      { className: 'text-3xl font-bold tracking-tight mb-2' }, 
      'Employés'
    ),
    React.createElement(
      'p', 
      { className: 'text-muted-foreground mb-6' }, 
      'Gérez les employés de votre entreprise'
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
            React.createElement('th', { className: 'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider' }, 'Email'),
            React.createElement('th', { className: 'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider' }, 'Département'),
            React.createElement('th', { className: 'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider' }, 'Poste')
          )
        ),
        React.createElement(
          'tbody', 
          { className: 'bg-white divide-y divide-gray-200' },
          employees.map(employee => 
            React.createElement(
              'tr',
              { key: employee.id },
              React.createElement('td', { className: 'px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900' }, employee.name),
              React.createElement('td', { className: 'px-6 py-4 whitespace-nowrap text-sm text-gray-500' }, employee.email),
              React.createElement('td', { className: 'px-6 py-4 whitespace-nowrap text-sm text-gray-500' }, employee.department),
              React.createElement('td', { className: 'px-6 py-4 whitespace-nowrap text-sm text-gray-500' }, employee.position)
            )
          )
        )
      )
    )
  );
};

export default SimpleEmployeeList;
