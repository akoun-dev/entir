
import React, { useState } from 'react';
import { useToast } from '../../../../../src/hooks/use-toast';
import ProfileHeader from '../profile/ProfileHeader';
import ProfileContent from '../profile/ProfileContent';
import ProfileFooter from '../profile/ProfileFooter';
import ProfileTopBar from './ProfileTopBar';
import ProfileDialogs from './ProfileDialogs';
import ProfilePrintStyles from './ProfilePrintStyles';
import { EmployeeProfileContainerProps } from '../../../hooks/employee-profile/types';

const EmployeeProfileContainer: React.FC<EmployeeProfileContainerProps> = ({
  profileRef,
  employee,
  loading,
  saving,
  isEditing,
  setIsEditing,
  saveEmployee,
  cancelEditing,
  updateField,
  getProfileUrl,
  templates,
  selectedTemplate,
  handleTemplateChange,
  getCurrentTemplate,
  updateHeaderFooterConfig,
  generatePDF,
  isPdfGenerating,
  employeeId
}) => {
  const { toast } = useToast();
  const [templateDialogOpen, setTemplateDialogOpen] = useState(false);
  const [headerFooterDialogOpen, setHeaderFooterDialogOpen] = useState(false);
  const [printDialogOpen, setPrintDialogOpen] = useState(false);
  
  const currentTemplate = getCurrentTemplate();
  
  // Function to handle print preview
  const handlePrintPreview = () => {
    setPrintDialogOpen(true);
  };
  
  // Function to handle actual printing
  const handlePrint = () => {
    window.print();
    toast({
      title: "Impression lancée",
      description: "La fiche employé a été envoyée à l'imprimante"
    });
  };

  // Function to handle PDF export
  const handlePdfExport = async () => {
    if (profileRef.current && employeeId) {
      await generatePDF(profileRef.current, employee?.name || `employee-${employeeId}`);
    }
  };
  
  if (loading) {
    return <LoadingProfile />;
  }

  return (
    <div className="container mx-auto p-4">
      {/* Actions bar */}
      <ProfileTopBar 
        employeeName={employee?.name || 'Employé'} 
        isEditing={isEditing}
        saving={saving}
        isPdfGenerating={isPdfGenerating}
        onEditClick={() => setIsEditing(true)}
        onCancelClick={cancelEditing}
        onSaveClick={saveEmployee}
        onTemplateClick={() => setTemplateDialogOpen(true)}
        onPrintClick={handlePrintPreview}
        onPdfExport={handlePdfExport}
      />
      
      {/* Profile content - wrapped in a ref for PDF export */}
      <div ref={profileRef} className="profile-content">
        {/* Header */}
        <ProfileHeader 
          headerConfig={currentTemplate.headerFooterConfig.header}
          showQRCode={currentTemplate.showQRCode}
          qrCodePosition={currentTemplate.qrCodePosition}
          getProfileUrl={getProfileUrl}
          onHeaderFooterEdit={() => setHeaderFooterDialogOpen(true)}
        />
        
        {/* Main content */}
        <ProfileContent 
          employee={{
            name: employee?.name || 'Employé',
            job_title: employee?.job_title,
            department_name: employee?.department_name,
            work_email: employee?.work_email,
            work_phone: employee?.work_phone,
            manager_name: employee?.manager_name,
            notes: employee?.notes,
            photo: employee?.photo
          }}
          isEditing={isEditing}
          updateField={updateField}
          currentTemplate={currentTemplate}
          getProfileUrl={getProfileUrl}
        />
        
        {/* Footer */}
        <ProfileFooter 
          footerConfig={currentTemplate.headerFooterConfig.footer}
          employee={employee || {}}
          showQRCode={currentTemplate.showQRCode}
          qrCodePosition={currentTemplate.qrCodePosition}
          getProfileUrl={getProfileUrl}
        />
      </div>
      
      {/* Dialogs */}
      <ProfileDialogs 
        templateDialogOpen={templateDialogOpen}
        setTemplateDialogOpen={setTemplateDialogOpen}
        headerFooterDialogOpen={headerFooterDialogOpen}
        setHeaderFooterDialogOpen={setHeaderFooterDialogOpen}
        printDialogOpen={printDialogOpen}
        setPrintDialogOpen={setPrintDialogOpen}
        templates={templates}
        selectedTemplate={selectedTemplate}
        onTemplateChange={handleTemplateChange}
        currentTemplate={currentTemplate}
        updateHeaderFooterConfig={updateHeaderFooterConfig}
        employee={employee || {}}
        onPrint={handlePrint}
      />
      
      {/* Print-specific styles */}
      <ProfilePrintStyles />
    </div>
  );
};

// Loading state component
const LoadingProfile: React.FC = () => (
  <div className="p-8">
    <div className="animate-pulse space-y-6">
      <div className="h-6 bg-gray-200 rounded w-1/4"></div>
      <div className="h-32 bg-gray-200 rounded"></div>
      <div className="h-16 bg-gray-200 rounded w-1/2"></div>
      <div className="h-64 bg-gray-200 rounded"></div>
    </div>
  </div>
);

export default EmployeeProfileContainer;
