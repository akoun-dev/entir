
import React from 'react';
import { Dialog } from '../../../../../src/components/ui/dialog';
import TemplateDialog from '../dialogs/TemplateDialog';
import HeaderFooterDialog from '../dialogs/HeaderFooterDialog';
import PrintDialog from '../dialogs/PrintDialog';
import { ProfileDialogsProps } from '../../../hooks/employee-profile/types';

const ProfileDialogs: React.FC<ProfileDialogsProps> = ({
  templateDialogOpen,
  setTemplateDialogOpen,
  headerFooterDialogOpen,
  setHeaderFooterDialogOpen,
  printDialogOpen,
  setPrintDialogOpen,
  templates,
  selectedTemplate,
  onTemplateChange,
  currentTemplate,
  updateHeaderFooterConfig,
  employee,
  onPrint
}) => {
  return (
    <>
      {/* Template Dialog */}
      <Dialog open={templateDialogOpen} onOpenChange={setTemplateDialogOpen}>
        <TemplateDialog 
          templates={templates}
          selectedTemplate={selectedTemplate}
          onTemplateChange={onTemplateChange}
          currentTemplate={currentTemplate}
        />
      </Dialog>
      
      {/* Header/Footer Configuration Dialog */}
      <Dialog open={headerFooterDialogOpen} onOpenChange={setHeaderFooterDialogOpen}>
        <HeaderFooterDialog 
          currentTemplate={currentTemplate}
          selectedTemplate={selectedTemplate}
          updateHeaderFooterConfig={updateHeaderFooterConfig}
          onClose={() => setHeaderFooterDialogOpen(false)}
        />
      </Dialog>
      
      {/* Print Dialog */}
      <Dialog open={printDialogOpen} onOpenChange={setPrintDialogOpen}>
        <PrintDialog 
          employee={{
            name: employee?.name || 'Employé',
            job_title: employee?.job_title,
            department_name: employee?.department_name
          }}
          onPrint={onPrint}
          onClose={() => setPrintDialogOpen(false)}
        />
      </Dialog>
    </>
  );
};

export default ProfileDialogs;
