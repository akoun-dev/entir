import React from 'react';
import { HrLayout } from '../components';
import { Briefcase } from 'lucide-react';

/**
 * Page de gestion du recrutement
 */
const RecruitmentView: React.FC = () => {
  return (
    <HrLayout>
      <div>
        {/* En-tête avec fil d'Ariane */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mt-4">
            <div className="h-6 w-1.5 bg-amber-500 rounded-full"></div>
            <Briefcase className="h-6 w-6 text-amber-500" />
            <h1 className="text-2xl font-bold">Gestion du Recrutement</h1>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-4 gap-4">
            <p className="text-muted-foreground">
              Gérez les processus de recrutement et les candidatures
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

export default RecruitmentView;
