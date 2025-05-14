import * as React from 'react';

/**
 * Version simplifiée du tableau de bord RH
 */
const SimpleHRDashboard = () => {
  return React.createElement(
    'div', 
    { className: 'container mx-auto py-6' },
    React.createElement(
      'h1', 
      { className: 'text-3xl font-bold tracking-tight' }, 
      'Tableau de bord RH'
    ),
    React.createElement(
      'p', 
      { className: 'text-muted-foreground mb-6' }, 
      'Bienvenue dans le module de gestion des ressources humaines'
    ),
    React.createElement(
      'div', 
      { className: 'grid gap-4 md:grid-cols-2 lg:grid-cols-4' },
      React.createElement(
        'div', 
        { className: 'bg-white p-4 rounded-lg shadow' },
        React.createElement('h2', { className: 'font-medium' }, 'Employés'),
        React.createElement('p', { className: 'text-2xl font-bold' }, '152'),
        React.createElement('p', { className: 'text-sm text-gray-500' }, '+4 ce mois-ci')
      ),
      React.createElement(
        'div', 
        { className: 'bg-white p-4 rounded-lg shadow' },
        React.createElement('h2', { className: 'font-medium' }, 'Départements'),
        React.createElement('p', { className: 'text-2xl font-bold' }, '10'),
        React.createElement('p', { className: 'text-sm text-gray-500' }, 'Tous actifs')
      ),
      React.createElement(
        'div', 
        { className: 'bg-white p-4 rounded-lg shadow' },
        React.createElement('h2', { className: 'font-medium' }, 'Congés en attente'),
        React.createElement('p', { className: 'text-2xl font-bold' }, '8'),
        React.createElement('p', { className: 'text-sm text-gray-500' }, 'À approuver')
      ),
      React.createElement(
        'div', 
        { className: 'bg-white p-4 rounded-lg shadow' },
        React.createElement('h2', { className: 'font-medium' }, 'Contrats actifs'),
        React.createElement('p', { className: 'text-2xl font-bold' }, '145'),
        React.createElement('p', { className: 'text-sm text-gray-500' }, '3 à renouveler ce mois-ci')
      )
    )
  );
};

export default SimpleHRDashboard;
