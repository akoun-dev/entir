
import { useState, useCallback, useEffect } from 'react';
import { JobApplication, RecruitmentStage } from '../types/recruitment';
import { jobApplications as mockJobApplications, recruitmentStages as mockRecruitmentStages } from '../data/recruitments';
import { v4 as uuidv4 } from 'uuid';
import { useToast } from '../../../src/hooks/use-toast';
import { DataInitializationService } from '../services/dataInitialization';

export const useJobApplications = () => {
  const dataService = DataInitializationService.getInstance();
  
  // Get initial applications from imported data or mock data
  const getInitialApplications = (): JobApplication[] => {
    const importedRecruitment = dataService.getImportedData('recruitment');
    if (importedRecruitment && 
        typeof importedRecruitment === 'object' && 
        'jobApplications' in importedRecruitment && 
        Array.isArray(importedRecruitment.jobApplications)) {
      return importedRecruitment.jobApplications as JobApplication[];
    }
    return mockJobApplications;
  };
  
  // Get initial recruitment stages from imported data or mock data
  const getInitialStages = (): RecruitmentStage[] => {
    const importedRecruitment = dataService.getImportedData('recruitment');
    if (importedRecruitment && 
        typeof importedRecruitment === 'object' && 
        'recruitmentStages' in importedRecruitment && 
        Array.isArray(importedRecruitment.recruitmentStages)) {
      return importedRecruitment.recruitmentStages as RecruitmentStage[];
    }
    return mockRecruitmentStages;
  };

  const [applications, setApplications] = useState<JobApplication[]>(getInitialApplications());
  const [stages] = useState<RecruitmentStage[]>(getInitialStages());
  const { toast } = useToast();
  
  // Re-initialize data if imported data changes
  useEffect(() => {
    setApplications(getInitialApplications());
  }, [dataService.hasImportedData()]);

  // Job Application operations
  const getApplications = useCallback(() => {
    return applications;
  }, [applications]);

  const getApplicationsByJobOffer = useCallback((jobOfferId: string) => {
    return applications.filter(app => app.job_offer_id === jobOfferId);
  }, [applications]);

  const getApplicationById = useCallback((id: string) => {
    return applications.find(app => app.id === id);
  }, [applications]);

  const createApplication = useCallback((application: Omit<JobApplication, 'id' | 'status' | 'stage' | 'application_date' | 'last_updated'>) => {
    const newApplication: JobApplication = {
      ...application,
      id: uuidv4(),
      status: 'new',
      stage: 1,
      application_date: new Date().toISOString(),
      last_updated: new Date().toISOString(),
    };

    setApplications(prev => [...prev, newApplication]);
    toast({
      title: "Candidature reçue",
      description: "La candidature a été enregistrée avec succès.",
    });

    return newApplication;
  }, [toast]);

  const updateApplication = useCallback((id: string, updates: Partial<JobApplication>) => {
    let updated = false;

    setApplications(prev => {
      const newApplications = prev.map(app => {
        if (app.id === id) {
          updated = true;
          return { 
            ...app, 
            ...updates, 
            last_updated: new Date().toISOString() 
          };
        }
        return app;
      });

      return newApplications;
    });

    if (updated) {
      toast({
        title: "Candidature mise à jour",
        description: "Les informations de candidature ont été mises à jour.",
      });
      return true;
    }

    toast({
      title: "Erreur",
      description: "La candidature n'a pas été trouvée.",
      variant: "destructive",
    });
    return false;
  }, [toast]);

  const moveApplicationStage = useCallback((id: string, newStage: number, newStatus: JobApplication['status']) => {
    return updateApplication(id, { stage: newStage, status: newStatus });
  }, [updateApplication]);

  const deleteApplication = useCallback((id: string) => {
    setApplications(prev => prev.filter(app => app.id !== id));
    toast({
      title: "Candidature supprimée",
      description: "La candidature a été supprimée avec succès.",
    });
    return true;
  }, [toast]);

  // Get recruitment stages
  const getRecruitmentStages = useCallback(() => {
    return stages;
  }, [stages]);

  return {
    applications,
    getApplications,
    getApplicationsByJobOffer,
    getApplicationById,
    createApplication,
    updateApplication,
    moveApplicationStage,
    deleteApplication,
    recruitmentStages: getRecruitmentStages(),
    // New property to indicate if we're using imported data
    isUsingImportedData: dataService.hasImportedData()
  };
};
