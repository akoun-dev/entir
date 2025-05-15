
import React from 'react';
import { DialogContent, DialogTitle } from '../../../../../src/components/ui/dialog';
import ProfileHeaderFooter from '../header-footer/ProfileHeaderFooter';
import { HeaderFooterDialogProps } from '../../../hooks/employee-profile/types';

const HeaderFooterDialog: React.FC<HeaderFooterDialogProps> = ({
  currentTemplate,
  selectedTemplate,
  updateHeaderFooterConfig,
  onClose
}) => {
  return (
    <DialogContent className="sm:max-w-3xl">
      <DialogTitle>Configuration de l'en-tête et du pied de page</DialogTitle>
      <div className="py-4">
        <ProfileHeaderFooter
          config={currentTemplate.headerFooterConfig}
          onChange={(config) => updateHeaderFooterConfig(selectedTemplate, config)}
          onSave={onClose}
        />
      </div>
    </DialogContent>
  );
};

export default HeaderFooterDialog;
