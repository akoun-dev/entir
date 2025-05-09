import React from 'react';
import { Route } from 'react-router-dom';
import { ProjectDashboardView } from './views/pages';

/**
 * Routes du module Project
 */
const routes = (
  <>
    <Route path="/project" element={<ProjectDashboardView />} />
    {/* Autres routes à ajouter au fur et à mesure */}
  </>
);

export default routes;
