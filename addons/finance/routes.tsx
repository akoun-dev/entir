import React from 'react';
import { Route } from 'react-router-dom';
import {
  FinanceDashboardView,
  InvoicesView,
  PaymentsView,
  ReportsView
} from './views/pages';

/**
 * Routes du module Finance
 */
const routes = (
  <>
    <Route path="/finance" element={<FinanceDashboardView />} />
    <Route path="/finance/invoices" element={<InvoicesView />} />
    <Route path="/finance/payments" element={<PaymentsView />} />
    <Route path="/finance/reports" element={<ReportsView />} />
  </>
);

export default routes;
