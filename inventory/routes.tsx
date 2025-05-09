import React from 'react';
import { Route } from 'react-router-dom';
import { InventoryDashboardView } from './views/pages';

/**
 * Routes du module Inventaire
 */
const routes = (
  <>
    <Route path="/inventory" element={<InventoryDashboardView />} />
  </>
);

export default routes;
