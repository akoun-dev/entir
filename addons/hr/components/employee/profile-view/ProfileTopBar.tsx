
import React from 'react';
import { Button } from '../../../../../src/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import ProfileActions from '../profile/ProfileActions';
import { ProfileTopBarProps } from '../../../hooks/employee-profile/types';

const ProfileTopBar: React.FC<ProfileTopBarProps> = ({
  employeeName,
  isEditing,
  saving,
  isPdfGenerating,
  onEditClick,
  onCancelClick,
  onSaveClick,
  onTemplateClick,
  onPrintClick,
  onPdfExport
}) => {
  return (
    <div className="flex justify-between items-center mb-6 print:hidden">
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => window.history.back()}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour
        </Button>
        <div className="text-2xl font-semibold">Profil de {employeeName}</div>
      </div>
      
      <ProfileActions 
        isEditing={isEditing}
        saving={saving}
        isPdfGenerating={isPdfGenerating}
        onEditClick={onEditClick}
        onCancelClick={onCancelClick}
        onSaveClick={onSaveClick}
        onTemplateClick={onTemplateClick}
        onPrintClick={onPrintClick}
        onPdfExport={onPdfExport}
      />
    </div>
  );
};

export default ProfileTopBar;
