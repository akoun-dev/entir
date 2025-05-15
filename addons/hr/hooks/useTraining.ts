
import { useCategories } from './training/useCategories';
import { useCourses } from './training/useCourses';
import { useEnrollments } from './training/useEnrollments';
import { useSessions } from './training/useSessions';
import { useTrainers } from './training/useTrainers';
import { useTrainingStats } from './training/useTrainingStats';

export const useTraining = () => {
  const { courses, getCourseById, getCourses, createCourse, updateCourse, deleteCourse } = useCourses();
  const { sessions, getSessionById, getSessions, getSessionsByCourse, createSession, updateSession, deleteSession } = useSessions();
  const { 
    enrollments, getEnrollments, getEnrollmentsBySession, getEnrollmentsByEmployee, 
    createEnrollment, updateEnrollment, approveEnrollment, rejectEnrollment, 
    completeEnrollment, deleteEnrollment
  } = useEnrollments();
  const { categories, getCategories, getCategoryById } = useCategories();
  const { trainers, getTrainers, getTrainerById } = useTrainers();
  const { getTrainingStats } = useTrainingStats(courses, sessions, enrollments, categories);

  // This is a wrapper to ensure the sessions argument is passed to deleteCourse
  const deleteCourseWithSessions = (id: string) => {
    return deleteCourse(id, sessions);
  };

  // This is a wrapper to ensure the enrollments argument is passed to deleteSession
  const deleteSessionWithEnrollments = (id: string) => {
    return deleteSession(id, enrollments);
  };

  return {
    // Course operations
    courses,
    getCourses,
    getCourseById,
    createCourse,
    updateCourse,
    deleteCourse: deleteCourseWithSessions,
    
    // Session operations
    sessions,
    getSessions,
    getSessionById,
    getSessionsByCourse,
    createSession,
    updateSession,
    deleteSession: deleteSessionWithEnrollments,
    
    // Enrollment operations
    enrollments,
    getEnrollments,
    getEnrollmentsBySession,
    getEnrollmentsByEmployee,
    createEnrollment,
    updateEnrollment,
    approveEnrollment,
    rejectEnrollment,
    completeEnrollment,
    deleteEnrollment,
    
    // Category operations
    categories,
    getCategories,
    getCategoryById,
    
    // Trainer operations
    trainers,
    getTrainers,
    getTrainerById,
    
    // Statistics
    getTrainingStats
  };
};
