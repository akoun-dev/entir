
import React from 'react';
import { HrLayout } from '../../components';
import { useTraining } from '../../../hooks/useTraining';
import { TrainingHeader } from '../../../components/training/views';
import { TrainingNavBar } from '../../../components/training/views';
import { TrainingStats, TrainingCalendar } from '../../../components/training';

const CalendarView: React.FC = () => {
  // Get data from hooks
  const { 
    courses,
    sessions,
    categories,
    getTrainingStats
  } = useTraining();

  const stats = getTrainingStats();

  return (
    <HrLayout>
      <div>
        {/* En-tête avec fil d'Ariane */}
        <TrainingHeader />

        {/* Navigation */}
        <TrainingNavBar />

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
