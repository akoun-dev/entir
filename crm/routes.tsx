import React from 'react';
import { Route } from 'react-router-dom';
import { CrmDashboardView } from './views/pages';

/**
 * Routes du module CRM
 */
const routes = (
  <>
    <Route path="/crm" element={<CrmDashboardView />} />
    {/* Autres routes à ajouter au fur et à mesure */}
  </>
);

export default routes;
