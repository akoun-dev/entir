import * as React from 'react';

/**
 * Version simplifiée de la page des paramètres RH
 */
const SimpleHRSettings = () => {
  return React.createElement(
    'div', 
    { className: 'container mx-auto py-6' },
    React.createElement(
      'h1', 
      { className: 'text-3xl font-bold tracking-tight mb-2' }, 
      'Paramètres RH'
    ),
    React.createElement(
      'p', 
      { className: 'text-muted-foreground mb-6' }, 
      'Configuration du module Ressources Humaines'
    ),
    React.createElement(
      'div', 
      { className: 'grid gap-6 md:grid-cols-2' },
      React.createElement(
        'div', 
        { className: 'bg-white p-6 rounded-lg shadow' },
        React.createElement('h2', { className: 'text-xl font-semibold mb-4' }, 'Paramètres généraux'),
        React.createElement(
          'div', 
          { className: 'space-y-4' },
          React.createElement(
            'div',
            null,
            React.createElement('label', { className: 'block text-sm font-medium mb-1' }, 'Nom de l\'entreprise'),
            React.createElement('input', { 
              type: 'text', 
              className: 'w-full p-2 border rounded', 
              defaultValue: 'Ma Société' 
            })
          ),
          React.createElement(
            'div',
            null,
            React.createElement('label', { className: 'block text-sm font-medium mb-1' }, 'Année fiscale'),
            React.createElement(
              'select',
              { className: 'w-full p-2 border rounded' },
              React.createElement('option', { value: 'calendar' }, 'Année calendaire (Jan-Déc)'),
              React.createElement('option', { value: 'custom' }, 'Personnalisée')
            )
          ),
          React.createElement(
            'div',
            null,
            React.createElement('label', { className: 'block text-sm font-medium mb-1' }, 'Jours travaillés'),
            React.createElement(
              'select',
              { className: 'w-full p-2 border rounded' },
              React.createElement('option', { value: 'mon-fri' }, 'Lundi-Vendredi'),
              React.createElement('option', { value: 'mon-sat' }, 'Lundi-Samedi'),
              React.createElement('option', { value: 'custom' }, 'Personnalisé')
            )
          )
        )
      ),
      React.createElement(
        'div', 
        { className: 'bg-white p-6 rounded-lg shadow' },
        React.createElement('h2', { className: 'text-xl font-semibold mb-4' }, 'Options'),
        React.createElement(
          'div', 
          { className: 'space-y-4' },
          React.createElement(
            'div',
            { className: 'flex items-center justify-between' },
            React.createElement('span', { className: 'text-sm font-medium' }, 'Approbation automatique des congés'),
            React.createElement('input', { type: 'checkbox', className: 'h-4 w-4' })
          ),
          React.createElement(
            'div',
            { className: 'flex items-center justify-between' },
            React.createElement('span', { className: 'text-sm font-medium' }, 'Activer le suivi des présences'),
            React.createElement('input', { type: 'checkbox', className: 'h-4 w-4', defaultChecked: true })
          ),
          React.createElement(
            'div',
            { className: 'flex items-center justify-between' },
            React.createElement('span', { className: 'text-sm font-medium' }, 'Activer les évaluations'),
            React.createElement('input', { type: 'checkbox', className: 'h-4 w-4', defaultChecked: true })
          )
        )
      )
    ),
    React.createElement(
      'div', 
      { className: 'mt-6 flex justify-end' },
      React.createElement(
        'button',
        { className: 'px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700' },
        'Enregistrer'
      )
    )
  );
};

export default SimpleHRSettings;
