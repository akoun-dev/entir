
import React, { useCallback } from 'react';
import { HrLayout, HrSubNavigation, HrBreadcrumb } from '../../components';
import { useTraining } from '../../../hooks/useTraining';
import { useEmployee } from '../../../hooks/useEmployee';
import { TrainingHeader } from '../../../components/training/views';
import { TrainingStats, EnrollmentList, getTrainingSubNavItems } from '../../../components/training';

const EnrollmentsView: React.FC = () => {
  // Get data from hooks
  const {
    courses,
    sessions,
    enrollments,
    categories,
    approveEnrollment,
    rejectEnrollment,
    getTrainingStats
  } = useTraining();

  const { employees } = useEmployee();
  const currentEmployee = employees.length > 0 ? employees[0] : null;
  const stats = getTrainingStats();

  // Helper functions
  const getEmployeeNames = useCallback(() => {
    const nameMap: Record<string, string> = {};
    employees.forEach(emp => {
      nameMap[emp.id.toString()] = emp.name;
    });
    return nameMap;
  }, [employees]);

  const handleApproveEnrollment = useCallback((enrollmentId: string) => {
    if (!currentEmployee) return;

    approveEnrollment(enrollmentId, currentEmployee.id.toString());
  }, [approveEnrollment, currentEmployee]);

  const handleRejectEnrollment = useCallback((enrollmentId: string) => {
    if (!currentEmployee) return;

    rejectEnrollment(enrollmentId, currentEmployee.id.toString());
  }, [rejectEnrollment, currentEmployee]);

  // Utilisation des éléments de sous-navigation standardisés
  const subNavItems = getTrainingSubNavItems();

  return (
    <HrLayout>
      <div>
        {/* Fil d'Ariane */}
        <HrBreadcrumb
          items={[
            { label: 'Formation', path: '/hr/training' },
            { label: 'Inscriptions' }
          ]}
        />

        {/* En-tête avec fil d'Ariane */}
        <TrainingHeader />

        {/* Navigation standardisée */}
        <HrSubNavigation items={subNavItems} />

        {/* Statistiques */}
        <TrainingStats stats={stats} categories={categories} />

        {/* Enrollments content */}
        <EnrollmentList
          enrollments={enrollments}
          sessions={sessions}
          courses={courses}
          employeeNames={getEmployeeNames()}
          onApprove={handleApproveEnrollment}
          onReject={handleRejectEnrollment}
          showApprovalActions={true}
        />
      </div>
    </HrLayout>
  );
};

export default EnrollmentsView;
