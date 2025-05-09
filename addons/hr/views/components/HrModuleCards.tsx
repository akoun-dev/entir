import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../../../src/components/ui/card';
import { Button } from '../../../../src/components/ui/button';
import { Badge } from '../../../../src/components/ui/badge';
import {
  Users,
  FolderKanban,
  Calendar,
  LayoutDashboard,
  FileText,
  Award,
  Briefcase,
  GraduationCap,
  Clock,
  ArrowRight
} from 'lucide-react';

/**
 * Composant qui affiche les modules RH sous forme de cartes
 */
export const HrModuleCards: React.FC = () => {
  const modules = [
    {
      id: 'employees',
      title: 'Gestion des employés',
      description: 'Création et gestion des fiches employé',
      icon: <Users className="h-10 w-10 p-2 rounded-full bg-primary/10 text-primary" />,
      route: '/hr/employees',
      summary: 'Suivi des informations personnelles et professionnelles, historique des postes, salaires et documents RH.',
      stats: '24 employés actifs',
      badge: 'Essentiel',
      badgeVariant: 'default',
      features: [
        'Création et gestion des fiches employé',
        'Suivi des contrats (CDI, CDD, etc.)',
        'Historique des postes, salaires, et documents RH',
        'Suivi des informations personnelles et professionnelles',
        'Champs personnalisables (badges, équipes, départements)'
      ]
    },
    {
      id: 'departments',
      title: 'Départements et hiérarchies',
      description: 'Organisation par départements',
      icon: <FolderKanban className="h-10 w-10 p-2 rounded-full bg-blue-50 text-blue-500" />,
      route: '/hr/departments',
      summary: 'Organisez votre entreprise en départements, gérez les managers et les sous-hiérarchies.',
      stats: '5 départements',
      badge: 'Organisation',
      badgeVariant: 'outline',
      features: [
        'Organisation par départements',
        'Gestion des managers et des sous-hiérarchies',
        'Affectation de rôles et permissions'
      ]
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {modules.map(module => (
        <Card key={module.id} className="overflow-hidden transition-all duration-300 hover:shadow-md hover:border-primary/30 flex flex-col h-full">
          <CardHeader className="pb-4 border-b">
            <div className="flex items-start justify-between">
              <div className="flex flex-col">
                <div className="flex items-center gap-2 mb-2">
                  <CardTitle className="text-2xl font-bold">{module.title}</CardTitle>
                  {module.badge && (
                    <Badge variant={module.badgeVariant as any} className="ml-2">
                      {module.badge}
                    </Badge>
                  )}
                </div>
                <CardDescription className="text-base">{module.description}</CardDescription>
              </div>
              {module.icon}
            </div>
          </CardHeader>
          <CardContent className="pt-4 flex-grow">
            <p className="text-sm text-muted-foreground mb-4">
              {module.summary}
            </p>

            {module.features && module.features.length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-medium mb-2">Fonctionnalités</h4>
                <ul className="space-y-2">
                  {module.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0"></div>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {module.stats && (
              <div className="flex items-center mt-4 text-sm font-medium text-muted-foreground">
                <Clock className="h-4 w-4 mr-1" />
                {module.stats}
              </div>
            )}
          </CardContent>
          <CardFooter className="bg-muted/10 pt-4 pb-4 border-t">
            <Button
              asChild
              className="w-full justify-between"
            >
              <Link to={module.route}>
                <span>Accéder au module</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
