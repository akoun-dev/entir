
import { useJobOffers } from './useJobOffers';
import { useJobApplications } from './useJobApplications';
import { useRecruitmentStats } from './useRecruitmentStats';

export const useRecruitment = () => {
  // Get applications first so we can pass to job offers hook
  const applicationHook = useJobApplications();
  const { applications, recruitmentStages, ...applicationMethods } = applicationHook;
  
  // Pass applications to job offers hook for dependency checking
  const { offers, ...offerMethods } = useJobOffers(applications);
  
  // Stats depend on both offers and applications
  const { getRecruitmentStats } = useRecruitmentStats(offers, applications, recruitmentStages);

  return {
    // Job offers
    offers,
    ...offerMethods,
    
    // Job applications
    applications,
    ...applicationMethods,
    
    // Recruitment stages
    recruitmentStages,
    
    // Statistics
    getRecruitmentStats
  };
};
