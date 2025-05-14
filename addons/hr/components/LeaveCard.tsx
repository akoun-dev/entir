import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../../src/components/ui/card';
import { Badge } from '../../../src/components/ui/badge';
import { Button } from '../../../src/components/ui/button';
import { CalendarIcon, UserIcon, ClockIcon, CheckIcon, XIcon } from 'lucide-react';

// Types
interface Leave {
  id: number;
  startDate: string;
  endDate: string;
  duration: number;
  status: 'draft' | 'submitted' | 'approved' | 'rejected' | 'cancelled';
  reason?: string;
  employee: {
    id: number;
    firstName: string;
    lastName: string;
  };
  leaveType: {
    id: number;
    name: string;
    color: string;
    isPaid: boolean;
  };
  approver?: {
    id: number;
    firstName: string;
    lastName: string;
  };
  approvedAt?: string;
}

interface LeaveCardProps {
  leave: Leave;
  onView?: (id: number) => void;
  onApprove?: (id: number) => void;
  onReject?: (id: number) => void;
}

/**
 * Carte affichant les informations d'un congé
 */
const LeaveCard: React.FC<LeaveCardProps> = ({ leave, onView, onApprove, onReject }) => {
  // Fonction pour obtenir la couleur du badge en fonction du statut
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft':
        return 'bg-gray-500';
      case 'submitted':
        return 'bg-blue-500';
      case 'approved':
        return 'bg-green-500';
      case 'rejected':
        return 'bg-red-500';
      case 'cancelled':
        return 'bg-amber-500';
      default:
        return 'bg-gray-500';
    }
  };

  // Fonction pour obtenir le libellé du statut
  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'draft':
        return 'Brouillon';
      case 'submitted':
        return 'Soumis';
      case 'approved':
        return 'Approuvé';
      case 'rejected':
        return 'Rejeté';
      case 'cancelled':
        return 'Annulé';
      default:
        return 'Inconnu';
    }
  };

  // Formater les dates
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  return (
    <Card className="w-full max-w-md overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">
              Congé {leave.leaveType.name}
            </CardTitle>
            <CardDescription>
              {formatDate(leave.startDate)} - {formatDate(leave.endDate)}
            </CardDescription>
          </div>
          <Badge className={`${getStatusColor(leave.status)}`}>
            {getStatusLabel(leave.status)}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="pb-2">
        <div className="space-y-2 text-sm">
          <div className="flex items-center">
            <UserIcon className="mr-2 h-4 w-4 opacity-70" />
            <span>{leave.employee.firstName} {leave.employee.lastName}</span>
          </div>
          
          <div className="flex items-center">
            <ClockIcon className="mr-2 h-4 w-4 opacity-70" />
            <span>{leave.duration} jour{leave.duration > 1 ? 's' : ''}</span>
            <Badge variant="outline" className="ml-2">
              {leave.leaveType.isPaid ? 'Payé' : 'Non payé'}
            </Badge>
          </div>
          
          {leave.reason && (
            <div className="mt-2">
              <p className="text-sm text-muted-foreground">Motif: {leave.reason}</p>
            </div>
          )}
          
          {leave.approver && leave.approvedAt && (
            <div className="flex items-center">
              <CheckIcon className="mr-2 h-4 w-4 text-green-500" />
              <span>
                Approuvé par {leave.approver.firstName} {leave.approver.lastName} le {formatDate(leave.approvedAt)}
              </span>
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="pt-2">
        <div className="flex space-x-2 w-full">
          {onView && (
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1"
              onClick={() => onView(leave.id)}
            >
              Voir
            </Button>
          )}
          
          {leave.status === 'submitted' && (
            <>
              {onApprove && (
                <Button 
                  variant="default" 
                  size="sm" 
                  className="flex-1 bg-green-600 hover:bg-green-700"
                  onClick={() => onApprove(leave.id)}
                >
                  <CheckIcon className="mr-1 h-4 w-4" />
                  Approuver
                </Button>
              )}
              
              {onReject && (
                <Button 
                  variant="destructive" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => onReject(leave.id)}
                >
                  <XIcon className="mr-1 h-4 w-4" />
                  Rejeter
                </Button>
              )}
            </>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default LeaveCard;
