
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../../src/components/ui/table';
import { Button } from '../../../../src/components/ui/button';
import { Badge } from '../../../../src/components/ui/badge';
import { Link } from 'react-router-dom';
import { JobApplication, RecruitmentStage } from '../../types/recruitment';

interface ApplicationListProps {
  applications: JobApplication[];
  stages: RecruitmentStage[];
  onMoveStage?: (applicationId: string, newStage: number, newStatus: JobApplication['status']) => void;
}

const ApplicationList: React.FC<ApplicationListProps> = ({
  applications,
  stages,
  onMoveStage
}) => {
  // Get stage name from id
  const getStageName = (stageId: number) => {
    const stage = stages.find(s => s.id === stageId);
    return stage ? stage.name : 'Inconnu';
  };

  // Get stage color from id
  const getStageColor = (stageId: number) => {
    const stage = stages.find(s => s.id === stageId);
    return stage ? stage.color : 'bg-gray-500';
  };

  // Get status badge
  const getStatusBadge = (status: JobApplication['status']) => {
    switch (status) {
      case 'new':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">Nouveau</Badge>;
      case 'reviewed':
        return <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-300">Examiné</Badge>;
      case 'interview':
        return <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-300">Entretien</Badge>;
      case 'offer':
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">Offre</Badge>;
      case 'hired':
        return <Badge className="bg-green-500">Embauché</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Refusé</Badge>;
      default:
        return <Badge variant="outline">Indéfini</Badge>;
    }
  };

  // Format date to a more readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  // Move application to previous stage
  const handlePrevStage = (application: JobApplication) => {
    if (!onMoveStage) return;
    
    const currentStageIndex = stages.findIndex(s => s.id === application.stage);
    if (currentStageIndex <= 0) return;
    
    const prevStage = stages[currentStageIndex - 1];
    let newStatus: JobApplication['status'] = application.status;
    
    // Update status based on new stage
    if (prevStage.id === 1) newStatus = 'new';
    else if (prevStage.id === 2) newStatus = 'reviewed';
    else if (prevStage.id === 3) newStatus = 'interview';
    else if (prevStage.id === 6) newStatus = 'offer';
    else if (prevStage.id === 7) newStatus = 'hired';
    else if (prevStage.id === 8) newStatus = 'rejected';
    
    onMoveStage(application.id, prevStage.id, newStatus);
  };

  // Move application to next stage
  const handleNextStage = (application: JobApplication) => {
    if (!onMoveStage) return;
    
    const currentStageIndex = stages.findIndex(s => s.id === application.stage);
    if (currentStageIndex >= stages.length - 1) return;
    
    const nextStage = stages[currentStageIndex + 1];
    let newStatus: JobApplication['status'] = application.status;
    
    // Update status based on new stage
    if (nextStage.id === 2) newStatus = 'reviewed';
    else if (nextStage.id === 3) newStatus = 'interview';
    else if (nextStage.id === 6) newStatus = 'offer';
    else if (nextStage.id === 7) newStatus = 'hired';
    else if (nextStage.id === 8) newStatus = 'rejected';
    
    onMoveStage(application.id, nextStage.id, newStatus);
  };

  if (applications.length === 0) {
    return (
      <div className="text-center p-8 bg-muted/20 rounded-lg">
        <p className="text-muted-foreground">Aucune candidature trouvée.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Candidat</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Étape</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applications.map(application => (
            <TableRow key={application.id}>
              <TableCell>
                <div>
                  <div className="font-medium">{application.candidate_name}</div>
                  <div className="text-sm text-muted-foreground">{application.email}</div>
                </div>
              </TableCell>
              <TableCell>
                {formatDate(application.application_date)}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <div className={`h-2 w-2 rounded-full ${getStageColor(application.stage)}`} />
                  {getStageName(application.stage)}
                </div>
              </TableCell>
              <TableCell>
                {getStatusBadge(application.status)}
              </TableCell>
              <TableCell className="text-right space-x-2">
                {onMoveStage && (
                  <>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handlePrevStage(application)}
                      disabled={application.stage <= 1}
                    >
                      ←
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleNextStage(application)}
                      disabled={application.stage >= stages.length}
                    >
                      →
                    </Button>
                  </>
                )}
                <Button variant="outline" size="sm" asChild>
                  <Link to={`/hr/recruitment/applications/${application.id}`}>
                    Détails
                  </Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicationList;
