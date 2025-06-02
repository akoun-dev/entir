import { useState, useEffect, useCallback } from 'react';
import { 
  TrainingCourse, 
  TrainingSession, 
  TrainingEnrollment, 
  TrainingCategory,
  TrainerProfile
} from '../types';
import { trainingService } from '../services';

/**
 * Interface pour les données de retour du hook useTraining
 */
interface UseTrainingReturn {
  // Données
  courses: TrainingCourse[];
  sessions: TrainingSession[];
  enrollments: TrainingEnrollment[];
  categories: TrainingCategory[];
  trainers: TrainerProfile[];
  
  // États de chargement
  loading: {
    courses: boolean;
    sessions: boolean;
    enrollments: boolean;
    categories: boolean;
    trainers: boolean;
  };
  
  // Erreurs
  errors: {
    courses: string | null;
    sessions: string | null;
    enrollments: string | null;
    categories: string | null;
    trainers: string | null;
  };
  
  // Méthodes pour les cours
  loadCourses: () => Promise<TrainingCourse[]>;
  getCourseById: (id: string) => TrainingCourse | undefined;
  createCourse: (course: Omit<TrainingCourse, 'id'>) => Promise<TrainingCourse | null>;
  updateCourse: (id: string, course: Partial<TrainingCourse>) => Promise<TrainingCourse | null>;
  deleteCourse: (id: string) => Promise<boolean>;
  
  // Méthodes pour les sessions
  loadSessions: () => Promise<TrainingSession[]>;
  getSessionById: (id: string) => TrainingSession | undefined;
  getSessionsByCourse: (courseId: string) => TrainingSession[];
  createSession: (session: Omit<TrainingSession, 'id'>) => Promise<TrainingSession | null>;
  updateSession: (id: string, session: Partial<TrainingSession>) => Promise<TrainingSession | null>;
  deleteSession: (id: string) => Promise<boolean>;
  
  // Méthodes pour les inscriptions
  loadEnrollments: () => Promise<TrainingEnrollment[]>;
  getEnrollmentById: (id: string) => TrainingEnrollment | undefined;
  getEnrollmentsBySession: (sessionId: string) => TrainingEnrollment[];
  getEnrollmentsByEmployee: (employeeId: string) => Promise<TrainingEnrollment[]>;
  createEnrollment: (enrollment: Omit<TrainingEnrollment, 'id'>) => Promise<TrainingEnrollment | null>;
  updateEnrollment: (id: string, enrollment: Partial<TrainingEnrollment>) => Promise<TrainingEnrollment | null>;
  deleteEnrollment: (id: string) => Promise<boolean>;
  approveEnrollment: (id: string, notes?: string) => Promise<TrainingEnrollment | null>;
  rejectEnrollment: (id: string, reason: string) => Promise<TrainingEnrollment | null>;
  
  // Méthodes pour les catégories
  loadCategories: () => Promise<TrainingCategory[]>;
  getCategoryById: (id: string) => TrainingCategory | undefined;
  
  // Méthodes pour les formateurs
  loadTrainers: () => Promise<TrainerProfile[]>;
  getTrainerById: (id: string) => TrainerProfile | undefined;
}

/**
 * Hook pour gérer les formations
 * 
 * Ce hook fournit des fonctionnalités pour gérer les cours, sessions, inscriptions,
 * catégories et formateurs dans le module de formation.
 */
export const useTraining = (): UseTrainingReturn => {
  // États pour les données
  const [courses, setCourses] = useState<TrainingCourse[]>([]);
  const [sessions, setSessions] = useState<TrainingSession[]>([]);
  const [enrollments, setEnrollments] = useState<TrainingEnrollment[]>([]);
  const [categories, setCategories] = useState<TrainingCategory[]>([]);
  const [trainers, setTrainers] = useState<TrainerProfile[]>([]);
  
  // États pour le chargement
  const [loading, setLoading] = useState({
    courses: false,
    sessions: false,
    enrollments: false,
    categories: false,
    trainers: false
  });
  
  // États pour les erreurs
  const [errors, setErrors] = useState({
    courses: null as string | null,
    sessions: null as string | null,
    enrollments: null as string | null,
    categories: null as string | null,
    trainers: null as string | null
  });
  
  // Méthodes pour les cours
  const loadCourses = useCallback(async () => {
    try {
      setLoading(prev => ({ ...prev, courses: true }));
      setErrors(prev => ({ ...prev, courses: null }));
      
      const data = await trainingService.getAllCourses();
      setCourses(data);
      
      return data;
    } catch (error) {
      console.error('Erreur lors du chargement des cours:', error);
      setErrors(prev => ({ ...prev, courses: 'Impossible de charger les cours de formation.' }));
      return [];
    } finally {
      setLoading(prev => ({ ...prev, courses: false }));
    }
  }, []);
  
  const getCourseById = useCallback((id: string) => {
    return courses.find(course => course.id === id);
  }, [courses]);
  
  const createCourse = useCallback(async (course: Omit<TrainingCourse, 'id'>) => {
    try {
      setLoading(prev => ({ ...prev, courses: true }));
      
      const newCourse = await trainingService.createCourse(course);
      setCourses(prev => [...prev, newCourse]);
      
      return newCourse;
    } catch (error) {
      console.error('Erreur lors de la création du cours:', error);
      setErrors(prev => ({ ...prev, courses: 'Impossible de créer le cours de formation.' }));
      return null;
    } finally {
      setLoading(prev => ({ ...prev, courses: false }));
    }
  }, []);
  
  const updateCourse = useCallback(async (id: string, course: Partial<TrainingCourse>) => {
    try {
      setLoading(prev => ({ ...prev, courses: true }));
      
      const updatedCourse = await trainingService.updateCourse(id, course);
      setCourses(prev => prev.map(c => c.id === id ? updatedCourse : c));
      
      return updatedCourse;
    } catch (error) {
      console.error(`Erreur lors de la mise à jour du cours ${id}:`, error);
      setErrors(prev => ({ ...prev, courses: `Impossible de mettre à jour le cours ${id}.` }));
      return null;
    } finally {
      setLoading(prev => ({ ...prev, courses: false }));
    }
  }, []);
  
  const deleteCourse = useCallback(async (id: string) => {
    try {
      setLoading(prev => ({ ...prev, courses: true }));
      
      const result = await trainingService.deleteCourse(id);
      
      if (result.success) {
        setCourses(prev => prev.filter(course => course.id !== id));
      }
      
      return result.success;
    } catch (error) {
      console.error(`Erreur lors de la suppression du cours ${id}:`, error);
      setErrors(prev => ({ ...prev, courses: `Impossible de supprimer le cours ${id}.` }));
      return false;
    } finally {
      setLoading(prev => ({ ...prev, courses: false }));
    }
  }, []);
  
  // Méthodes pour les sessions
  const loadSessions = useCallback(async () => {
    try {
      setLoading(prev => ({ ...prev, sessions: true }));
      setErrors(prev => ({ ...prev, sessions: null }));
      
      const data = await trainingService.getAllSessions();
      setSessions(data);
      
      return data;
    } catch (error) {
      console.error('Erreur lors du chargement des sessions:', error);
      setErrors(prev => ({ ...prev, sessions: 'Impossible de charger les sessions de formation.' }));
      return [];
    } finally {
      setLoading(prev => ({ ...prev, sessions: false }));
    }
  }, []);
  
  const getSessionById = useCallback((id: string) => {
    return sessions.find(session => session.id === id);
  }, [sessions]);
  
  const getSessionsByCourse = useCallback((courseId: string) => {
    return sessions.filter(session => session.course_id === courseId);
  }, [sessions]);
  
  const createSession = useCallback(async (session: Omit<TrainingSession, 'id'>) => {
    try {
      setLoading(prev => ({ ...prev, sessions: true }));
      
      const newSession = await trainingService.createSession(session);
      setSessions(prev => [...prev, newSession]);
      
      return newSession;
    } catch (error) {
      console.error('Erreur lors de la création de la session:', error);
      setErrors(prev => ({ ...prev, sessions: 'Impossible de créer la session de formation.' }));
      return null;
    } finally {
      setLoading(prev => ({ ...prev, sessions: false }));
    }
  }, []);
  
  const updateSession = useCallback(async (id: string, session: Partial<TrainingSession>) => {
    try {
      setLoading(prev => ({ ...prev, sessions: true }));
      
      const updatedSession = await trainingService.updateSession(id, session);
      setSessions(prev => prev.map(s => s.id === id ? updatedSession : s));
      
      return updatedSession;
    } catch (error) {
      console.error(`Erreur lors de la mise à jour de la session ${id}:`, error);
      setErrors(prev => ({ ...prev, sessions: `Impossible de mettre à jour la session ${id}.` }));
      return null;
    } finally {
      setLoading(prev => ({ ...prev, sessions: false }));
    }
  }, []);
  
  const deleteSession = useCallback(async (id: string) => {
    try {
      setLoading(prev => ({ ...prev, sessions: true }));
      
      const result = await trainingService.deleteSession(id);
      
      if (result.success) {
        setSessions(prev => prev.filter(session => session.id !== id));
      }
      
      return result.success;
    } catch (error) {
      console.error(`Erreur lors de la suppression de la session ${id}:`, error);
      setErrors(prev => ({ ...prev, sessions: `Impossible de supprimer la session ${id}.` }));
      return false;
    } finally {
      setLoading(prev => ({ ...prev, sessions: false }));
    }
  }, []);
  
  // Méthodes pour les inscriptions
  const loadEnrollments = useCallback(async () => {
    try {
      setLoading(prev => ({ ...prev, enrollments: true }));
      setErrors(prev => ({ ...prev, enrollments: null }));
      
      const data = await trainingService.getAllEnrollments();
      setEnrollments(data);
      
      return data;
    } catch (error) {
      console.error('Erreur lors du chargement des inscriptions:', error);
      setErrors(prev => ({ ...prev, enrollments: 'Impossible de charger les inscriptions aux formations.' }));
      return [];
    } finally {
      setLoading(prev => ({ ...prev, enrollments: false }));
    }
  }, []);
  
  const getEnrollmentById = useCallback((id: string) => {
    return enrollments.find(enrollment => enrollment.id === id);
  }, [enrollments]);
  
  const getEnrollmentsBySession = useCallback((sessionId: string) => {
    return enrollments.filter(enrollment => enrollment.session_id === sessionId);
  }, [enrollments]);
  
  const getEnrollmentsByEmployee = useCallback(async (employeeId: string) => {
    try {
      setLoading(prev => ({ ...prev, enrollments: true }));
      
      const data = await trainingService.getEnrollmentsByEmployee(employeeId);
      
      // Mettre à jour les inscriptions locales avec les nouvelles données
      setEnrollments(prev => {
        const existingIds = new Set(data.map(e => e.id));
        const filtered = prev.filter(e => !existingIds.has(e.id) || e.employee_id !== employeeId);
        return [...filtered, ...data];
      });
      
      return data;
    } catch (error) {
      console.error(`Erreur lors du chargement des inscriptions de l'employé ${employeeId}:`, error);
      setErrors(prev => ({ ...prev, enrollments: `Impossible de charger les inscriptions de l'employé ${employeeId}.` }));
      return [];
    } finally {
      setLoading(prev => ({ ...prev, enrollments: false }));
    }
  }, []);
  
  const createEnrollment = useCallback(async (enrollment: Omit<TrainingEnrollment, 'id'>) => {
    try {
      setLoading(prev => ({ ...prev, enrollments: true }));
      
      const newEnrollment = await trainingService.createEnrollment(enrollment);
      setEnrollments(prev => [...prev, newEnrollment]);
      
      return newEnrollment;
    } catch (error) {
      console.error('Erreur lors de la création de l\'inscription:', error);
      setErrors(prev => ({ ...prev, enrollments: 'Impossible de créer l\'inscription à la formation.' }));
      return null;
    } finally {
      setLoading(prev => ({ ...prev, enrollments: false }));
    }
  }, []);
  
  const updateEnrollment = useCallback(async (id: string, enrollment: Partial<TrainingEnrollment>) => {
    try {
      setLoading(prev => ({ ...prev, enrollments: true }));
      
      const updatedEnrollment = await trainingService.updateEnrollment(id, enrollment);
      setEnrollments(prev => prev.map(e => e.id === id ? updatedEnrollment : e));
      
      return updatedEnrollment;
    } catch (error) {
      console.error(`Erreur lors de la mise à jour de l'inscription ${id}:`, error);
      setErrors(prev => ({ ...prev, enrollments: `Impossible de mettre à jour l'inscription ${id}.` }));
      return null;
    } finally {
      setLoading(prev => ({ ...prev, enrollments: false }));
    }
  }, []);
  
  const deleteEnrollment = useCallback(async (id: string) => {
    try {
      setLoading(prev => ({ ...prev, enrollments: true }));
      
      const result = await trainingService.deleteEnrollment(id);
      
      if (result.success) {
        setEnrollments(prev => prev.filter(enrollment => enrollment.id !== id));
      }
      
      return result.success;
    } catch (error) {
      console.error(`Erreur lors de la suppression de l'inscription ${id}:`, error);
      setErrors(prev => ({ ...prev, enrollments: `Impossible de supprimer l'inscription ${id}.` }));
      return false;
    } finally {
      setLoading(prev => ({ ...prev, enrollments: false }));
    }
  }, []);
  
  const approveEnrollment = useCallback(async (id: string, notes?: string) => {
    try {
      setLoading(prev => ({ ...prev, enrollments: true }));
      
      const updatedEnrollment = await trainingService.approveEnrollment(id, notes);
      setEnrollments(prev => prev.map(e => e.id === id ? updatedEnrollment : e));
      
      return updatedEnrollment;
    } catch (error) {
      console.error(`Erreur lors de l'approbation de l'inscription ${id}:`, error);
      setErrors(prev => ({ ...prev, enrollments: `Impossible d'approuver l'inscription ${id}.` }));
      return null;
    } finally {
      setLoading(prev => ({ ...prev, enrollments: false }));
    }
  }, []);
  
  const rejectEnrollment = useCallback(async (id: string, reason: string) => {
    try {
      setLoading(prev => ({ ...prev, enrollments: true }));
      
      const updatedEnrollment = await trainingService.rejectEnrollment(id, reason);
      setEnrollments(prev => prev.map(e => e.id === id ? updatedEnrollment : e));
      
      return updatedEnrollment;
    } catch (error) {
      console.error(`Erreur lors du rejet de l'inscription ${id}:`, error);
      setErrors(prev => ({ ...prev, enrollments: `Impossible de rejeter l'inscription ${id}.` }));
      return null;
    } finally {
      setLoading(prev => ({ ...prev, enrollments: false }));
    }
  }, []);
  
  // Méthodes pour les catégories
  const loadCategories = useCallback(async () => {
    try {
      setLoading(prev => ({ ...prev, categories: true }));
      setErrors(prev => ({ ...prev, categories: null }));
      
      const data = await trainingService.getAllCategories();
      setCategories(data);
      
      return data;
    } catch (error) {
      console.error('Erreur lors du chargement des catégories:', error);
      setErrors(prev => ({ ...prev, categories: 'Impossible de charger les catégories de formation.' }));
      return [];
    } finally {
      setLoading(prev => ({ ...prev, categories: false }));
    }
  }, []);
  
  const getCategoryById = useCallback((id: string) => {
    return categories.find(category => category.id === id);
  }, [categories]);
  
  // Méthodes pour les formateurs (simulées pour l'instant)
  const loadTrainers = useCallback(async () => {
    try {
      setLoading(prev => ({ ...prev, trainers: true }));
      setErrors(prev => ({ ...prev, trainers: null }));
      
      // Données simulées pour les formateurs
      const mockTrainers: TrainerProfile[] = [
        {
          id: '1',
          name: 'Konan Michel',
          email: 'k.michel@example.com',
          phone: '+225 0701020304',
          specialization: ['Développement Web', 'JavaScript', 'React'],
          bio: 'Expert en développement web avec 10 ans d\'expérience',
          external: false
        },
        {
          id: '2',
          name: 'Bamba Sarah',
          email: 's.bamba@example.com',
          phone: '+225 0705060708',
          specialization: ['Ressources Humaines', 'Management', 'Leadership'],
          bio: 'Consultante RH et formatrice certifiée',
          external: true
        },
        {
          id: '3',
          name: 'Touré Jean',
          email: 'j.toure@example.com',
          phone: '+225 0709101112',
          specialization: ['Finance', 'Comptabilité', 'Gestion de projet'],
          bio: 'Expert-comptable et formateur en finance d\'entreprise',
          external: false
        }
      ];
      
      setTrainers(mockTrainers);
      
      return mockTrainers;
    } catch (error) {
      console.error('Erreur lors du chargement des formateurs:', error);
      setErrors(prev => ({ ...prev, trainers: 'Impossible de charger les formateurs.' }));
      return [];
    } finally {
      setLoading(prev => ({ ...prev, trainers: false }));
    }
  }, []);
  
  const getTrainerById = useCallback((id: string) => {
    return trainers.find(trainer => trainer.id === id);
  }, [trainers]);
  
  // Charger les données initiales
  useEffect(() => {
    loadCourses();
    loadSessions();
    loadEnrollments();
    loadCategories();
    loadTrainers();
  }, [loadCourses, loadSessions, loadEnrollments, loadCategories, loadTrainers]);
  
  return {
    // Données
    courses,
    sessions,
    enrollments,
    categories,
    trainers,
    
    // États de chargement
    loading,
    
    // Erreurs
    errors,
    
    // Méthodes pour les cours
    loadCourses,
    getCourseById,
    createCourse,
    updateCourse,
    deleteCourse,
    
    // Méthodes pour les sessions
    loadSessions,
    getSessionById,
    getSessionsByCourse,
    createSession,
    updateSession,
    deleteSession,
    
    // Méthodes pour les inscriptions
    loadEnrollments,
    getEnrollmentById,
    getEnrollmentsBySession,
    getEnrollmentsByEmployee,
    createEnrollment,
    updateEnrollment,
    deleteEnrollment,
    approveEnrollment,
    rejectEnrollment,
    
    // Méthodes pour les catégories
    loadCategories,
    getCategoryById,
    
    // Méthodes pour les formateurs
    loadTrainers,
    getTrainerById
  };
};

export default useTraining;
