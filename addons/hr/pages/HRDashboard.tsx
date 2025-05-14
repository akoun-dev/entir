import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../src/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../src/components/ui/tabs';
import { Button } from '../../../src/components/ui/button';
import {
  UsersIcon,
  BuildingIcon,
  BriefcaseIcon,
  FileTextIcon,
  CalendarIcon,
  ClockIcon,
  StarIcon,
  PlusIcon,
  UserPlusIcon
} from 'lucide-react';

/**
 * Tableau de bord du module RH
 */
const HRDashboard = () => {
  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tableau de bord RH</h1>
          <p className="text-muted-foreground">
            Bienvenue dans le module de gestion des ressources humaines
          </p>
        </div>
        <Button className="flex items-center">
          <UserPlusIcon className="mr-2 h-4 w-4" />
          Nouvel employé
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Employés
            </CardTitle>
            <UsersIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">152</div>
            <p className="text-xs text-muted-foreground">
              +4 ce mois-ci
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Départements
            </CardTitle>
            <BuildingIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">10</div>
            <p className="text-xs text-muted-foreground">
              Tous actifs
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Congés en attente
            </CardTitle>
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">
              À approuver
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Contrats actifs
            </CardTitle>
            <FileTextIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">145</div>
            <p className="text-xs text-muted-foreground">
              3 à renouveler ce mois-ci
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
          <TabsTrigger value="leaves">Congés</TabsTrigger>
          <TabsTrigger value="attendance">Présences</TabsTrigger>
          <TabsTrigger value="recruitment">Recrutement</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Répartition par département</CardTitle>
                <CardDescription>
                  Nombre d'employés par département
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                {/* Ici, vous pourriez intégrer un graphique */}
                <div className="h-[200px] flex items-center justify-center text-muted-foreground">
                  Graphique de répartition par département
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Employés récemment embauchés</CardTitle>
                <CardDescription>
                  Les 5 derniers employés embauchés
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Liste des employés récemment embauchés */}
                  <div className="flex items-center">
                    <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                      <UsersIcon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Sophie Martin</p>
                      <p className="text-xs text-muted-foreground">Développeur - 15/05/2025</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                      <UsersIcon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Thomas Dubois</p>
                      <p className="text-xs text-muted-foreground">Designer - 10/05/2025</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                      <UsersIcon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Julie Leroy</p>
                      <p className="text-xs text-muted-foreground">Comptable - 02/05/2025</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Congés à venir</CardTitle>
                <CardDescription>
                  Prochains congés approuvés
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center mr-3">
                      <CalendarIcon className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Pierre Dupont</p>
                      <p className="text-xs text-muted-foreground">20/06/2025 - 30/06/2025</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center mr-3">
                      <CalendarIcon className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Marie Lambert</p>
                      <p className="text-xs text-muted-foreground">15/06/2025 - 22/06/2025</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contrats à renouveler</CardTitle>
                <CardDescription>
                  Contrats expirant prochainement
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-9 h-9 rounded-full bg-amber-100 flex items-center justify-center mr-3">
                      <FileTextIcon className="h-5 w-5 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Lucas Moreau</p>
                      <p className="text-xs text-muted-foreground">Expire le 30/06/2025</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-9 h-9 rounded-full bg-amber-100 flex items-center justify-center mr-3">
                      <FileTextIcon className="h-5 w-5 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Emma Petit</p>
                      <p className="text-xs text-muted-foreground">Expire le 15/07/2025</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Anniversaires</CardTitle>
                <CardDescription>
                  Prochains anniversaires
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                      <UsersIcon className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Jean Durand</p>
                      <p className="text-xs text-muted-foreground">25 juin (35 ans)</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                      <UsersIcon className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Camille Roux</p>
                      <p className="text-xs text-muted-foreground">30 juin (28 ans)</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="leaves" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Demandes de congés en attente</CardTitle>
              <CardDescription>
                Demandes nécessitant une approbation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Contenu des congés en attente */}
                <p className="text-muted-foreground">Contenu des congés en attente</p>
              </CardContent>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="attendance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Présences du jour</CardTitle>
              <CardDescription>
                Statut de présence des employés aujourd'hui
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Contenu des présences */}
                <p className="text-muted-foreground">Contenu des présences</p>
              </CardContent>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recruitment" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recrutements en cours</CardTitle>
              <CardDescription>
                Postes ouverts et candidatures
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Contenu des recrutements */}
                <p className="text-muted-foreground">Contenu des recrutements</p>
              </CardContent>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HRDashboard;
