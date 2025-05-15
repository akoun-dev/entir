
import { useState, useCallback, useEffect } from 'react';
import { JobOffer } from '../types/recruitment';
import { jobOffers as mockJobOffers } from '../data/recruitments';
import { v4 as uuidv4 } from 'uuid';
import { useToast } from '../../../src/hooks/use-toast';
import { DataInitializationService } from '../services/dataInitialization';

export const useJobOffers = (initialApplications: any[] = []) => {
  const dataService = DataInitializationService.getInstance();
  
  // Determine initial data source - use imported data if available, otherwise use mock data
  const getInitialOffers = (): JobOffer[] => {
    const importedRecruitment = dataService.getImportedData('recruitment');
    if (importedRecruitment && 
        typeof importedRecruitment === 'object' && 
        'jobOffers' in importedRecruitment && 
        Array.isArray(importedRecruitment.jobOffers)) {
      return importedRecruitment.jobOffers as JobOffer[];
    }
    return mockJobOffers;
  };
  
  const [offers, setOffers] = useState<JobOffer[]>(getInitialOffers());
  const { toast } = useToast();
  
  // Re-initialize data if imported data changes
  useEffect(() => {
    setOffers(getInitialOffers());
  }, [dataService.hasImportedData()]);
  
  // Job Offer operations
  const getJobOffers = useCallback(() => {
    return offers;
  }, [offers]);

  const getJobOfferById = useCallback((id: string) => {
    return offers.find(offer => offer.id === id);
  }, [offers]);

  const createJobOffer = useCallback((jobOffer: Omit<JobOffer, 'id' | 'created_at' | 'created_by'>) => {
    const newJobOffer: JobOffer = {
      ...jobOffer,
      id: uuidv4(),
      created_at: new Date().toISOString(),
      created_by: 'current_user', // In a real app, this would come from auth context
    };

    setOffers(prev => [...prev, newJobOffer]);
    toast({
      title: "Offre créée",
      description: `L'offre ${newJobOffer.title} a été créée avec succès.`,
    });

    return newJobOffer;
  }, [toast]);

  const updateJobOffer = useCallback((id: string, updates: Partial<JobOffer>) => {
    let updated = false;

    setOffers(prev => {
      const newOffers = prev.map(offer => {
        if (offer.id === id) {
          updated = true;
          return { ...offer, ...updates };
        }
        return offer;
      });

      return newOffers;
    });

    if (updated) {
      toast({
        title: "Offre mise à jour",
        description: "L'offre d'emploi a été mise à jour avec succès.",
      });
      return true;
    }

    toast({
      title: "Erreur",
      description: "L'offre d'emploi n'a pas été trouvée.",
      variant: "destructive",
    });
    return false;
  }, [toast]);

  const deleteJobOffer = useCallback((id: string) => {
    // Check if there are applications for this offer
    const hasApplications = initialApplications.some(app => app.job_offer_id === id);
    
    if (hasApplications) {
      toast({
        title: "Suppression impossible",
        description: "Il existe des candidatures pour cette offre.",
        variant: "destructive",
      });
      return false;
    }

    setOffers(prev => prev.filter(offer => offer.id !== id));
    toast({
      title: "Offre supprimée",
      description: "L'offre d'emploi a été supprimée avec succès.",
    });
    return true;
  }, [initialApplications, toast]);

  return {
    offers,
    getJobOffers,
    getJobOfferById,
    createJobOffer,
    updateJobOffer,
    deleteJobOffer,
    // New property to indicate if we're using imported data
    isUsingImportedData: dataService.hasImportedData()
  };
};
