
import { useCallback } from 'react';
import { JobOffer, JobApplication, RecruitmentStats, RecruitmentStage } from '../types/recruitment';

export const useRecruitmentStats = (
  offers: JobOffer[],
  applications: JobApplication[],
  stages: RecruitmentStage[]
) => {
  const getRecruitmentStats = useCallback((): RecruitmentStats => {
    const activeOffers = offers.filter(offer => offer.status === 'published').length;
    const thisMonth = new Date().getMonth();
    const thisYear = new Date().getFullYear();
    
    const applicationsThisMonth = applications.filter(app => {
      const appDate = new Date(app.application_date);
      return appDate.getMonth() === thisMonth && appDate.getFullYear() === thisYear;
    }).length;

    // Count applications by stage
    const byStage = stages.map(stage => ({
      stage_id: stage.id,
      count: applications.filter(app => app.stage === stage.id).length
    }));

    // Calculate hiring rate (hired / total applications)
    const hiredCount = applications.filter(app => app.status === 'hired').length;
    const hiringRate = applications.length > 0 ? (hiredCount / applications.length) * 100 : 0;

    return {
      total_offers: offers.length,
      active_offers: activeOffers,
      total_applications: applications.length,
      applications_this_month: applicationsThisMonth,
      by_stage: byStage,
      hiring_rate: hiringRate
    };
  }, [applications, offers, stages]);

  return { getRecruitmentStats };
};
