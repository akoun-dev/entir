
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '../../../../src/components/ui/card';
import {
  Users,
  Building2,
  FileText,
  CalendarCheck,
  GraduationCap,
  Briefcase,
  Settings,
  ChevronRight,
  FolderTree,
  ShieldAlert,
} from 'lucide-react';

/**
 * Menu principal pour le module RH
 */
export const HrMainMenu: React.FC = () => {
  const menuItems = [
    {
      icon: <Users className="h-5 w-5 text-ivory-orange" />,
      title: 'Employés',
      description: 'Gérer les fiches employés',
      path: '/hr/employees',
    },
    {
      icon: <Building2 className="h-5 w-5 text-ivory-green" />,
      title: 'Départements',
      description: 'Organiser la structure',
      path: '/hr/departments',
    },
    {
      icon: <FolderTree className="h-5 w-5 text-amber-500" />,
      title: 'Organigramme',
      description: 'Visualiser la hiérarchie',
      path: '/hr/organization',
    },
    {
      icon: <FileText className="h-5 w-5 text-amber-500" />,
      title: 'Contrats',
      description: 'Suivi des contrats',
      path: '/hr/contracts',
    },
    {
      icon: <CalendarCheck className="h-5 w-5 text-blue-500" />,
      title: 'Congés',
      description: 'Gestion des absences',
      path: '/hr/leaves',
    },
    {
      icon: <Briefcase className="h-5 w-5 text-purple-500" />,
      title: 'Recrutement',
      description: 'Processus d\'embauche',
      path: '/hr/recruitment',
    },
    {
      icon: <GraduationCap className="h-5 w-5 text-indigo-500" />,
      title: 'Formation',
      description: 'Développement des compétences',
      path: '/hr/training',
    },
    {
      icon: <ShieldAlert className="h-5 w-5 text-red-500" />,
      title: 'Rôles',
      description: 'Gestion des permissions',
      path: '/hr/roles',
    },
    {
      icon: <Settings className="h-5 w-5 text-gray-500" />,
      title: 'Paramètres',
      description: 'Configuration du module',
      path: '/hr/settings',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {menuItems.map((item, idx) => (
        <Link key={idx} to={item.path}>
          <Card className="h-full hover:shadow-md transition-shadow border-l-4 border-l-ivory-orange hover:border-l-ivory-green duration-300">
            <CardContent className="p-4 flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-full bg-muted flex items-center justify-center">
                  {item.icon}
                </div>
                <div className="text-left">
                  <h3 className="font-medium">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
};
