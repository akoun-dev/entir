import * as React from 'react';

// Utilisation de React.createElement au lieu de JSX
const TestComponent = () => {
  return React.createElement(
    'div',
    null,
    React.createElement('h1', null, 'Test Component'),
    React.createElement('p', null, 'This is a test component')
  );
};

export default TestComponent;
