import { api } from '../../../src/services/api';
import { TrainingCourse, TrainingSession, TrainingEnrollment, TrainingCategory } from '../types';

/**
 * Service pour la gestion de la formation
 * Fournit les méthodes pour interagir avec l'API backend
 */
export const trainingService = {
  /**
   * Récupère tous les cours de formation
   * @returns Liste des cours de formation
   */
  async getAllCourses(): Promise<TrainingCourse[]> {
    const response = await api.get<TrainingCourse[]>('/hr/training/courses');
    return response.data;
  },

  /**
   * Récupère un cours de formation par son ID
   * @param id ID du cours
   * @returns Données du cours
   */
  async getCourseById(id: string | number): Promise<TrainingCourse> {
    const response = await api.get<TrainingCourse>(`/hr/training/courses/${id}`);
    return response.data;
  },

  /**
   * Crée un nouveau cours de formation
   * @param course Données du cours à créer
   * @returns Cours créé
   */
  async createCourse(course: Omit<TrainingCourse, 'id'>): Promise<TrainingCourse> {
    const response = await api.post<TrainingCourse>('/hr/training/courses', course);
    return response.data;
  },

  /**
   * Met à jour un cours de formation existant
   * @param id ID du cours
   * @param course Données à mettre à jour
   * @returns Cours mis à jour
   */
  async updateCourse(id: string | number, course: Partial<TrainingCourse>): Promise<TrainingCourse> {
    const response = await api.put<TrainingCourse>(`/hr/training/courses/${id}`, course);
    return response.data;
  },

  /**
   * Supprime un cours de formation
   * @param id ID du cours à supprimer
   * @returns Statut de la suppression
   */
  async deleteCourse(id: string | number): Promise<{ success: boolean }> {
    const response = await api.delete<{ success: boolean }>(`/hr/training/courses/${id}`);
    return response.data;
  },

  /**
   * Récupère toutes les sessions de formation
   * @returns Liste des sessions de formation
   */
  async getAllSessions(): Promise<TrainingSession[]> {
    const response = await api.get<TrainingSession[]>('/hr/training/sessions');
    return response.data;
  },

  /**
   * Récupère une session de formation par son ID
   * @param id ID de la session
   * @returns Données de la session
   */
  async getSessionById(id: string | number): Promise<TrainingSession> {
    const response = await api.get<TrainingSession>(`/hr/training/sessions/${id}`);
    return response.data;
  },

  /**
   * Récupère les sessions pour un cours spécifique
   * @param courseId ID du cours
   * @returns Liste des sessions pour ce cours
   */
  async getSessionsByCourse(courseId: string | number): Promise<TrainingSession[]> {
    const response = await api.get<TrainingSession[]>(`/hr/training/courses/${courseId}/sessions`);
    return response.data;
  },

  /**
   * Crée une nouvelle session de formation
   * @param session Données de la session à créer
   * @returns Session créée
   */
  async createSession(session: Omit<TrainingSession, 'id'>): Promise<TrainingSession> {
    const response = await api.post<TrainingSession>('/hr/training/sessions', session);
    return response.data;
  },

  /**
   * Met à jour une session de formation existante
   * @param id ID de la session
   * @param session Données à mettre à jour
   * @returns Session mise à jour
   */
  async updateSession(id: string | number, session: Partial<TrainingSession>): Promise<TrainingSession> {
    const response = await api.put<TrainingSession>(`/hr/training/sessions/${id}`, session);
    return response.data;
  },

  /**
   * Supprime une session de formation
   * @param id ID de la session à supprimer
   * @returns Statut de la suppression
   */
  async deleteSession(id: string | number): Promise<{ success: boolean }> {
    const response = await api.delete<{ success: boolean }>(`/hr/training/sessions/${id}`);
    return response.data;
  },

  /**
   * Récupère toutes les inscriptions aux formations
   * @returns Liste des inscriptions
   */
  async getAllEnrollments(): Promise<TrainingEnrollment[]> {
    const response = await api.get<TrainingEnrollment[]>('/hr/training/enrollments');
    return response.data;
  },

  /**
   * Récupère une inscription par son ID
   * @param id ID de l'inscription
   * @returns Données de l'inscription
   */
  async getEnrollmentById(id: string | number): Promise<TrainingEnrollment> {
    const response = await api.get<TrainingEnrollment>(`/hr/training/enrollments/${id}`);
    return response.data;
  },

  /**
   * Récupère les inscriptions pour une session spécifique
   * @param sessionId ID de la session
   * @returns Liste des inscriptions pour cette session
   */
  async getEnrollmentsBySession(sessionId: string | number): Promise<TrainingEnrollment[]> {
    const response = await api.get<TrainingEnrollment[]>(`/hr/training/sessions/${sessionId}/enrollments`);
    return response.data;
  },

  /**
   * Récupère les inscriptions d'un employé
   * @param employeeId ID de l'employé
   * @returns Liste des inscriptions de l'employé
   */
  async getEnrollmentsByEmployee(employeeId: string | number): Promise<TrainingEnrollment[]> {
    const response = await api.get<TrainingEnrollment[]>(`/hr/employees/${employeeId}/training/enrollments`);
    return response.data;
  },

  /**
   * Crée une nouvelle inscription à une formation
   * @param enrollment Données de l'inscription à créer
   * @returns Inscription créée
   */
  async createEnrollment(enrollment: Omit<TrainingEnrollment, 'id'>): Promise<TrainingEnrollment> {
    const response = await api.post<TrainingEnrollment>('/hr/training/enrollments', enrollment);
    return response.data;
  },

  /**
   * Met à jour une inscription existante
   * @param id ID de l'inscription
   * @param enrollment Données à mettre à jour
   * @returns Inscription mise à jour
   */
  async updateEnrollment(id: string | number, enrollment: Partial<TrainingEnrollment>): Promise<TrainingEnrollment> {
    const response = await api.put<TrainingEnrollment>(`/hr/training/enrollments/${id}`, enrollment);
    return response.data;
  },

  /**
   * Supprime une inscription
   * @param id ID de l'inscription à supprimer
   * @returns Statut de la suppression
   */
  async deleteEnrollment(id: string | number): Promise<{ success: boolean }> {
    const response = await api.delete<{ success: boolean }>(`/hr/training/enrollments/${id}`);
    return response.data;
  },

  /**
   * Approuve une inscription
   * @param id ID de l'inscription
   * @param notes Notes optionnelles
   * @returns Inscription mise à jour
   */
  async approveEnrollment(id: string | number, notes?: string): Promise<TrainingEnrollment> {
    const response = await api.put<TrainingEnrollment>(`/hr/training/enrollments/${id}/approve`, { notes });
    return response.data;
  },

  /**
   * Rejette une inscription
   * @param id ID de l'inscription
   * @param reason Raison du rejet
   * @returns Inscription mise à jour
   */
  async rejectEnrollment(id: string | number, reason: string): Promise<TrainingEnrollment> {
    const response = await api.put<TrainingEnrollment>(`/hr/training/enrollments/${id}/reject`, { reason });
    return response.data;
  },

  /**
   * Récupère toutes les catégories de formation
   * @returns Liste des catégories
   */
  async getAllCategories(): Promise<TrainingCategory[]> {
    const response = await api.get<TrainingCategory[]>('/hr/training/categories');
    return response.data;
  },

  /**
   * Récupère les statistiques de formation
   * @returns Statistiques de formation
   */
  async getTrainingStats(): Promise<{
    totalCourses: number;
    activeSessions: number;
    totalEnrollments: number;
    completedTrainings: number;
    coursesByCategory: Record<string, number>;
  }> {
    const response = await api.get<{
      totalCourses: number;
      activeSessions: number;
      totalEnrollments: number;
      completedTrainings: number;
      coursesByCategory: Record<string, number>;
    }>('/hr/training/stats');
    return response.data;
  }
};

export default trainingService;
