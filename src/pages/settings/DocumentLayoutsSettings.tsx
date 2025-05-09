import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Badge } from '../../components/ui/badge';
import { FileText, Plus, FileEdit, Trash2 } from 'lucide-react';

interface DocumentLayout {
  id: string;
  name: string;
  type: string;
  lastModified: string;
  isDefault: boolean;
}

const DocumentLayoutsSettings: React.FC = () => {
  const [layouts, setLayouts] = useState<DocumentLayout[]>([
    {
      id: '1',
      name: 'Facture standard',
      type: 'Facture',
      lastModified: '2025-04-15',
      isDefault: true
    },
    {
      id: '2',
      name: 'Devis professionnel',
      type: 'Devis',
      lastModified: '2025-03-28',
      isDefault: false
    },
    {
      id: '3',
      name: 'Bon de commande',
      type: 'Commande',
      lastModified: '2025-05-02',
      isDefault: true
    }
  ]);

  const handleSetDefault = (id: string) => {
    setLayouts(layouts.map(layout => ({
      ...layout,
      isDefault: layout.id === id
    })));
  };

  const handleDeleteLayout = (id: string) => {
    setLayouts(layouts.filter(layout => layout.id !== id));
  };

  return (
    <div className="p-6">
      {/* En-tête */}
      <div className="flex items-center gap-3 mb-6">
        <FileText className="h-8 w-8 text-ivory-orange" />
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Modèles de documents</h1>
          <p className="text-muted-foreground mt-1">Gérez les modèles pour vos factures, devis et autres documents</p>
        </div>
      </div>

      {/* Carte principale */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Modèles disponibles</CardTitle>
            <CardDescription>Liste des modèles de documents configurés</CardDescription>
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
                  <TableHead>Type</TableHead>
                  <TableHead>Dernière modification</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {layouts.map((layout) => (
                  <TableRow key={layout.id}>
                    <TableCell className="font-medium">{layout.name}</TableCell>
                    <TableCell>{layout.type}</TableCell>
                    <TableCell>{layout.lastModified}</TableCell>
                    <TableCell>
                      {layout.isDefault ? (
                        <Badge variant="default">Par défaut</Badge>
                      ) : (
                        <Badge variant="outline">Personnalisé</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleSetDefault(layout.id)}
                          disabled={layout.isDefault}
                        >
                          <FileEdit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleDeleteLayout(layout.id)}
                          disabled={layout.isDefault}
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

export default DocumentLayoutsSettings;
