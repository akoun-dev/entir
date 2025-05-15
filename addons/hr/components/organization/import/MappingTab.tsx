
import React from 'react';
import { Button } from '../../../../../src/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../../../src/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../../../src/components/ui/select';
import { Separator } from '../../../../../src/components/ui/separator';

interface ImportMapping {
  sourceField: string;
  targetField: string;
}

interface MappingTabProps {
  headerPreview: string[];
  dataPreview: string[][];
  mappings: ImportMapping[];
  handleMappingChange: (sourceField: string, targetField: string) => void;
  employeeFields: { id: string, label: string, required?: boolean }[];
  resetImport: () => void;
  onContinue: () => void;
}

const MappingTab: React.FC<MappingTabProps> = ({
  headerPreview,
  dataPreview,
  mappings,
  handleMappingChange,
  employeeFields,
  resetImport,
  onContinue,
}) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Aperçu du fichier</h3>
        {headerPreview.length > 0 && dataPreview.length > 0 && (
          <div className="border rounded-md overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  {headerPreview.map((header, i) => (
                    <TableHead key={i}>{header}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {dataPreview.map((row, rowIndex) => (
                  <TableRow key={rowIndex}>
                    {row.map((cell, cellIndex) => (
                      <TableCell key={cellIndex}>{cell}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>

      <Separator />

      <div className="space-y-2">
        <h3 className="text-sm font-medium">Mapping des champs</h3>
        <p className="text-xs text-muted-foreground">
          Associez chaque colonne de votre fichier à un champ de l'employé
        </p>

        <div className="border rounded-md overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Colonne du fichier</TableHead>
                <TableHead>Champ employé</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mappings.map((mapping) => (
                <TableRow key={mapping.sourceField}>
                  <TableCell>{mapping.sourceField}</TableCell>
                  <TableCell>
                    <Select
                      value={mapping.targetField}
                      onValueChange={(value) => handleMappingChange(mapping.sourceField, value)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Sélectionner un champ" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Ne pas importer</SelectItem>
                        {employeeFields.map((field) => (
                          <SelectItem key={field.id} value={field.id}>
                            {field.label} {field.required && "*"}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <Button variant="outline" onClick={resetImport}>Annuler</Button>
        <Button onClick={onContinue}>Continuer</Button>
      </div>
    </div>
  );
};

export default MappingTab;
