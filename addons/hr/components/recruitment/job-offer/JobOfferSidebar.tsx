
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '../../../../../src/components/ui/card';
import { Badge } from '../../../../../src/components/ui/badge';
import { Button } from '../../../../../src/components/ui/button';
import { Users } from 'lucide-react';
import { JobOffer, JobApplication, RecruitmentStage } from '../../../types/recruitment';

interface JobOfferSidebarProps {
  jobOffer: JobOffer;
  applications: JobApplication[];
  recruitmentStages: RecruitmentStage[];
}

const JobOfferSidebar: React.FC<JobOfferSidebarProps> = ({ 
  jobOffer, 
  applications,
  recruitmentStages
}) => {
  const navigate = useNavigate();
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Informations</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Département</p>
            <p>{jobOffer.department_name}</p>
          </div>
          
          {jobOffer.salary_range && (
            <div>
              <p className="text-sm font-medium text-muted-foreground">Rémunération</p>
              <p>{jobOffer.salary_range}</p>
            </div>
          )}
          
          <div>
            <p className="text-sm font-medium text-muted-foreground">Période de candidature</p>
            <p>{new Date(jobOffer.start_date).toLocaleDateString()} - {new Date(jobOffer.end_date).toLocaleDateString()}</p>
          </div>
          
          <div>
            <p className="text-sm font-medium text-muted-foreground">Date de création</p>
            <p>{new Date(jobOffer.created_at).toLocaleDateString()}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="h-4 w-4 mr-2" />
            Candidatures ({applications.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {applications.length === 0 ? (
            <p className="text-muted-foreground text-sm">
              Aucune candidature pour cette offre.
            </p>
          ) : (
            <div className="space-y-2">
              {applications.slice(0, 3).map(app => (
                <div key={app.id} className="flex items-center justify-between p-2 border rounded-md">
                  <div>
                    <p className="font-medium">{app.candidate_name}</p>
                    <p className="text-sm text-muted-foreground">
                      {recruitmentStages.find(s => s.id === app.stage)?.name || 'Étape inconnue'}
                    </p>
                  </div>
                  <Badge variant="outline">
                    {new Date(app.application_date).toLocaleDateString()}
                  </Badge>
                </div>
              ))}
              
              {applications.length > 3 && (
                <p className="text-sm text-center mt-2">
                  + {applications.length - 3} autres candidatures
                </p>
              )}
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full" onClick={() => navigate(`/hr/recruitment`, { state: { tab: 'applications' } })}>
            Voir toutes les candidatures
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default JobOfferSidebar;
