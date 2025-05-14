import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '../../../src/components/ui/card';
import { Button } from '../../../src/components/ui/button';
import { Input } from '../../../src/components/ui/input';
import { Label } from '../../../src/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../../../src/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../src/components/ui/tabs';
import { Switch } from '../../../src/components/ui/switch';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '../../../src/components/ui/table';
import { Badge } from '../../../src/components/ui/badge';
import {
  SettingsIcon,
  SaveIcon,
  PlusIcon,
  EditIcon,
  TrashIcon,
  CalendarIcon,
  ClockIcon,
  UserIcon,
  FileTextIcon,
  CheckIcon,
  XIcon
} from 'lucide-react';

/**
 * Page des paramètres RH
 */
const HRSettings = () => {
  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Paramètres RH</h1>
          <p className="text-muted-foreground">
            Configuration du module Ressources Humaines
          </p>
        </div>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">Général</TabsTrigger>
          <TabsTrigger value="leave-types">Types de congés</TabsTrigger>
          <TabsTrigger value="contract-types">Types de contrats</TabsTrigger>
          <TabsTrigger value="skills">Compétences</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Paramètres généraux</CardTitle>
              <CardDescription>
                Configuration générale du module RH
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company-name">Nom de l'entreprise</Label>
                  <Input id="company-name" defaultValue="Ma Société" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fiscal-year">Année fiscale</Label>
                  <Select defaultValue="calendar">
                    <SelectTrigger id="fiscal-year">
                      <SelectValue placeholder="Sélectionner le type d'année fiscale" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="calendar">Année calendaire (Jan-Déc)</SelectItem>
                      <SelectItem value="custom">Personnalisée</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="work-week">Jours travaillés</Label>
                  <Select defaultValue="mon-fri">
                    <SelectTrigger id="work-week">
                      <SelectValue placeholder="Sélectionner les jours travaillés" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mon-fri">Lundi-Vendredi</SelectItem>
                      <SelectItem value="mon-sat">Lundi-Samedi</SelectItem>
                      <SelectItem value="custom">Personnalisé</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="work-hours">Heures de travail</Label>
                  <Select defaultValue="9-17">
                    <SelectTrigger id="work-hours">
                      <SelectValue placeholder="Sélectionner les heures de travail" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="9-17">9h-17h</SelectItem>
                      <SelectItem value="8-16">8h-16h</SelectItem>
                      <SelectItem value="custom">Personnalisé</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2 pt-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="auto-approve-leave">Approbation automatique des congés</Label>
                  <Switch id="auto-approve-leave" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Approuver automatiquement les demandes de congés sans validation du manager
                </p>
              </div>

              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="enable-attendance">Activer le suivi des présences</Label>
                  <Switch id="enable-attendance" defaultChecked />
                </div>
                <p className="text-sm text-muted-foreground">
                  Activer le module de suivi des présences des employés
                </p>
              </div>

              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="enable-evaluations">Activer les évaluations</Label>
                  <Switch id="enable-evaluations" defaultChecked />
                </div>
                <p className="text-sm text-muted-foreground">
                  Activer le module d'évaluation des employés
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="ml-auto">
                <SaveIcon className="mr-2 h-4 w-4" />
                Enregistrer
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="leave-types" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle>Types de congés</CardTitle>
                <CardDescription>
                  Gérer les différents types de congés disponibles
                </CardDescription>
              </div>
              <Button size="sm">
                <PlusIcon className="mr-2 h-4 w-4" />
                Ajouter
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nom</TableHead>
                    <TableHead>Code</TableHead>
                    <TableHead>Jours alloués</TableHead>
                    <TableHead>Payé</TableHead>
                    <TableHead>Approbation requise</TableHead>
                    <TableHead>Actif</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Congés payés</TableCell>
                    <TableCell>CP</TableCell>
                    <TableCell>25</TableCell>
                    <TableCell><CheckIcon className="h-4 w-4 text-green-500" /></TableCell>
                    <TableCell><CheckIcon className="h-4 w-4 text-green-500" /></TableCell>
                    <TableCell><CheckIcon className="h-4 w-4 text-green-500" /></TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon">
                        <EditIcon className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">RTT</TableCell>
                    <TableCell>RTT</TableCell>
                    <TableCell>12</TableCell>
                    <TableCell><CheckIcon className="h-4 w-4 text-green-500" /></TableCell>
                    <TableCell><CheckIcon className="h-4 w-4 text-green-500" /></TableCell>
                    <TableCell><CheckIcon className="h-4 w-4 text-green-500" /></TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon">
                        <EditIcon className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Maladie</TableCell>
                    <TableCell>MAL</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell><CheckIcon className="h-4 w-4 text-green-500" /></TableCell>
                    <TableCell><XIcon className="h-4 w-4 text-red-500" /></TableCell>
                    <TableCell><CheckIcon className="h-4 w-4 text-green-500" /></TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon">
                        <EditIcon className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Sans solde</TableCell>
                    <TableCell>CSS</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell><XIcon className="h-4 w-4 text-red-500" /></TableCell>
                    <TableCell><CheckIcon className="h-4 w-4 text-green-500" /></TableCell>
                    <TableCell><CheckIcon className="h-4 w-4 text-green-500" /></TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon">
                        <EditIcon className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contract-types" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle>Types de contrats</CardTitle>
                <CardDescription>
                  Gérer les différents types de contrats disponibles
                </CardDescription>
              </div>
              <Button size="sm">
                <PlusIcon className="mr-2 h-4 w-4" />
                Ajouter
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nom</TableHead>
                    <TableHead>Code</TableHead>
                    <TableHead>Durée déterminée</TableHead>
                    <TableHead>Période d'essai</TableHead>
                    <TableHead>Actif</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">CDI</TableCell>
                    <TableCell>CDI</TableCell>
                    <TableCell><XIcon className="h-4 w-4 text-red-500" /></TableCell>
                    <TableCell>3 mois</TableCell>
                    <TableCell><CheckIcon className="h-4 w-4 text-green-500" /></TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon">
                        <EditIcon className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">CDD</TableCell>
                    <TableCell>CDD</TableCell>
                    <TableCell><CheckIcon className="h-4 w-4 text-green-500" /></TableCell>
                    <TableCell>1 mois</TableCell>
                    <TableCell><CheckIcon className="h-4 w-4 text-green-500" /></TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon">
                        <EditIcon className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Stage</TableCell>
                    <TableCell>STAGE</TableCell>
                    <TableCell><CheckIcon className="h-4 w-4 text-green-500" /></TableCell>
                    <TableCell>2 semaines</TableCell>
                    <TableCell><CheckIcon className="h-4 w-4 text-green-500" /></TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon">
                        <EditIcon className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Alternance</TableCell>
                    <TableCell>ALT</TableCell>
                    <TableCell><CheckIcon className="h-4 w-4 text-green-500" /></TableCell>
                    <TableCell>1 mois</TableCell>
                    <TableCell><CheckIcon className="h-4 w-4 text-green-500" /></TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon">
                        <EditIcon className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="skills" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle>Compétences</CardTitle>
                <CardDescription>
                  Gérer les compétences pour les employés
                </CardDescription>
              </div>
              <Button size="sm">
                <PlusIcon className="mr-2 h-4 w-4" />
                Ajouter
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nom</TableHead>
                    <TableHead>Catégorie</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Niveaux</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">JavaScript</TableCell>
                    <TableCell>Développement</TableCell>
                    <TableCell>Langage de programmation JavaScript</TableCell>
                    <TableCell>5</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon">
                        <EditIcon className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">React</TableCell>
                    <TableCell>Développement</TableCell>
                    <TableCell>Bibliothèque JavaScript pour interfaces utilisateur</TableCell>
                    <TableCell>5</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon">
                        <EditIcon className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Gestion de projet</TableCell>
                    <TableCell>Management</TableCell>
                    <TableCell>Compétences en gestion de projet</TableCell>
                    <TableCell>3</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon">
                        <EditIcon className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Anglais</TableCell>
                    <TableCell>Langues</TableCell>
                    <TableCell>Maîtrise de l'anglais</TableCell>
                    <TableCell>6</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon">
                        <EditIcon className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Paramètres de notifications</CardTitle>
              <CardDescription>
                Configurer les notifications du module RH
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Notifications par email</h3>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="notify-leave-request">Demandes de congés</Label>
                    <Switch id="notify-leave-request" defaultChecked />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Envoyer une notification lors d'une nouvelle demande de congé
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="notify-leave-approval">Approbations de congés</Label>
                    <Switch id="notify-leave-approval" defaultChecked />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Envoyer une notification lors de l'approbation d'une demande de congé
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="notify-contract-expiry">Expiration de contrats</Label>
                    <Switch id="notify-contract-expiry" defaultChecked />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Envoyer une notification avant l'expiration d'un contrat
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="notify-birthday">Anniversaires</Label>
                    <Switch id="notify-birthday" defaultChecked />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Envoyer une notification pour les anniversaires des employés
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="notify-evaluation">Évaluations</Label>
                    <Switch id="notify-evaluation" defaultChecked />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Envoyer une notification pour les évaluations à venir
                  </p>
                </div>
              </div>

              <div className="space-y-4 pt-4">
                <h3 className="text-lg font-medium">Délais de notification</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="contract-expiry-days">Jours avant expiration de contrat</Label>
                    <Input id="contract-expiry-days" type="number" defaultValue="30" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="birthday-days">Jours avant anniversaire</Label>
                    <Input id="birthday-days" type="number" defaultValue="3" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="evaluation-days">Jours avant évaluation</Label>
                    <Input id="evaluation-days" type="number" defaultValue="14" />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="ml-auto">
                <SaveIcon className="mr-2 h-4 w-4" />
                Enregistrer
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HRSettings;
