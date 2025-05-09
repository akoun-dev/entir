import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Badge } from '../../components/ui/badge';
import { FileBarChart2, Plus, FileEdit, Trash2, Download } from 'lucide-react';

interface ReportTemplate {
  id: string;
  name: string;
  category: string;
  lastModified: string;
  format: string;
}

const ReportTemplatesSettings: React.FC = () => {
  const [templates, setTemplates] = useState<ReportTemplate[]>([
    {
      id: '1',
      name: 'Rapport financier mensuel',
      category: 'Finance',
      lastModified: '2025-04-10',
      format: 'PDF'
    },
    {
      id: '2',
      name: 'Statistiques des ventes',
      category: 'Ventes',
      lastModified: '2025-05-05',
      format: 'Excel'
    },
    {
      id: '3',
      name: 'Activité des employés',
      category: 'RH',
      lastModified: '2025-03-22',
      format: 'PDF'
    }
  ]);

  const handleDeleteTemplate = (id: string) => {
    setTemplates(templates.filter(template => template.id !== id));
  };

  const handleDownloadTemplate = (id: string) => {
    // TODO: Implémenter le téléchargement
    console.log('Download template:', id);
  };

  return (
    <div className="p-6">
      {/* En-tête */}
      <div className="flex items-center gap-3 mb-6">
        <FileBarChart2 className="h-8 w-8 text-ivory-orange" />
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Modèles de rapports</h1>
          <p className="text-muted-foreground mt-1">Gérez les modèles pour vos rapports analytiques</p>
        </div>
      </div>

      {/* Carte principale */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Modèles disponibles</CardTitle>
            <CardDescription>Liste des modèles de rapports configurés</CardDescription>
          </div>
          <Button className="bg-ivory-orange hover:bg-ivory-orange/90">
            <Plus className="h-4 w-4 mr-2" />
            Nouveau modèle
          </Button>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom</TableHead>
                  <TableHead>Catégorie</TableHead>
                  <TableHead>Dernière modification</TableHead>
                  <TableHead>Format</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {templates.map((template) => (
                  <TableRow key={template.id}>
                    <TableCell className="font-medium">{template.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{template.category}</Badge>
                    </TableCell>
                    <TableCell>{template.lastModified}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{template.format}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleDownloadTemplate(template.id)}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                        >
                          <FileEdit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleDeleteTemplate(template.id)}
                        >
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
    </div>
  );
};

export default ReportTemplatesSettings;
