import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Badge } from '../../components/ui/badge';
import { Label } from '../../components/ui/label';
import { Switch } from '../../components/ui/switch';
import { FileText, FileInput, FileOutput, Calendar, Download, Upload, Plus } from 'lucide-react';

interface ImportExportJob {
  id: string;
  type: 'import' | 'export';
  format: 'CSV' | 'Excel' | 'JSON';
  entity: string;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  date: string;
  records: number;
}

const ImportExportSettings: React.FC = () => {
  const [jobs, setJobs] = useState<ImportExportJob[]>([
    {
      id: '1',
      type: 'export',
      format: 'CSV',
      entity: 'Clients',
      status: 'completed',
      date: '2023-06-15 14:30',
      records: 245
    },
    {
      id: '2',
      type: 'import',
      format: 'Excel',
      entity: 'Produits',
      status: 'completed',
      date: '2023-06-14 10:15',
      records: 120
    },
    {
      id: '3',
      type: 'export',
      format: 'JSON',
      entity: 'Commandes',
      status: 'failed',
      date: '2023-06-13 16:45',
      records: 0
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const filteredJobs = jobs.filter(job => 
    job.entity.toLowerCase().includes(searchTerm.toLowerCase()) || 
    job.format.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'completed':
        return <Badge variant="default">Terminé</Badge>;
      case 'in_progress':
        return <Badge variant="secondary">En cours</Badge>;
      case 'failed':
        return <Badge variant="destructive">Échoué</Badge>;
      default:
        return <Badge variant="outline">En attente</Badge>;
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <FileText className="h-8 w-8 text-ivory-orange" />
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Import/Export</h1>
          <p className="text-muted-foreground mt-1">Configuration des outils d'échange de données</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Configuration */}
        <Card>
          <CardHeader>
            <CardTitle>Configuration</CardTitle>
            <CardDescription>Paramètres des opérations d'import/export</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-6">
            <div>
              <Label>Importation</Label>
              <div className="space-y-4 mt-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Format par défaut</span>
                  <Badge variant="outline">CSV</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Validation automatique</span>
                  <Switch defaultChecked />
                </div>
              </div>
            </div>
            <div>
              <Label>Exportation</Label>
              <div className="space-y-4 mt-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Format par défaut</span>
                  <Badge variant="outline">Excel</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Inclure les en-têtes</span>
                  <Switch defaultChecked />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Historique */}
        <Card>
          <CardHeader>
            <CardTitle>Historique des opérations</CardTitle>
            <CardDescription>Journal des imports/exports récents</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative mb-4">
              <Input
                placeholder="Rechercher une opération..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Format</TableHead>
                    <TableHead>Entité</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Enregistrements</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredJobs.map((job) => (
                    <TableRow key={job.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {job.type === 'import' ? <FileInput className="h-4 w-4" /> : <FileOutput className="h-4 w-4" />}
                          {job.type === 'import' ? 'Import' : 'Export'}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{job.format}</Badge>
                      </TableCell>
                      <TableCell>{job.entity}</TableCell>
                      <TableCell>{getStatusBadge(job.status)}</TableCell>
                      <TableCell>{job.date}</TableCell>
                      <TableCell>{job.records}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon">
                          <Download className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Actions rapides */}
        <div className="grid grid-cols-2 gap-4">
          <Button className="h-24 flex flex-col items-center justify-center gap-2">
            <Upload className="h-6 w-6" />
            <span>Nouvel import</span>
          </Button>
          <Button className="h-24 flex flex-col items-center justify-center gap-2 bg-ivory-orange hover:bg-ivory-orange/90">
            <Download className="h-6 w-6" />
            <span>Nouvel export</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ImportExportSettings;