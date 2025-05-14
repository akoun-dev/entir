import React from 'react';
import { Route } from 'react-router-dom';

// Import des composants de test
import TestComponent from './pages/TestComponent';
import SimpleHRDashboard from './pages/SimpleHRDashboard';
import SimpleEmployeeList from './pages/SimpleEmployeeList';
import SimpleDepartmentList from './pages/SimpleDepartmentList';
import SimpleHRSettings from './pages/SimpleHRSettings';

// Imports commentés pour éviter les erreurs
/*
import EmployeeList from './pages/EmployeeList';
import EmployeeDetail from './pages/EmployeeDetail';
import EmployeeForm from './pages/EmployeeForm';
import DepartmentList from './pages/DepartmentList';
import DepartmentDetail from './pages/DepartmentDetail';
import DepartmentForm from './pages/DepartmentForm';
import HRSettings from './pages/HRSettings';
import HRDashboard from './pages/HRDashboard';
*/

/**
 * Routes du module RH
 *
 * Définit toutes les routes pour les fonctionnalités RH
 */
const routes = (
  <>
    {/* Routes de test */}
    <Route path="/hr" element={<SimpleHRDashboard />} />
    <Route path="/hr/test" element={<TestComponent />} />
    <Route path="/hr/employees" element={<SimpleEmployeeList />} />
    <Route path="/hr/departments" element={<SimpleDepartmentList />} />
    <Route path="/hr/settings" element={<SimpleHRSettings />} />

    {/* Toutes les autres routes sont commentées pour éviter les erreurs */}
    {/*
    <Route path="/hr" element={<HRDashboard />} />

    <Route path="/hr/employees" element={<EmployeeList />} />
    <Route path="/hr/employees/new" element={<EmployeeForm />} />
    <Route path="/hr/employees/:id" element={<EmployeeDetail />} />
    <Route path="/hr/employees/:id/edit" element={<EmployeeForm />} />

    <Route path="/hr/departments" element={<DepartmentList />} />
    <Route path="/hr/departments/new" element={<DepartmentForm />} />
    <Route path="/hr/departments/:id" element={<DepartmentDetail />} />
    <Route path="/hr/departments/:id/edit" element={<DepartmentForm />} />

    <Route path="/hr/settings" element={<HRSettings />} />
    */}
  </>
);

export default routes;
