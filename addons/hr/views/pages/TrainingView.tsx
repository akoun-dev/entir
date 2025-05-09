import React from 'react';
import { HrLayout } from '../components';
import { GraduationCap } from 'lucide-react';

/**
 * Page de gestion des formations
 */
const TrainingView: React.FC = () => {
  return (
    <HrLayout>
      <div>
        {/* En-tête avec fil d'Ariane */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mt-4">
            <div className="h-6 w-1.5 bg-amber-500 rounded-full"></div>
            <GraduationCap className="h-6 w-6 text-amber-500" />
            <h1 className="text-2xl font-bold">Gestion des Formations</h1>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-4 gap-4">
            <p className="text-muted-foreground">
              Planifiez et suivez les formations des employés
            </p>
          </div>
        </div>

        <div className="mt-8 p-8 text-center bg-muted/20 rounded-lg">
          <p className="text-muted-foreground">
            Cette fonctionnalité est en cours de développement.
          </p>
        </div>
      </div>
    </HrLayout>
  );
};

export default TrainingView;
