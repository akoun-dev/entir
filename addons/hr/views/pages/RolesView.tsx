
import React from 'react';
import { HrLayout } from '../components';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../../src/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../../src/components/ui/card';
import { Alert, AlertDescription } from '../../../../src/components/ui/alert';
import { Settings, User, ShieldAlert, Users, Building2 } from 'lucide-react';

/**
 * Page de gestion des rôles et permissions
 */
const RolesView: React.FC = () => {
  return (
    <HrLayout>
      <div className="space-y-6">
        {/* En-tête */}
        <div className="flex items-center gap-3 mt-4">
          <div className="h-6 w-1.5 bg-amber-500 rounded-full"></div>
          <Settings className="h-6 w-6 text-amber-500" />
          <h1 className="text-2xl font-bold">Gestion des rôles</h1>
        </div>
        
        <p className="text-muted-foreground">
          Configurez les rôles et permissions pour les utilisateurs du module RH
        </p>
        
        <Tabs defaultValue="roles" className="space-y-4">
          <TabsList>
            <TabsTrigger value="roles" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Rôles
            </TabsTrigger>
            <TabsTrigger value="permissions" className="flex items-center gap-2">
              <ShieldAlert className="h-4 w-4" />
              Permissions
            </TabsTrigger>
            <TabsTrigger value="departments" className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              Par département
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Utilisateurs
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="roles" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Définition des rôles</CardTitle>
                <CardDescription>
                  Créez et configurez les rôles disponibles dans le système
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Alert>
                  <AlertDescription>
                    Cette fonctionnalité sera disponible dans une prochaine version.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="permissions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Matrice de permissions</CardTitle>
                <CardDescription>
                  Définissez les permissions pour chaque rôle
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Alert>
                  <AlertDescription>
                    Cette fonctionnalité sera disponible dans une prochaine version.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="departments" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Permissions par département</CardTitle>
                <CardDescription>
                  Configurez les permissions spécifiques à chaque département
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Alert>
                  <AlertDescription>
                    Cette fonctionnalité sera disponible dans une prochaine version.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="users" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Assignation des rôles</CardTitle>
                <CardDescription>
                  Attribuez des rôles aux utilisateurs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Alert>
                  <AlertDescription>
                    Cette fonctionnalité sera disponible dans une prochaine version.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </HrLayout>
  );
};

export default RolesView;
