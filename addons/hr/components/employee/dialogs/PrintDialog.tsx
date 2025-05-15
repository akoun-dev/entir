
import React from 'react';
import { DialogContent, DialogHeader, DialogTitle } from '../../../../../src/components/ui/dialog';
import { Button } from '../../../../../src/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../../../src/components/ui/tabs';
import { Printer } from 'lucide-react';
import { PrintDialogProps } from '../../../hooks/employee-profile/types';

const PrintDialog: React.FC<PrintDialogProps> = ({ employee, onPrint, onClose }) => {
  return (
    <DialogContent className="sm:max-w-xl">
      <DialogHeader>
        <DialogTitle>Options d'impression</DialogTitle>
      </DialogHeader>
      <div className="py-4">
        <Tabs defaultValue="preview" className="w-full">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="preview">Aperçu</TabsTrigger>
            <TabsTrigger value="options">Options</TabsTrigger>
          </TabsList>
          
          <TabsContent value="preview" className="border rounded-md p-4 max-h-[60vh] overflow-y-auto">
            <div className="mb-4 text-sm text-muted-foreground text-center">
              Aperçu de l'impression
            </div>
            <div className="scale-75 origin-top border p-4 rounded-md shadow-sm">
              <img
                src={`data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='40'%3E%3Crect width='200' height='40' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='12' fill='%236b7280' text-anchor='middle' dominant-baseline='middle'%3EAperçu du profil de ${employee.name}%3C/text%3E%3C/svg%3E`}
                alt="Print Preview"
                className="w-full mb-4 rounded"
              />
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-semibold">Nom :</span> 
                  <span>{employee.name}</span>
                </div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-semibold">Poste :</span> 
                  <span>{employee.job_title || 'Non défini'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="font-semibold">Département :</span> 
                  <span>{employee.department_name || 'Non défini'}</span>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="options" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Format de papier</label>
                <select className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm">
                  <option>A4</option>
                  <option>Letter</option>
                  <option>Legal</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Orientation</label>
                <select className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm">
                  <option>Portrait</option>
                  <option>Paysage</option>
                </select>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Informations à inclure</label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <input id="include_contact" type="checkbox" defaultChecked className="h-4 w-4 rounded border-gray-300" />
                  <label htmlFor="include_contact" className="text-sm">Informations de contact</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input id="include_prof" type="checkbox" defaultChecked className="h-4 w-4 rounded border-gray-300" />
                  <label htmlFor="include_prof" className="text-sm">Informations professionnelles</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input id="include_notes" type="checkbox" defaultChecked className="h-4 w-4 rounded border-gray-300" />
                  <label htmlFor="include_notes" className="text-sm">Notes</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input id="include_qr" type="checkbox" defaultChecked className="h-4 w-4 rounded border-gray-300" />
                  <label htmlFor="include_qr" className="text-sm">QR Code</label>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-end space-x-2 mt-6">
          <Button variant="outline" onClick={onClose}>Annuler</Button>
          <Button onClick={onPrint}>
            <Printer className="h-4 w-4 mr-2" />
            Imprimer
          </Button>
        </div>
      </div>
    </DialogContent>
  );
};

export default PrintDialog;
