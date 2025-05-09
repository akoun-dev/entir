import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Printer, Plus, Trash2, TestTube2 } from 'lucide-react';
import { Badge } from '../../components/ui/badge';

interface PrinterConfig {
  id: string;
  name: string;
  type: string;
  connection: string;
  isDefault: boolean;
}

const PrintersSettings: React.FC = () => {
  const [printers, setPrinters] = useState<PrinterConfig[]>([
    {
      id: '1',
      name: 'Imprimante Bureau',
      type: 'Laser',
      connection: 'Réseau',
      isDefault: true
    },
    {
      id: '2',
      name: 'Imprimante Comptabilité',
      type: 'Jet d\'encre',
      connection: 'USB',
      isDefault: false
    }
  ]);

  const [newPrinter, setNewPrinter] = useState({
    name: '',
    type: 'Laser',
    connection: 'Réseau'
  });

  const handleAddPrinter = () => {
    if (!newPrinter.name) return;
    
    const printer: PrinterConfig = {
      id: String(printers.length + 1),
      name: newPrinter.name,
      type: newPrinter.type,
      connection: newPrinter.connection,
      isDefault: printers.length === 0
    };

    setPrinters([...printers, printer]);
    setNewPrinter({
      name: '',
      type: 'Laser',
      connection: 'Réseau'
    });
  };

  const handleSetDefault = (id: string) => {
    setPrinters(printers.map(printer => ({
      ...printer,
      isDefault: printer.id === id
    })));
  };

  const handleDeletePrinter = (id: string) => {
    setPrinters(printers.filter(printer => printer.id !== id));
  };

  const handleTestPrinter = (id: string) => {
    // TODO: Implémenter le test d'imprimante
    console.log('Test printer:', id);
  };

  return (
    <div className="p-6">
      {/* En-tête */}
      <div className="flex items-center gap-3 mb-6">
        <Printer className="h-8 w-8 text-ivory-orange" />
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Imprimantes</h1>
          <p className="text-muted-foreground mt-1">Configurez les imprimantes pour l'impression des documents</p>
        </div>
      </div>

      {/* Formulaire d'ajout */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Ajouter une imprimante</CardTitle>
          <CardDescription>Configurez une nouvelle imprimante pour votre système</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Nom
              </Label>
              <Input
                id="name"
                value={newPrinter.name}
                onChange={(e) => setNewPrinter({...newPrinter, name: e.target.value})}
                className="col-span-3"
                placeholder="Nom de l'imprimante"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="type" className="text-right">
                Type
              </Label>
              <Select
                value={newPrinter.type}
                onValueChange={(value) => setNewPrinter({...newPrinter, type: value})}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Sélectionnez un type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Laser">Laser</SelectItem>
                  <SelectItem value="Jet d'encre">Jet d'encre</SelectItem>
                  <SelectItem value="Thermique">Thermique</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="connection" className="text-right">
                Connexion
              </Label>
              <Select
                value={newPrinter.connection}
                onValueChange={(value) => setNewPrinter({...newPrinter, connection: value})}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Sélectionnez une connexion" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Réseau">Réseau</SelectItem>
                  <SelectItem value="USB">USB</SelectItem>
                  <SelectItem value="WiFi">WiFi</SelectItem>
                  <SelectItem value="Bluetooth">Bluetooth</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-end">
              <Button 
                className="bg-ivory-orange hover:bg-ivory-orange/90"
                onClick={handleAddPrinter}
                disabled={!newPrinter.name}
              >
                <Plus className="h-4 w-4 mr-2" />
                Ajouter l'imprimante
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Liste des imprimantes */}
      <Card>
        <CardHeader>
          <CardTitle>Imprimantes configurées</CardTitle>
          <CardDescription>Liste des imprimantes disponibles pour l'impression</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {printers.map((printer) => (
              <div key={printer.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <div className="font-medium">{printer.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {printer.type} • {printer.connection}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {printer.isDefault ? (
                    <Badge variant="default">Par défaut</Badge>
                  ) : (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleSetDefault(printer.id)}
                    >
                      Définir par défaut
                    </Button>
                  )}
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => handleTestPrinter(printer.id)}
                  >
                    <TestTube2 className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => handleDeletePrinter(printer.id)}
                    disabled={printer.isDefault}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PrintersSettings;
