
import React from 'react';
import { HrLayout } from '../components';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../../src/components/ui/tabs';
import { DataInitializationPanel } from '../../components/settings';
import { Button } from '../../../../src/components/ui/button';
import { Link } from 'react-router-dom';
import { Settings, Database, Users, ShieldAlert } from 'lucide-react';

/**
 * Page de paramètres du module RH
 */
const SettingsView: React.FC = () => {
  return (
    <HrLayout>
      <div className="space-y-6">
        {/* En-tête */}
        <div className="flex items-center gap-3">
          <div className="h-6 w-1.5 bg-slate-500 rounded-full"></div>
          <Settings className="h-6 w-6 text-slate-500" />
          <h1 className="text-2xl font-bold">Paramètres RH</h1>
        </div>
        
        <Tabs defaultValue="general" className="space-y-4">
          <TabsList>
            <TabsTrigger value="general">Général</TabsTrigger>
            <TabsTrigger value="data">Données</TabsTrigger>
            <TabsTrigger value="permissions">Permissions</TabsTrigger>
            <TabsTrigger value="integration">Intégrations</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general" className="space-y-4">
            <h2 className="text-xl font-semibold">Paramètres généraux</h2>
            <p className="text-muted-foreground">
              Configurez les paramètres généraux du module RH.
            </p>
            
            {/* Contenu des paramètres généraux à implémenter */}
            <div className="border rounded-md p-8 text-center">
              <p className="text-muted-foreground">
                Les paramètres généraux seront disponibles prochainement.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="data" className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Database className="h-5 w-5 text-slate-500" />
              <h2 className="text-xl font-semibold">Gestion des données</h2>
            </div>
            
            <p className="text-muted-foreground mb-6">
              Importez ou exportez des données pour personnaliser le module RH.
            </p>
            
            <DataInitializationPanel />
          </TabsContent>
          
          <TabsContent value="permissions" className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldAlert className="h-5 w-5 text-slate-500" />
                <h2 className="text-xl font-semibold">Permissions</h2>
              </div>
              <Button variant="outline" asChild>
                <Link to="/hr/roles">
                  <Users className="mr-2 h-4 w-4" />
                  Configurer les rôles
                </Link>
              </Button>
            </div>
            <p className="text-muted-foreground">
              Gérez les permissions des utilisateurs pour le module RH.
            </p>
            
            {/* Contenu des permissions à implémenter */}
            <div className="border rounded-md p-8">
              <p className="text-muted-foreground mb-4">
                Pour configurer les rôles et permissions, utilisez la page dédiée de gestion des rôles.
              </p>
              <Button asChild>
                <Link to="/hr/roles">
                  Aller à la gestion des rôles
                </Link>
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="integration" className="space-y-4">
            <h2 className="text-xl font-semibold">Intégrations</h2>
            <p className="text-muted-foreground">
              Configurez les intégrations avec d'autres systèmes.
            </p>
            
            {/* Contenu des intégrations à implémenter */}
            <div className="border rounded-md p-8 text-center">
              <p className="text-muted-foreground">
                Les intégrations seront disponibles prochainement.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </HrLayout>
  );
};

export default SettingsView;
