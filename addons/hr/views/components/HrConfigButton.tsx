import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Settings, 
  Building2, 
  Clock, 
  LogOut, 
  Award, 
  Briefcase, 
  Users, 
  Calendar, 
  FileText,
  X
} from 'lucide-react';
import { Button } from '../../../../src/components/ui/button';
import { cn } from '../../../../src/lib/utils';

/**
 * Bouton flottant pour accéder rapidement à la configuration RH
 */
export const HrConfigButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const configItems = [
    {
      name: 'Lieux de travail',
      path: '/hr/config/work-locations',
      icon: <Building2 className="h-4 w-4" />
    },
    {
      name: 'Horaires de travail',
      path: '/hr/config/work-hours',
      icon: <Clock className="h-4 w-4" />
    },
    {
      name: 'Raisons du départ',
      path: '/hr/config/departure-reasons',
      icon: <LogOut className="h-4 w-4" />
    },
    {
      name: 'Types de compétences',
      path: '/hr/config/skill-types',
      icon: <Award className="h-4 w-4" />
    },
    {
      name: 'Postes',
      path: '/hr/config/job-positions',
      icon: <Briefcase className="h-4 w-4" />
    },
    {
      name: 'Types d\'emploi',
      path: '/hr/config/employment-types',
      icon: <Users className="h-4 w-4" />
    },
    {
      name: 'Planning d\'activités',
      path: '/hr/config/activity-planning',
      icon: <Calendar className="h-4 w-4" />
    },
    {
      name: 'Plans d\'intégration',
      path: '/hr/config/integration-plans',
      icon: <FileText className="h-4 w-4" />
    }
  ];
  
  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Menu déroulant */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 bg-card border rounded-lg shadow-lg p-2 w-64 mb-2">
          <div className="flex justify-between items-center p-2 border-b mb-2">
            <h3 className="font-medium text-sm">Configuration RH</h3>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-6 w-6 p-0" 
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-1">
            {configItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className="flex items-center gap-2 p-2 text-sm rounded-md hover:bg-muted transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <div className="text-primary">{item.icon}</div>
                <span>{item.name}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
      
      {/* Bouton principal */}
      <Button
        size="icon"
        className={cn(
          "h-12 w-12 rounded-full shadow-md transition-all",
          isOpen ? "bg-primary text-primary-foreground" : "bg-card hover:bg-primary/10"
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        <Settings className={cn(
          "h-5 w-5 transition-all",
          isOpen ? "text-primary-foreground" : "text-primary"
        )} />
      </Button>
    </div>
  );
};
