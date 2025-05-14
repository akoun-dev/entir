import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../../src/components/ui/card';
import { Badge } from '../../../src/components/ui/badge';
import { Button } from '../../../src/components/ui/button';
import { BuildingIcon, UsersIcon, DollarSignIcon, BarChartIcon } from 'lucide-react';

// Types
interface Department {
  id: number;
  name: string;
  code: string;
  description?: string;
  active: boolean;
  budget?: number;
  costCenter?: string;
  employeeCount?: number;
  manager?: {
    id: number;
    firstName: string;
    lastName: string;
  };
}

interface DepartmentCardProps {
  department: Department;
  onView?: (id: number) => void;
  onEdit?: (id: number) => void;
}

/**
 * Carte affichant les informations d'un département
 */
const DepartmentCard: React.FC<DepartmentCardProps> = ({ department, onView, onEdit }) => {
  // Formater le budget
  const formatBudget = (budget?: number) => {
    if (!budget) return 'Non défini';
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(budget);
  };

  return (
    <Card className="w-full max-w-md overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{department.name}</CardTitle>
            <CardDescription>Code: {department.code}</CardDescription>
          </div>
          <Badge variant={department.active ? "default" : "secondary"}>
            {department.active ? 'Actif' : 'Inactif'}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="pb-2">
        {department.description && (
          <p className="text-sm text-muted-foreground mb-4">{department.description}</p>
        )}
        
        <div className="space-y-2 text-sm">
          {department.manager && (
            <div className="flex items-center">
              <UsersIcon className="mr-2 h-4 w-4 opacity-70" />
              <span>Responsable: {department.manager.firstName} {department.manager.lastName}</span>
            </div>
          )}
          
          {department.employeeCount !== undefined && (
            <div className="flex items-center">
              <UsersIcon className="mr-2 h-4 w-4 opacity-70" />
              <span>{department.employeeCount} employé{department.employeeCount > 1 ? 's' : ''}</span>
            </div>
          )}
          
          {department.budget !== undefined && (
            <div className="flex items-center">
              <DollarSignIcon className="mr-2 h-4 w-4 opacity-70" />
              <span>Budget: {formatBudget(department.budget)}</span>
            </div>
          )}
          
          {department.costCenter && (
            <div className="flex items-center">
              <BarChartIcon className="mr-2 h-4 w-4 opacity-70" />
              <span>Centre de coût: {department.costCenter}</span>
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
              onClick={() => onView(department.id)}
            >
              Voir
            </Button>
          )}
          
          {onEdit && (
            <Button 
              variant="default" 
              size="sm" 
              className="flex-1"
              onClick={() => onEdit(department.id)}
            >
              Modifier
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default DepartmentCard;
