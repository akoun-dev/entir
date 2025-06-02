import { useState, useCallback, useEffect } from 'react';
import { JobOffer, JobApplication, RecruitmentStats } from '../types/recruitment';
import { recruitmentService } from '../services';

/**
 * Hook pour gérer le recrutement
 * 
 * Ce hook fournit des fonctionnalités pour gérer les offres d'emploi
 * et les candidatures dans le module RH.
 */
export const useRecruitment = () => {
  // États pour les offres d'emploi
  const [jobOffers, setJobOffers] = useState<JobOffer[]>([]);
  const [selectedJobOffer, setSelectedJobOffer] = useState<JobOffer | null>(null);
  const [loadingOffers, setLoadingOffers] = useState(false);
  const [offersError, setOffersError] = useState<string | null>(null);
  
  // États pour les candidatures
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [selectedApplication, setSelectedApplication] = useState<JobApplication | null>(null);
  const [loadingApplications, setLoadingApplications] = useState(false);
  const [applicationsError, setApplicationsError] = useState<string | null>(null);
  
  // État pour les statistiques
  const [stats, setStats] = useState<RecruitmentStats | null>(null);
  const [loadingStats, setLoadingStats] = useState(false);
  
  // Charger les offres d'emploi
  const loadJobOffers = useCallback(async () => {
    try {
      setLoadingOffers(true);
      setOffersError(null);
      
      const offers = await recruitmentService.getAllJobOffers();
      setJobOffers(offers);
      
      return offers;
    } catch (error) {
      console.error('Erreur lors du chargement des offres d\'emploi:', error);
      setOffersError('Impossible de charger les offres d\'emploi.');
      return [];
    } finally {
      setLoadingOffers(false);
    }
  }, []);
  
  // Charger une offre d'emploi par son ID
  const loadJobOfferById = useCallback(async (id: string | number) => {
    try {
      setLoadingOffers(true);
      setOffersError(null);
      
      const offer = await recruitmentService.getJobOfferById(id);
      setSelectedJobOffer(offer);
      
      return offer;
    } catch (error) {
      console.error(`Erreur lors du chargement de l'offre d'emploi ${id}:`, error);
      setOffersError(`Impossible de charger l'offre d'emploi ${id}.`);
      return null;
    } finally {
      setLoadingOffers(false);
    }
  }, []);
  
  // Créer une nouvelle offre d'emploi
  const createJobOffer = useCallback(async (jobOffer: Omit<JobOffer, 'id' | 'created_at' | 'created_by'>) => {
    try {
      setLoadingOffers(true);
      setOffersError(null);
      
      const newOffer = await recruitmentService.createJobOffer(jobOffer);
      
      // Mettre à jour la liste des offres
      setJobOffers(prevOffers => [...prevOffers, newOffer]);
      
      return newOffer;
    } catch (error) {
      console.error('Erreur lors de la création de l\'offre d\'emploi:', error);
      setOffersError('Impossible de créer l\'offre d\'emploi.');
      return null;
    } finally {
      setLoadingOffers(false);
    }
  }, []);
  
  // Mettre à jour une offre d'emploi
  const updateJobOffer = useCallback(async (id: string | number, jobOffer: Partial<JobOffer>) => {
    try {
      setLoadingOffers(true);
      setOffersError(null);
      
      const updatedOffer = await recruitmentService.updateJobOffer(id, jobOffer);
      
      // Mettre à jour la liste des offres
      setJobOffers(prevOffers => 
        prevOffers.map(offer => 
          offer.id === id ? updatedOffer : offer
        )
      );
      
      // Mettre à jour l'offre sélectionnée si nécessaire
      if (selectedJobOffer && selectedJobOffer.id === id) {
        setSelectedJobOffer(updatedOffer);
      }
      
      return updatedOffer;
    } catch (error) {
      console.error(`Erreur lors de la mise à jour de l'offre d'emploi ${id}:`, error);
      setOffersError(`Impossible de mettre à jour l'offre d'emploi ${id}.`);
      return null;
    } finally {
      setLoadingOffers(false);
    }
  }, [selectedJobOffer]);
  
  // Supprimer une offre d'emploi
  const deleteJobOffer = useCallback(async (id: string | number) => {
    try {
      setLoadingOffers(true);
      setOffersError(null);
      
      const result = await recruitmentService.deleteJobOffer(id);
      
      if (result.success) {
        // Mettre à jour la liste des offres
        setJobOffers(prevOffers => 
          prevOffers.filter(offer => offer.id !== id)
        );
        
        // Réinitialiser l'offre sélectionnée si nécessaire
        if (selectedJobOffer && selectedJobOffer.id === id) {
          setSelectedJobOffer(null);
        }
      }
      
      return result.success;
    } catch (error) {
      console.error(`Erreur lors de la suppression de l'offre d'emploi ${id}:`, error);
      setOffersError(`Impossible de supprimer l'offre d'emploi ${id}.`);
      return false;
    } finally {
      setLoadingOffers(false);
    }
  }, [selectedJobOffer]);
  
  // Mettre à jour le statut d'une offre d'emploi
  const updateJobOfferStatus = useCallback(async (
    id: string | number, 
    status: 'draft' | 'published' | 'closed'
  ) => {
    try {
      setLoadingOffers(true);
      setOffersError(null);
      
      const updatedOffer = await recruitmentService.updateJobOfferStatus(id, status);
      
      // Mettre à jour la liste des offres
      setJobOffers(prevOffers => 
        prevOffers.map(offer => 
          offer.id === id ? updatedOffer : offer
        )
      );
      
      // Mettre à jour l'offre sélectionnée si nécessaire
      if (selectedJobOffer && selectedJobOffer.id === id) {
        setSelectedJobOffer(updatedOffer);
      }
      
      return updatedOffer;
    } catch (error) {
      console.error(`Erreur lors de la mise à jour du statut de l'offre d'emploi ${id}:`, error);
      setOffersError(`Impossible de mettre à jour le statut de l'offre d'emploi ${id}.`);
      return null;
    } finally {
      setLoadingOffers(false);
    }
  }, [selectedJobOffer]);
  
  // Charger les candidatures
  const loadApplications = useCallback(async () => {
    try {
      setLoadingApplications(true);
      setApplicationsError(null);
      
      const apps = await recruitmentService.getAllApplications();
      setApplications(apps);
      
      return apps;
    } catch (error) {
      console.error('Erreur lors du chargement des candidatures:', error);
      setApplicationsError('Impossible de charger les candidatures.');
      return [];
    } finally {
      setLoadingApplications(false);
    }
  }, []);
  
  // Charger les candidatures pour une offre d'emploi
  const loadApplicationsByJobOffer = useCallback(async (jobOfferId: string | number) => {
    try {
      setLoadingApplications(true);
      setApplicationsError(null);
      
      const apps = await recruitmentService.getApplicationsByJobOffer(jobOfferId);
      setApplications(apps);
      
      return apps;
    } catch (error) {
      console.error(`Erreur lors du chargement des candidatures pour l'offre ${jobOfferId}:`, error);
      setApplicationsError(`Impossible de charger les candidatures pour l'offre ${jobOfferId}.`);
      return [];
    } finally {
      setLoadingApplications(false);
    }
  }, []);
  
  // Charger les statistiques de recrutement
  const loadRecruitmentStats = useCallback(async () => {
    try {
      setLoadingStats(true);
      
      const recruitmentStats = await recruitmentService.getRecruitmentStats();
      setStats(recruitmentStats);
      
      return recruitmentStats;
    } catch (error) {
      console.error('Erreur lors du chargement des statistiques de recrutement:', error);
      return null;
    } finally {
      setLoadingStats(false);
    }
  }, []);
  
  // Charger les données initiales
  useEffect(() => {
    loadJobOffers();
    loadApplications();
    loadRecruitmentStats();
  }, [loadJobOffers, loadApplications, loadRecruitmentStats]);
  
  return {
    // Offres d'emploi
    jobOffers,
    selectedJobOffer,
    loadingOffers,
    offersError,
    loadJobOffers,
    loadJobOfferById,
    createJobOffer,
    updateJobOffer,
    deleteJobOffer,
    updateJobOfferStatus,
    setSelectedJobOffer,
    
    // Candidatures
    applications,
    selectedApplication,
    loadingApplications,
    applicationsError,
    loadApplications,
    loadApplicationsByJobOffer,
    setSelectedApplication,
    
    // Statistiques
    stats,
    loadingStats,
    loadRecruitmentStats
  };
};

export default useRecruitment;
