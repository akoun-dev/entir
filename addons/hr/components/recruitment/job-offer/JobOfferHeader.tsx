
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Briefcase, Edit, MapPin } from 'lucide-react';
import { Button } from '../../../../../src/components/ui/button';
import { Badge } from '../../../../../src/components/ui/badge';
import { JobOffer } from '../../../types/recruitment';

interface JobOfferHeaderProps {
  jobOffer: JobOffer;
}

const JobOfferHeader: React.FC<JobOfferHeaderProps> = ({ jobOffer }) => {
  const navigate = useNavigate();

  // Status badge color
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'draft': return 'bg-gray-500';
      case 'published': return 'bg-green-500';
      case 'closed': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  // Format employment type
  const formatEmploymentType = (type: string) => {
    switch(type) {
      case 'full_time': return 'Temps plein';
      case 'part_time': return 'Temps partiel';
      case 'contract': return 'Contrat';
      case 'internship': return 'Stage';
      default: return type;
    }
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <Button variant="outline" size="icon" onClick={() => navigate('/hr/recruitment')}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex items-center gap-3">
          <div className="h-6 w-1.5 bg-amber-500 rounded-full"></div>
          <Briefcase className="h-6 w-6 text-amber-500" />
          <h1 className="text-2xl font-bold">{jobOffer.title}</h1>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge className={getStatusColor(jobOffer.status)}>
            {jobOffer.status === 'published' ? 'Publiée' : 
             jobOffer.status === 'draft' ? 'Brouillon' : 'Fermée'}
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1">
            <MapPin className="h-3 w-3" /> 
            {jobOffer.location}
          </Badge>
          <Badge variant="outline">
            {formatEmploymentType(jobOffer.employment_type)}
          </Badge>
        </div>
        
        <div className="flex gap-2">
          <Button asChild variant="outline">
            <Link to={`/hr/recruitment/offers/edit/${jobOffer.id}`}>
              <Edit className="h-4 w-4 mr-2" />
              Modifier
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default JobOfferHeader;
