
import React from 'react';
import { HrLayout, HrSubNavigation, HrBreadcrumb } from '../../components';
import { useTraining } from '../../../hooks/useTraining';
import { TrainingHeader } from '../../../components/training/views';
import { TrainingStats, TrainingCalendar, getTrainingSubNavItems } from '../../../components/training';

const CalendarView: React.FC = () => {
  // Get data from hooks
  const {
    courses,
    sessions,
    categories,
    getTrainingStats
  } = useTraining();

  const stats = getTrainingStats();

  // Utilisation des éléments de sous-navigation standardisés
  const subNavItems = getTrainingSubNavItems();

  return (
    <HrLayout>
      <div>
        {/* Fil d'Ariane */}
        <HrBreadcrumb
          items={[
            { label: 'Formation', path: '/hr/training' },
            { label: 'Calendrier' }
          ]}
        />

        {/* En-tête avec fil d'Ariane */}
        <TrainingHeader />

        {/* Navigation standardisée */}
        <HrSubNavigation items={subNavItems} />

        {/* Statistiques */}
        <TrainingStats stats={stats} categories={categories} />

        {/* Calendar content */}
        <TrainingCalendar
          sessions={sessions}
          courses={courses}
        />
      </div>
    </HrLayout>
  );
};

export default CalendarView;
