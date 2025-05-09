
import React from 'react';
import { Route } from 'react-router-dom';
import {
  HrDashboardView,
  EmployeesView,
  EmployeeFormView,
  EmployeeDetailView,
  DepartmentsView,
  DepartmentFormView,
  DepartmentDetailView,
  DocumentsView,
  SettingsView,
  ConfigView,
  ContractsView,
  LeavesView,
  TrainingView,
  RecruitmentView
} from './views/pages';

/**
 * Routes pour le module HR
 */
const routes = (
  <>
    {/* Routes principales */}
    <Route path="/hr" element={<HrDashboardView />} />

    {/* Routes pour les employés */}
    <Route path="/hr/employees" element={<EmployeesView />} />
    <Route path="/hr/employees/new" element={<EmployeeFormView />} />
    <Route path="/hr/employees/:id" element={<EmployeeDetailView />} />
    <Route path="/hr/employees/edit/:id" element={<EmployeeFormView />} />

    {/* Routes pour les départements */}
    <Route path="/hr/departments" element={<DepartmentsView />} />
    <Route path="/hr/departments/new" element={<DepartmentFormView />} />
    <Route path="/hr/departments/:id" element={<DepartmentDetailView />} />
    <Route path="/hr/departments/edit/:id" element={<DepartmentFormView />} />

    {/* Routes pour les contrats */}
    <Route path="/hr/contracts" element={<ContractsView />} />
    
    {/* Routes pour les congés */}
    <Route path="/hr/leaves" element={<LeavesView />} />
    
    {/* Routes pour la formation */}
    <Route path="/hr/training" element={<TrainingView />} />
    
    {/* Routes pour le recrutement */}
    <Route path="/hr/recruitment" element={<RecruitmentView />} />

    {/* Autres routes */}
    <Route path="/hr/documents" element={<DocumentsView />} />
    <Route path="/hr/settings" element={<SettingsView />} />
    <Route path="/hr/config" element={<ConfigView />} />
    <Route path="/hr/config/:configType" element={<ConfigView />} />
  </>
);

export default routes;
