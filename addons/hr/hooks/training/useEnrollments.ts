
import { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { TrainingEnrollment } from '../../types';
import { trainingEnrollments } from '../../data/trainings';
import { useToast } from '../../../../src/hooks/use-toast';

export const useEnrollments = () => {
  const [enrollments, setEnrollments] = useState<TrainingEnrollment[]>(trainingEnrollments);
  const { toast } = useToast();

  const getEnrollments = useCallback(() => {
    return enrollments;
  }, [enrollments]);

  const getEnrollmentsBySession = useCallback((sessionId: string) => {
    return enrollments.filter(enrollment => enrollment.session_id === sessionId);
  }, [enrollments]);

  const getEnrollmentsByEmployee = useCallback((employeeId: string) => {
    return enrollments.filter(enrollment => enrollment.employee_id === employeeId);
  }, [enrollments]);

  const createEnrollment = useCallback((enrollment: Omit<TrainingEnrollment, 'id' | 'enrollment_date' | 'status' | 'attendance' | 'certificate_issued'>) => {
    const newEnrollment: TrainingEnrollment = {
      ...enrollment,
      id: uuidv4(),
      enrollment_date: new Date().toISOString(),
      status: 'pending',
      attendance: 0,
      certificate_issued: false
    };
    setEnrollments(prev => [...prev, newEnrollment]);
    toast({
      title: "Inscription enregistrée",
      description: "L'inscription à la formation a été enregistrée avec succès."
    });
    return newEnrollment;
  }, [toast]);

  const updateEnrollment = useCallback((id: string, updates: Partial<TrainingEnrollment>) => {
    let updated = false;
    setEnrollments(prev => {
      const newEnrollments = prev.map(enrollment => {
        if (enrollment.id === id) {
          updated = true;
          return {
            ...enrollment,
            ...updates
          };
        }
        return enrollment;
      });
      return newEnrollments;
    });

    if (updated) {
      toast({
        title: "Inscription mise à jour",
        description: "Les informations de l'inscription ont été mises à jour."
      });
      return true;
    }

    toast({
      title: "Erreur",
      description: "L'inscription n'a pas été trouvée.",
      variant: "destructive"
    });
    return false;
  }, [toast]);

  const approveEnrollment = useCallback((id: string, approverId: string) => {
    return updateEnrollment(id, {
      status: 'approved',
      manager_approval: true,
      approved_by: approverId,
      approved_at: new Date().toISOString()
    });
  }, [updateEnrollment]);

  const rejectEnrollment = useCallback((id: string, approverId: string) => {
    return updateEnrollment(id, {
      status: 'rejected',
      manager_approval: false,
      approved_by: approverId,
      approved_at: new Date().toISOString()
    });
  }, [updateEnrollment]);

  const completeEnrollment = useCallback((id: string, score?: number, feedback?: string) => {
    return updateEnrollment(id, {
      status: 'completed',
      completion_date: new Date().toISOString(),
      score,
      feedback,
      attendance: 100,
      certificate_issued: true
    });
  }, [updateEnrollment]);

  const deleteEnrollment = useCallback((id: string) => {
    setEnrollments(prev => prev.filter(enrollment => enrollment.id !== id));
    toast({
      title: "Inscription supprimée",
      description: "L'inscription a été supprimée avec succès."
    });
    return true;
  }, [toast]);

  return {
    enrollments,
    getEnrollments,
    getEnrollmentsBySession,
    getEnrollmentsByEmployee,
    createEnrollment,
    updateEnrollment,
    approveEnrollment,
    rejectEnrollment,
    completeEnrollment,
    deleteEnrollment
  };
};
