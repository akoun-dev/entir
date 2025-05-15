
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '../../../../src/components/ui/card';
import { Badge } from '../../../../src/components/ui/badge';
import { Button } from '../../../../src/components/ui/button';
import { Calendar, MapPin, Users } from 'lucide-react';
import { JobOffer } from '../../types/recruitment';

interface JobOfferCardProps {
  jobOffer: JobOffer;
  applicationCount: number;
}

const JobOfferCard: React.FC<JobOfferCardProps> = ({ jobOffer, applicationCount }) => {
  // Format date to readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR').format(date);
  };

  // Get status badge color
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
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex justify-between items-start mb-2">
          <Badge className={getStatusColor(jobOffer.status)}>
            {jobOffer.status === 'published' ? 'Publiée' : 
             jobOffer.status === 'draft' ? 'Brouillon' : 'Fermée'}
          </Badge>
          <Badge variant="outline">{formatEmploymentType(jobOffer.employment_type)}</Badge>
        </div>
        <CardTitle className="text-lg">{jobOffer.title}</CardTitle>
        <CardDescription>{jobOffer.department_name}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="space-y-4">
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 mr-1" /> 
            {jobOffer.location}
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 mr-1" /> 
            {formatDate(jobOffer.start_date)} - {formatDate(jobOffer.end_date)}
          </div>
          <div className="flex items-center text-sm">
            <Users className="h-4 w-4 mr-1" /> 
            {applicationCount} candidature{applicationCount !== 1 ? 's' : ''}
          </div>
          
          {jobOffer.salary_range && (
            <div className="text-sm">
              <span className="font-medium">Rémunération:</span> {jobOffer.salary_range}
            </div>
          )}
          
          <div className="line-clamp-2 text-sm mt-2">
            {jobOffer.job_description.substring(0, 100)}
            {jobOffer.job_description.length > 100 ? '...' : ''}
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4">
        <Button asChild className="w-full">
          <Link to={`/hr/recruitment/offers/${jobOffer.id}`}>
            Voir l'offre
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default JobOfferCard;
