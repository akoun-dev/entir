import React from 'react';
import { HrMainMenu } from '../components';
import { HrLayout } from '../components/HrLayout';

/**
 * Vue principale du tableau de bord RH
 */
const HrDashboardView: React.FC = () => {
  return (
    <HrLayout>
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Tableau de bord RH</h1>
          <div className="flex gap-2">
            {/* Placeholder for action buttons */}
          </div>
        </div>

        {/* Menu principal avec les cartes d'accès aux modules */}
        <HrMainMenu />
      </div>
    </HrLayout>
  );
};

export default HrDashboardView;
