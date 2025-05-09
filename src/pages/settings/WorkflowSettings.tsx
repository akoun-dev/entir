import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Badge } from '../../components/ui/badge';
import { Label } from '../../components/ui/label';
import { Workflow, Plus, Pencil, Trash2, Users, ArrowRight, Bell } from 'lucide-react';

interface WorkflowStep {
  id: string;
  name: string;
  type: 'approval' | 'notification' | 'task';
  assignee: string;
  conditions: string[];
}

interface Workflow {
  id: string;
  name: string;
  description: string;
  active: boolean;
  steps: WorkflowStep[];
}

const WorkflowSettings: React.FC = () => {
  const [workflows, setWorkflows] = useState<Workflow[]>([
    {
      id: '1',
      name: 'Approbation de commande',
      description: 'Workflow pour l\'approbation des commandes clients',
      active: true,
      steps: [
        { id: '1', name: 'Première approbation', type: 'approval', assignee: 'Responsable commercial', conditions: ['Montant > 1000€'] },
        { id: '2', name: 'Notification comptabilité', type: 'notification', assignee: 'Comptabilité', conditions: [] }
      ]
    },
    {
      id: '2',
      name: 'Onboarding client',
      description: 'Workflow pour l\'intégration des nouveaux clients',
      active: true,
      steps: [
        { id: '1', name: 'Création compte', type: 'task', assignee: 'Support', conditions: [] },
        { id: '2', name: 'Formation', type: 'task', assignee: 'Commercial', conditions: [] }
      ]
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const filteredWorkflows = workflows.filter(workflow => 
    workflow.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    workflow.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <Workflow className="h-8 w-8 text-ivory-orange" />
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Workflows</h1>
          <p className="text-muted-foreground mt-1">Configuration des flux de travail automatisés</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Liste des workflows */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Workflows configurés</CardTitle>
              <CardDescription>Liste des workflows disponibles dans l'application</CardDescription>
            </div>
            <Button className="bg-ivory-orange hover:bg-ivory-orange/90">
              <Plus className="h-4 w-4 mr-2" />
              Nouveau workflow
            </Button>
          </CardHeader>
          <CardContent>
            <div className="relative mb-4">
              <Input
                placeholder="Rechercher un workflow..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nom</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Étapes</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredWorkflows.map((workflow) => (
                    <TableRow key={workflow.id}>
                      <TableCell className="font-medium">{workflow.name}</TableCell>
                      <TableCell>{workflow.description}</TableCell>
                      <TableCell>
                        <Badge variant={workflow.active ? 'default' : 'secondary'}>
                          {workflow.active ? 'Actif' : 'Inactif'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          {workflow.steps.length}
                          <Badge variant="outline" className="text-xs">
                            {workflow.steps.filter(s => s.type === 'approval').length} approbations
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon">
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Détails d'un workflow */}
        {filteredWorkflows.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Détails du workflow</CardTitle>
              <CardDescription>Étapes et configuration du workflow sélectionné</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredWorkflows[0].steps.map((step, index) => (
                  <div key={step.id} className="flex items-start gap-4 p-4 border rounded-lg">
                    <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full bg-gray-100">
                      {step.type === 'approval' && <Users className="h-5 w-5 text-gray-600" />}
                      {step.type === 'notification' && <Bell className="h-5 w-5 text-gray-600" />}
                      {step.type === 'task' && <Workflow className="h-5 w-5 text-gray-600" />}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{step.name}</div>
                      <div className="text-sm text-muted-foreground mt-1">
                        Assigné à: {step.assignee}
                      </div>
                      {step.conditions.length > 0 && (
                        <div className="mt-2">
                          <Label>Conditions:</Label>
                          <ul className="list-disc list-inside text-sm text-muted-foreground">
                            {step.conditions.map((condition, i) => (
                              <li key={i}>{condition}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                    {index < filteredWorkflows[0].steps.length - 1 && (
                      <ArrowRight className="h-5 w-5 text-muted-foreground" />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default WorkflowSettings;