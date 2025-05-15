
import React from 'react';
import { DialogContent, DialogTitle } from '../../../../../src/components/ui/dialog';
import TemplateSelector from '../TemplateSelector';
import { TemplateDialogProps } from '../../../hooks/employee-profile/types';

const TemplateDialog: React.FC<TemplateDialogProps> = ({
  templates,
  selectedTemplate,
  onTemplateChange,
  currentTemplate
}) => {
  return (
    <DialogContent className="sm:max-w-md">
      <DialogTitle>Choisir un template</DialogTitle>
      <div className="py-4">
        <TemplateSelector
          templates={templates}
          selectedTemplate={selectedTemplate}
          onTemplateChange={onTemplateChange}
          label="Sélectionner un template pour l'affichage"
        />
        
        <div className="mt-6">
          <p className="text-sm text-muted-foreground mb-2">
            Le template définit l'apparence et les informations affichées sur la fiche employé.
          </p>
          
          {currentTemplate && (
            <div className="text-sm bg-muted p-3 rounded-md">
              <div className="font-medium">{currentTemplate.name}</div>
              {currentTemplate.description && (
                <div className="text-muted-foreground mt-1">{currentTemplate.description}</div>
              )}
            </div>
          )}
        </div>
      </div>
    </DialogContent>
  );
};

export default TemplateDialog;
