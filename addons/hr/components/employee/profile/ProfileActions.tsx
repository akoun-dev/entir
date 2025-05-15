
import React from 'react';
import { Button } from '../../../../../src/components/ui/button';
import { Edit, Save, X, Printer, FileText, FileIcon } from 'lucide-react';
import { ProfileActionsProps } from '../../../hooks/employee-profile/types';

const ProfileActions: React.FC<ProfileActionsProps> = ({
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
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        onClick={onTemplateClick}
      >
        <FileText className="h-4 w-4 mr-2" />
        Templates
      </Button>
      
      <Button
        variant="outline"
        onClick={onPrintClick}
      >
        <Printer className="h-4 w-4 mr-2" />
        Imprimer
      </Button>

      <Button
        variant="outline" 
        onClick={onPdfExport}
        disabled={isPdfGenerating}
      >
        <FileIcon className="h-4 w-4 mr-2" />
        {isPdfGenerating ? 'Génération...' : 'Exporter PDF'}
      </Button>
      
      {!isEditing ? (
        <Button
          onClick={onEditClick}
          className="bg-amber-500 hover:bg-amber-600"
        >
          <Edit className="h-4 w-4 mr-2" />
          Modifier
        </Button>
      ) : (
        <>
          <Button
            onClick={onCancelClick}
            variant="outline"
          >
            <X className="h-4 w-4 mr-2" />
            Annuler
          </Button>
          <Button
            onClick={onSaveClick}
            disabled={saving}
            className="bg-amber-500 hover:bg-amber-600"
          >
            <Save className="h-4 w-4 mr-2" />
            {saving ? 'Enregistrement...' : 'Enregistrer'}
          </Button>
        </>
      )}
    </div>
  );
};

export default ProfileActions;
