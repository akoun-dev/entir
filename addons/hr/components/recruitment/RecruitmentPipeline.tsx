
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../../src/components/ui/card';
import { Badge } from '../../../../src/components/ui/badge';
import { JobApplication, RecruitmentStage } from '../../types/recruitment';

interface RecruitmentPipelineProps {
  applications: JobApplication[];
  stages: RecruitmentStage[];
}

const RecruitmentPipeline: React.FC<RecruitmentPipelineProps> = ({ 
  applications, 
  stages 
}) => {
  // Group applications by stage
  const applicationsByStage = stages.map(stage => {
    return {
      stage,
      applications: applications.filter(app => app.stage === stage.id),
    };
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {applicationsByStage.map(({ stage, applications }) => (
        <Card key={stage.id} className="flex flex-col h-full">
          <CardHeader className={`border-t-4 ${stage.color} pb-2`}>
            <CardTitle className="text-sm font-medium flex items-center justify-between">
              {stage.name}
              <Badge variant="secondary" className="ml-2">
                {applications.length}
              </Badge>
            </CardTitle>
            <CardDescription className="text-xs">
              {stage.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow pt-0">
            <div className="space-y-2 mt-2">
              {applications.length === 0 ? (
                <div className="text-sm text-muted-foreground text-center py-4 bg-muted/20 rounded">
                  Aucune candidature
                </div>
              ) : (
                applications.map(app => (
                  <div 
                    key={app.id} 
                    className="p-2 bg-card border rounded-sm shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="font-medium text-sm">{app.candidate_name}</div>
                    <div className="text-xs text-muted-foreground">{app.email}</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {new Date(app.application_date).toLocaleDateString('fr-FR')}
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default RecruitmentPipeline;
