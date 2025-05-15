import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Building, 
  Clock, 
  LogOut, 
  Award, 
  Users, 
  Briefcase,
  Calendar,
  FileText,
  Settings,
  ChevronRight
} from 'lucide-react';
import { cn } from '../../../../src/lib/utils';

/**
 * Menu de configuration RH
 */
export const HrConfigMenu: React.FC = () => {
  const location = useLocation();
  
  // Définition des catégories et éléments du menu
  const menuCategories = [
    {
      name: 'Organisation',
      items: [
        {
          name: 'Lieux de travail',
          path: '/hr/config/work-locations',
          icon: <Building className="h-4 w-4" />
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
        }
      ]
    },
    {
      name: 'Compétences',
      items: [
        {
          name: 'Types de compétences',
          path: '/hr/config/skill-types',
          icon: <Award className="h-4 w-4" />
        }
      ]
    },
    {
      name: 'Recrutement',
      items: [
        {
          name: 'Postes',
          path: '/hr/config/job-positions',
          icon: <Briefcase className="h-4 w-4" />
        },
        {
          name: 'Types d\'emploi',
          path: '/hr/config/employment-types',
          icon: <Users className="h-4 w-4" />
        }
      ]
    },
    {
      name: 'Planning',
      items: [
        {
          name: 'Planning d\'activités',
          path: '/hr/config/activity-planning',
          icon: <Calendar className="h-4 w-4" />
        },
        {
          name: 'Plans d\'intégration/de gestion des départs',
          path: '/hr/config/integration-plans',
          icon: <FileText className="h-4 w-4" />
        }
      ]
    }
  ];
  
  // Vérifier si un élément de menu est actif
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <div className="flex flex-col md:flex-row gap-6 mb-8">
      {menuCategories.map((category, categoryIndex) => (
        <div key={categoryIndex} className="flex-1">
          <div className="font-medium text-sm text-muted-foreground mb-2">
            {category.name}
          </div>
          <div className="space-y-1 border rounded-lg overflow-hidden">
            {category.items.map((item, itemIndex) => (
              <Link
                key={itemIndex}
                to={item.path}
                className={cn(
                  "flex items-center justify-between px-3 py-2 text-sm transition-colors",
                  isActive(item.path)
                    ? "bg-primary text-primary-foreground font-medium"
                    : "hover:bg-muted/50"
                )}
              >
                <div className="flex items-center gap-2">
                  {item.icon}
                  <span>{item.name}</span>
                </div>
                {isActive(item.path) && <ChevronRight className="h-4 w-4" />}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
