import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../../src/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../../../src/components/ui/avatar';
import { Badge } from '../../../src/components/ui/badge';
import { Button } from '../../../src/components/ui/button';
import { CalendarIcon, BriefcaseIcon, BuildingIcon, PhoneIcon, MailIcon, UserIcon } from 'lucide-react';

// Types
interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  employeeNumber?: string;
  hireDate?: string;
  status: 'active' | 'inactive' | 'on_leave' | 'terminated';
  department?: {
    id: number;
    name: string;
  };
  position?: {
    id: number;
    name: string;
  };
}

interface EmployeeCardProps {
  employee: Employee;
  onView?: (id: number) => void;
  onEdit?: (id: number) => void;
}

/**
 * Carte affichant les informations d'un employé
 */
const EmployeeCard: React.FC<EmployeeCardProps> = ({ employee, onView, onEdit }) => {
  // Fonction pour obtenir la couleur du badge en fonction du statut
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500';
      case 'inactive':
        return 'bg-gray-500';
      case 'on_leave':
        return 'bg-amber-500';
      case 'terminated':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  // Fonction pour obtenir le libellé du statut
  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active':
        return 'Actif';
      case 'inactive':
        return 'Inactif';
      case 'on_leave':
        return 'En congé';
      case 'terminated':
        return 'Terminé';
      default:
        return 'Inconnu';
    }
  };

  // Obtenir les initiales pour l'avatar
  const getInitials = () => {
    return `${employee.firstName.charAt(0)}${employee.lastName.charAt(0)}`;
  };

  return (
    <Card className="w-full max-w-md overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-center space-x-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${employee.firstName}%20${employee.lastName}`} alt={`${employee.firstName} ${employee.lastName}`} />
            <AvatarFallback>{getInitials()}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-lg">{employee.firstName} {employee.lastName}</CardTitle>
            <CardDescription>
              {employee.position?.name || 'Aucun poste'}
              {employee.employeeNumber && ` • N° ${employee.employeeNumber}`}
            </CardDescription>
          </div>
        </div>
        <Badge className={`${getStatusColor(employee.status)} mt-2`}>
          {getStatusLabel(employee.status)}
        </Badge>
      </CardHeader>
      
      <CardContent className="pb-2">
        <div className="space-y-2 text-sm">
          {employee.department && (
            <div className="flex items-center">
              <BuildingIcon className="mr-2 h-4 w-4 opacity-70" />
              <span>{employee.department.name}</span>
            </div>
          )}
          
          {employee.position && (
            <div className="flex items-center">
              <BriefcaseIcon className="mr-2 h-4 w-4 opacity-70" />
              <span>{employee.position.name}</span>
            </div>
          )}
          
          {employee.hireDate && (
            <div className="flex items-center">
              <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />
              <span>Embauché le {new Date(employee.hireDate).toLocaleDateString()}</span>
            </div>
          )}
          
          <div className="flex items-center">
            <MailIcon className="mr-2 h-4 w-4 opacity-70" />
            <span>{employee.email}</span>
          </div>
          
          {employee.phone && (
            <div className="flex items-center">
              <PhoneIcon className="mr-2 h-4 w-4 opacity-70" />
              <span>{employee.phone}</span>
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
              onClick={() => onView(employee.id)}
            >
              Voir
            </Button>
          )}
          
          {onEdit && (
            <Button 
              variant="default" 
              size="sm" 
              className="flex-1"
              onClick={() => onEdit(employee.id)}
            >
              Modifier
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default EmployeeCard;
