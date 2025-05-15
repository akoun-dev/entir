
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { HrLayout } from '../components';
import { Button } from '../../../../src/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useRecruitment } from '../../hooks';
import { 
  JobOfferHeader, 
  JobOfferDetails,
  JobOfferSidebar,
  JobApplicationSection
} from '../../components/recruitment/job-offer';

const JobOfferDetailView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getJobOfferById, getApplicationsByJobOffer, recruitmentStages, moveApplicationStage } = useRecruitment();
  
  // Get job offer details
  const jobOffer = getJobOfferById(id || '');
  
  // Get applications for this job offer
  const applications = getApplicationsByJobOffer(id || '');

  // If job offer doesn't exist, show error
  if (!jobOffer) {
    return (
      <HrLayout>
        <div className="p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Offre non trouvée</h2>
          <p className="mb-6">L'offre d'emploi que vous recherchez n'existe pas ou a été supprimée.</p>
          <Button onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour
          </Button>
        </div>
      </HrLayout>
    );
  }

  return (
    <HrLayout>
      <div className="space-y-6">
        {/* Header */}
        <JobOfferHeader jobOffer={jobOffer} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Job Details */}
          <div className="lg:col-span-2">
            <JobOfferDetails jobOffer={jobOffer} />
          </div>

          {/* Sidebar Info */}
          <JobOfferSidebar 
            jobOffer={jobOffer} 
            applications={applications}
            recruitmentStages={recruitmentStages}
          />
        </div>
        
        {/* Applications Section */}
        <JobApplicationSection 
          applications={applications}
          recruitmentStages={recruitmentStages}
          onMoveStage={moveApplicationStage}
        />
      </div>
    </HrLayout>
  );
};

export default JobOfferDetailView;
