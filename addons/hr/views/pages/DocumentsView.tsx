import React from 'react';
import { Button } from '../../../../src/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../../../src/components/ui/card';
import { FileText, Upload, Download, Plus, Search, Filter } from 'lucide-react';
import { HrDashboardMenu } from '../components';
import { Input } from '../../../../src/components/ui/input';

/**
 * Page de gestion des documents RH
 */
const DocumentsView: React.FC = () => {
  // Données simulées pour les documents
  const documents = [
    {
      id: 1,
      name: 'Contrat de travail - Jean Dupont',
      type: 'Contrat',
      date: '15/03/2023',
      size: '1.2 MB',
      format: 'PDF'
    },
    {
      id: 2,
      name: 'Avenant - Marie Martin',
      type: 'Avenant',
      date: '22/05/2023',
      size: '0.8 MB',
      format: 'PDF'
    },
    {
      id: 3,
      name: 'Fiche de poste - Développeur',
      type: 'Fiche de poste',
      date: '10/01/2023',
      size: '0.5 MB',
      format: 'DOCX'
    },
    {
      id: 4,
      name: 'Règlement intérieur',
      type: 'Règlement',
      date: '01/01/2023',
      size: '2.1 MB',
      format: 'PDF'
    },
    {
      id: 5,
      name: 'Organigramme - Département Marketing',
      type: 'Organigramme',
      date: '05/04/2023',
      size: '1.5 MB',
      format: 'PNG'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-6">
      {/* En-tête avec actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Documents RH</h1>
          <p className="text-muted-foreground mt-1">Gestion des documents et fichiers RH</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Download size={16} />
            Exporter
          </Button>
          <Button size="sm" className="flex items-center gap-2">
            <Upload size={16} />
            Importer
          </Button>
        </div>
      </div>
      
      {/* Menu de navigation */}
      <HrDashboardMenu />
      
      {/* Barre de recherche et filtres */}
      <Card className="mb-8">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher un document..."
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Filter size={16} />
                Filtres
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Plus size={16} />
                Nouveau
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Liste des documents */}
      <Card>
        <CardHeader>
          <CardTitle>Documents</CardTitle>
          <CardDescription>Liste des documents RH</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Nom</th>
                  <th className="text-left py-3 px-4 font-medium">Type</th>
                  <th className="text-left py-3 px-4 font-medium">Date</th>
                  <th className="text-left py-3 px-4 font-medium">Format</th>
                  <th className="text-left py-3 px-4 font-medium">Taille</th>
                  <th className="text-right py-3 px-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {documents.map(doc => (
                  <tr key={doc.id} className="border-b hover:bg-muted/50">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <span>{doc.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">{doc.type}</td>
                    <td className="py-3 px-4">{doc.date}</td>
                    <td className="py-3 px-4">{doc.format}</td>
                    <td className="py-3 px-4">{doc.size}</td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Search className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DocumentsView;
