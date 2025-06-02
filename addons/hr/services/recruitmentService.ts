import { api } from '../../../src/services/api';
import { JobOffer, JobApplication } from '../types';

/**
 * Service pour la gestion du recrutement
 * Fournit les méthodes pour interagir avec l'API backend
 */
export const recruitmentService = {
  /**
   * Récupère toutes les offres d'emploi
   * @returns Liste des offres d'emploi
   */
  async getAllJobOffers(): Promise<JobOffer[]> {
    const response = await api.get<JobOffer[]>('/hr/recruitment/offers');
    return response.data;
  },

  /**
   * Récupère une offre d'emploi par son ID
   * @param id ID de l'offre d'emploi
   * @returns Données de l'offre d'emploi
   */
  async getJobOfferById(id: string | number): Promise<JobOffer> {
    const response = await api.get<JobOffer>(`/hr/recruitment/offers/${id}`);
    return response.data;
  },

  /**
   * Crée une nouvelle offre d'emploi
   * @param jobOffer Données de l'offre d'emploi à créer
   * @returns Offre d'emploi créée
   */
  async createJobOffer(jobOffer: Omit<JobOffer, 'id' | 'created_at' | 'created_by'>): Promise<JobOffer> {
    const response = await api.post<JobOffer>('/hr/recruitment/offers', jobOffer);
    return response.data;
  },

  /**
   * Met à jour une offre d'emploi existante
   * @param id ID de l'offre d'emploi
   * @param jobOffer Données à mettre à jour
   * @returns Offre d'emploi mise à jour
   */
  async updateJobOffer(id: string | number, jobOffer: Partial<JobOffer>): Promise<JobOffer> {
    const response = await api.put<JobOffer>(`/hr/recruitment/offers/${id}`, jobOffer);
    return response.data;
  },

  /**
   * Supprime une offre d'emploi
   * @param id ID de l'offre d'emploi à supprimer
   * @returns Statut de la suppression
   */
  async deleteJobOffer(id: string | number): Promise<{ success: boolean }> {
    const response = await api.delete<{ success: boolean }>(`/hr/recruitment/offers/${id}`);
    return response.data;
  },

  /**
   * Met à jour le statut d'une offre d'emploi
   * @param id ID de l'offre d'emploi
   * @param status Nouveau statut
   * @returns Offre d'emploi mise à jour
   */
  async updateJobOfferStatus(
    id: string | number,
    status: 'draft' | 'published' | 'closed'
  ): Promise<JobOffer> {
    const response = await api.put<JobOffer>(`/hr/recruitment/offers/${id}/status`, { status });
    return response.data;
  },

  /**
   * Récupère toutes les candidatures
   * @returns Liste des candidatures
   */
  async getAllApplications(): Promise<JobApplication[]> {
    const response = await api.get<JobApplication[]>('/hr/recruitment/applications');
    return response.data;
  },

  /**
   * Récupère une candidature par son ID
   * @param id ID de la candidature
   * @returns Données de la candidature
   */
  async getApplicationById(id: string | number): Promise<JobApplication> {
    const response = await api.get<JobApplication>(`/hr/recruitment/applications/${id}`);
    return response.data;
  },

  /**
   * Récupère les candidatures pour une offre d'emploi
   * @param jobOfferId ID de l'offre d'emploi
   * @returns Liste des candidatures pour cette offre
   */
  async getApplicationsByJobOffer(jobOfferId: string | number): Promise<JobApplication[]> {
    const response = await api.get<JobApplication[]>(`/hr/recruitment/offers/${jobOfferId}/applications`);
    return response.data;
  },

  /**
   * Crée une nouvelle candidature
   * @param application Données de la candidature à créer
   * @returns Candidature créée
   */
  async createApplication(application: Omit<JobApplication, 'id' | 'application_date' | 'last_updated'>): Promise<JobApplication> {
    const response = await api.post<JobApplication>('/hr/recruitment/applications', application);
    return response.data;
  },

  /**
   * Met à jour une candidature existante
   * @param id ID de la candidature
   * @param application Données à mettre à jour
   * @returns Candidature mise à jour
   */
  async updateApplication(id: string | number, application: Partial<JobApplication>): Promise<JobApplication> {
    const response = await api.put<JobApplication>(`/hr/recruitment/applications/${id}`, application);
    return response.data;
  },

  /**
   * Supprime une candidature
   * @param id ID de la candidature à supprimer
   * @returns Statut de la suppression
   */
  async deleteApplication(id: string | number): Promise<{ success: boolean }> {
    const response = await api.delete<{ success: boolean }>(`/hr/recruitment/applications/${id}`);
    return response.data;
  },

  /**
   * Met à jour le statut d'une candidature
   * @param id ID de la candidature
   * @param status Nouveau statut
   * @param stage Étape du processus de recrutement
   * @param notes Notes optionnelles
   * @returns Candidature mise à jour
   */
  async updateApplicationStatus(
    id: string | number,
    status: 'new' | 'reviewed' | 'interview' | 'offer' | 'hired' | 'rejected',
    stage?: number,
    notes?: string
  ): Promise<JobApplication> {
    const response = await api.put<JobApplication>(`/hr/recruitment/applications/${id}/status`, {
      status,
      stage,
      notes
    });
    return response.data;
  },

  /**
   * Récupère les statistiques de recrutement
   * @returns Statistiques de recrutement
   */
  async getRecruitmentStats(): Promise<{
    totalOffers: number;
    activeOffers: number;
    totalApplications: number;
    applicationsByStatus: Record<string, number>;
    offersByDepartment: Record<string, number>;
  }> {
    const response = await api.get<{
      totalOffers: number;
      activeOffers: number;
      totalApplications: number;
      applicationsByStatus: Record<string, number>;
      offersByDepartment: Record<string, number>;
    }>('/hr/recruitment/stats');
    return response.data;
  }
};

export default recruitmentService;
