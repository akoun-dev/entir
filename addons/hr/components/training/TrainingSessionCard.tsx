
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '../../../../src/components/ui/card';
import { Badge } from '../../../../src/components/ui/badge';
import { Calendar, MapPin, Users, FileText } from 'lucide-react';

interface TrainingSessionCardProps {
  session: {
    id: string;
    name?: string;
    start_date?: string;
    end_date?: string;
    location?: string;
    capacity?: number;
    enrolled?: number;
    trainer_name?: string;
    course_id?: string;
    status?: 'scheduled' | 'in_progress' | 'completed' | 'canceled';
  };
  courseName: string;
  actions?: React.ReactNode;
}

const TrainingSessionCard: React.FC<TrainingSessionCardProps> = ({
  session,
  courseName,
  actions
}) => {
  // Format date
  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(date);
  };
  
  // Status badge variant
  const getStatusVariant = () => {
    switch(session.status) {
      case 'in_progress': return 'default';
      case 'completed': return 'outline';
      case 'scheduled': return 'secondary';
      case 'canceled': return 'destructive';
      default: return 'outline';
    }
  };
  
  // Status label
  const getStatusLabel = () => {
    switch(session.status) {
      case 'in_progress': return 'En cours';
      case 'completed': return 'Terminé';
      case 'scheduled': return 'Planifié';
      case 'canceled': return 'Annulé';
      default: return 'Planifié';
    }
  };
  
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <Badge variant={getStatusVariant()} className="mb-2">
            {getStatusLabel()}
          </Badge>
        </div>
        
        <CardTitle className="line-clamp-2">
          {session.name || courseName}
        </CardTitle>
        
        <CardDescription>
          {courseName !== session.name && courseName}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="flex-grow space-y-2 pb-2">
        {session.start_date && (
          <div className="flex gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <div className="text-sm">
              {formatDate(session.start_date)}
              {session.end_date && session.end_date !== session.start_date && (
                <> au {formatDate(session.end_date)}</>
              )}
            </div>
          </div>
        )}
        
        {session.location && (
          <div className="flex gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <div className="text-sm">{session.location}</div>
          </div>
        )}
        
        {session.capacity && (
          <div className="flex gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <div className="text-sm">
              {session.enrolled || 0}/{session.capacity} participants
            </div>
          </div>
        )}
        
        {session.trainer_name && (
          <div className="flex gap-2">
            <FileText className="h-4 w-4 text-muted-foreground" />
            <div className="text-sm">
              Formateur: {session.trainer_name}
            </div>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="pt-2 border-t">
        {actions}
      </CardFooter>
    </Card>
  );
};

export default TrainingSessionCard;
