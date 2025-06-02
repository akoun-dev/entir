
import React from 'react';
import { HrLayout, HrSubNavigation, HrBreadcrumb } from '../../components';
import { useTraining } from '../../../hooks/useTraining';
import { useEmployee } from '../../../hooks/useEmployee';
import { toast } from '../../../../../src/hooks/use-toast';
import { TrainingHeader, SessionTabContent } from '../../../components/training/views';
import { TrainingStats, getTrainingSubNavItems } from '../../../components/training';

const SessionsView: React.FC = () => {
  // Get data from hooks
  const {
    courses,
    sessions,
    categories,
    trainers,
    getEnrollmentsBySession,
    createEnrollment,
    getTrainingStats
  } = useTraining();

  const { employees } = useEmployee();
  const currentEmployee = employees.length > 0 ? employees[0] : null;
  const stats = getTrainingStats();

  // Event handlers
  const handleEnrollment = (sessionId: string) => {
    if (!currentEmployee) {
      toast({
        title: "Erreur d'inscription",
        description: "Impossible de déterminer l'employé actuel",
        variant: "destructive"
      });
      return;
    }

    createEnrollment({
      employee_id: currentEmployee.id.toString(),
      session_id: sessionId
    });

    toast({
      title: "Demande d'inscription envoyée",
      description: "Votre demande d'inscription a été enregistrée et est en attente d'approbation."
    });
  };

  // Utilisation des éléments de sous-navigation standardisés
  const subNavItems = getTrainingSubNavItems();

  return (
    <HrLayout>
      <div>
        {/* Fil d'Ariane */}
        <HrBreadcrumb
          items={[
            { label: 'Formation', path: '/hr/training' },
            { label: 'Sessions à venir' }
          ]}
        />

        {/* En-tête avec fil d'Ariane */}
        <TrainingHeader />

        {/* Navigation standardisée */}
        <HrSubNavigation items={subNavItems} />

        {/* Statistiques */}
        <TrainingStats stats={stats} categories={categories} />

        {/* Sessions content */}
        <SessionTabContent />
      </div>
    </HrLayout>
  );
};

export default SessionsView;
