
import { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { TrainingSession, TrainingEnrollment } from '../../types';
import { trainingSessions } from '../../data/trainings';
import { useToast } from '../../../../src/hooks/use-toast';

export const useSessions = () => {
  const [sessions, setSessions] = useState<TrainingSession[]>(trainingSessions);
  const { toast } = useToast();

  const getSessions = useCallback(() => {
    return sessions;
  }, [sessions]);

  const getSessionById = useCallback((id: string) => {
    return sessions.find(session => session.id === id);
  }, [sessions]);

  const getSessionsByCourse = useCallback((courseId: string) => {
    return sessions.filter(session => session.course_id === courseId);
  }, [sessions]);

  const createSession = useCallback((session: Omit<TrainingSession, 'id' | 'created_at' | 'status'>) => {
    const newSession: TrainingSession = {
      ...session,
      id: uuidv4(),
      created_at: new Date().toISOString(),
      status: 'scheduled'
    };
    setSessions(prev => [...prev, newSession]);
    toast({
      title: "Session créée",
      description: "La session de formation a été créée avec succès."
    });
    return newSession;
  }, [toast]);

  const updateSession = useCallback((id: string, updates: Partial<TrainingSession>) => {
    let updated = false;
    setSessions(prev => {
      const newSessions = prev.map(session => {
        if (session.id === id) {
          updated = true;
          return {
            ...session,
            ...updates,
            updated_at: new Date().toISOString()
          };
        }
        return session;
      });
      return newSessions;
    });

    if (updated) {
      toast({
        title: "Session mise à jour",
        description: "Les informations de la session ont été mises à jour."
      });
      return true;
    }

    toast({
      title: "Erreur",
      description: "La session n'a pas été trouvée.",
      variant: "destructive"
    });
    return false;
  }, [toast]);

  const deleteSession = useCallback((id: string, enrollments: TrainingEnrollment[]) => {
    // Check if there are enrollments for this session
    const hasEnrollments = enrollments.some(enrollment => enrollment.session_id === id);
    if (hasEnrollments) {
      toast({
        title: "Suppression impossible",
        description: "Des employés sont inscrits à cette session.",
        variant: "destructive"
      });
      return false;
    }

    setSessions(prev => prev.filter(session => session.id !== id));
    toast({
      title: "Session supprimée",
      description: "La session de formation a été supprimée avec succès."
    });
    return true;
  }, [toast]);

  return {
    sessions,
    getSessions,
    getSessionById,
    getSessionsByCourse,
    createSession,
    updateSession,
    deleteSession
  };
};
