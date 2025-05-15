import React from 'react';
import { Route } from 'react-router-dom';

// Import des composants de vue
import {
  HrDashboardView,
  EmployeesView,
  EmployeeFormView,
  EmployeeDetailView,
  DepartmentsView,
  DepartmentFormView,
  DepartmentDetailView,
  SettingsView,
  ConfigView,
  ContractsView,
  ContractFormView,
  LeavesView,
  TrainingView,
  RecruitmentView,
  OrganizationView,
  RolesView,
  JobOfferFormView,
  JobOfferDetailView,
  // Import des vues de formation
  CoursesView,
  CourseFormView,
  SessionsView,
  CalendarView,
  EnrollmentsView,
  DocumentView
} from './views/pages';

/**
 * Routes du module RH
 *
 * Définit toutes les routes pour les fonctionnalités RH
 */
const routes = (
  <>
    {/* Routes principales */}
    <Route path="/hr" element={<HrDashboardView />} />
    <Route path="/hr/employees" element={<EmployeesView />} />
    <Route path="/hr/employees/new" element={<EmployeeFormView />} />
    <Route path="/hr/employees/:id" element={<EmployeeDetailView />} />
    <Route path="/hr/employees/:id/edit" element={<EmployeeFormView />} />

    <Route path="/hr/departments" element={<DepartmentsView />} />
    <Route path="/hr/departments/new" element={<DepartmentFormView />} />
    <Route path="/hr/departments/:id" element={<DepartmentDetailView />} />
    <Route path="/hr/departments/:id/edit" element={<DepartmentFormView />} />

    <Route path="/hr/contracts" element={<ContractsView />} />
    <Route path="/hr/contracts/new" element={<ContractFormView />} />
    <Route path="/hr/contracts/:id" element={<ContractFormView />} />
    <Route path="/hr/contracts/:id/edit" element={<ContractFormView />} />
    <Route path="/hr/leaves" element={<LeavesView />} />

    {/* Routes de formation */}
    <Route path="/hr/training" element={<TrainingView />} />
    <Route path="/hr/training/courses" element={<CoursesView />} />
    <Route path="/hr/training/courses/new" element={<CourseFormView />} />
    <Route path="/hr/training/courses/:id" element={<CourseFormView />} />
    <Route path="/hr/training/courses/:id/edit" element={<CourseFormView />} />
    <Route path="/hr/training/sessions" element={<SessionsView />} />
    <Route path="/hr/training/calendar" element={<CalendarView />} />
    <Route path="/hr/training/enrollments" element={<EnrollmentsView />} />
    <Route path="/hr/training/document/course/:id" element={<DocumentView />} />

    <Route path="/hr/recruitment" element={<RecruitmentView />} />
    <Route path="/hr/recruitment/offers/new" element={<JobOfferFormView />} />
    <Route path="/hr/recruitment/offers/:id" element={<JobOfferDetailView />} />
    <Route path="/hr/recruitment/offers/:id/edit" element={<JobOfferFormView />} />
    <Route path="/hr/organization" element={<OrganizationView />} />
    <Route path="/hr/roles" element={<RolesView />} />

    {/* Routes de paramètres */}
    <Route path="/hr/settings" element={<SettingsView />} />
    <Route path="/hr/config" element={<ConfigView />} />
    <Route path="/hr/config/*" element={<ConfigView />} />
  </>
);

export default routes;
