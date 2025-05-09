import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Button } from '../../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Switch } from '../../components/ui/switch';
import { Building2, Users, FileText, Clock, Calendar } from 'lucide-react';

/**
 * Page des paramètres d'organisation
 * Permet de configurer la structure organisationnelle de l'entreprise
 */
const OrganizationSettings: React.FC = () => {
  // État pour les départements
  const [departments, setDepartments] = useState([
    { id: 1, name: 'Direction', manager: 'Jean Dupont', employeeCount: 3 },
    { id: 2, name: 'Ressources Humaines', manager: 'Marie Martin', employeeCount: 5 },
    { id: 3, name: 'Finance', manager: 'Pierre Durand', employeeCount: 7 },
    { id: 4, name: 'Marketing', manager: 'Sophie Lefebvre', employeeCount: 10 },
    { id: 5, name: 'Développement', manager: 'Thomas Bernard', employeeCount: 15 }
  ]);

  return (
    <div className="p-6">
      {/* En-tête */}
      <div className="flex items-center gap-3 mb-6">
        <Building2 className="h-8 w-8 text-ivory-orange" />
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Structure organisationnelle</h1>
          <p className="text-muted-foreground mt-1">Configurez les départements et la hiérarchie de votre entreprise</p>
        </div>
      </div>

      {/* Onglets */}
      <Tabs defaultValue="departments" className="space-y-6">
        <TabsList>
          <TabsTrigger value="departments">Départements</TabsTrigger>
          <TabsTrigger value="positions">Postes</TabsTrigger>
          <TabsTrigger value="hierarchy">Hiérarchie</TabsTrigger>
          <TabsTrigger value="work-schedule">Horaires de travail</TabsTrigger>
        </TabsList>

        {/* Onglet Départements */}
        <TabsContent value="departments" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Départements</CardTitle>
                <CardDescription>Gérez les départements de votre entreprise</CardDescription>
              </div>
              <Button className="bg-ivory-orange hover:bg-ivory-orange/90">
                Ajouter un département
              </Button>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="py-3 px-4 text-left font-medium">Nom</th>
                      <th className="py-3 px-4 text-left font-medium">Responsable</th>
                      <th className="py-3 px-4 text-left font-medium">Employés</th>
                      <th className="py-3 px-4 text-right font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {departments.map(dept => (
                      <tr key={dept.id} className="border-b">
                        <td className="py-3 px-4">{dept.name}</td>
                        <td className="py-3 px-4">{dept.manager}</td>
                        <td className="py-3 px-4">{dept.employeeCount}</td>
                        <td className="py-3 px-4 text-right">
                          <Button variant="ghost" size="sm">Modifier</Button>
                          <Button variant="ghost" size="sm" className="text-destructive">Supprimer</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Paramètres des départements</CardTitle>
              <CardDescription>Configuration générale des départements</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Afficher les départements dans l'organigramme</Label>
                  <p className="text-sm text-muted-foreground">
                    Affiche les départements dans la visualisation de l'organigramme
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Autoriser les employés à changer de département</Label>
                  <p className="text-sm text-muted-foreground">
                    Permet aux responsables RH de déplacer les employés entre départements
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Notifications de changement de département</Label>
                  <p className="text-sm text-muted-foreground">
                    Envoie des notifications lors des changements de département
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Onglet Horaires de travail */}
        <TabsContent value="work-schedule" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Horaires de travail par défaut</CardTitle>
              <CardDescription>Définissez les horaires de travail standard pour votre entreprise</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="work-days">Jours de travail</Label>
                  <Select defaultValue="monday-friday">
                    <SelectTrigger id="work-days">
                      <SelectValue placeholder="Sélectionnez les jours de travail" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monday-friday">Lundi à Vendredi</SelectItem>
                      <SelectItem value="monday-saturday">Lundi à Samedi</SelectItem>
                      <SelectItem value="all-week">Tous les jours</SelectItem>
                      <SelectItem value="custom">Personnalisé</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="work-hours">Heures de travail</Label>
                  <Select defaultValue="9-17">
                    <SelectTrigger id="work-hours">
                      <SelectValue placeholder="Sélectionnez les heures de travail" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="9-17">9h - 17h</SelectItem>
                      <SelectItem value="8-16">8h - 16h</SelectItem>
                      <SelectItem value="10-18">10h - 18h</SelectItem>
                      <SelectItem value="custom">Personnalisé</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="lunch-break">Pause déjeuner</Label>
                <Select defaultValue="12-13">
                  <SelectTrigger id="lunch-break">
                    <SelectValue placeholder="Sélectionnez la pause déjeuner" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="12-13">12h - 13h</SelectItem>
                    <SelectItem value="13-14">13h - 14h</SelectItem>
                    <SelectItem value="none">Pas de pause fixe</SelectItem>
                    <SelectItem value="custom">Personnalisé</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="flex-time">Horaires flexibles</Label>
                <div className="flex items-center space-x-2">
                  <Switch id="flex-time" />
                  <Label htmlFor="flex-time">Autoriser les horaires flexibles</Label>
                </div>
                <p className="text-sm text-muted-foreground">
                  Permet aux employés de choisir leurs heures d'arrivée et de départ dans une plage définie
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Boutons d'action */}
      <div className="flex justify-end gap-3 mt-6">
        <Button variant="outline">Annuler</Button>
        <Button className="bg-ivory-orange hover:bg-ivory-orange/90">Enregistrer</Button>
      </div>
    </div>
  );
};

export default OrganizationSettings;
