
import React from 'react';
import { JobApplication, RecruitmentStage } from '../../../types/recruitment';
import { ApplicationList } from '../../recruitment';

interface JobApplicationSectionProps {
  applications: JobApplication[];
  recruitmentStages: RecruitmentStage[];
  onMoveStage: (id: string, newStage: number, newStatus: JobApplication['status']) => boolean;
}

const JobApplicationSection: React.FC<JobApplicationSectionProps> = ({ 
  applications, 
  recruitmentStages, 
  onMoveStage 
}) => {
  if (applications.length === 0) return null;
  
  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">Candidatures pour cette offre</h2>
      <ApplicationList 
        applications={applications}
        stages={recruitmentStages}
        onMoveStage={onMoveStage}
      />
    </div>
  );
};

export default JobApplicationSection;
