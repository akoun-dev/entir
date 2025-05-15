
import React from 'react';
import { Label } from '../../../../../src/components/ui/label';
import { Textarea } from '../../../../../src/components/ui/textarea';
import { Button } from '../../../../../src/components/ui/button';
import { Input } from '../../../../../src/components/ui/input';
import { Image } from 'lucide-react';
import { HeaderTabProps } from '../../../hooks/employee-profile/types';

const HeaderTab: React.FC<HeaderTabProps> = ({
  headerConfig,
  onChange,
  fileInputRef,
  triggerFileUpload
}) => {
  return (
    <div className="flex items-start gap-4">
      {headerConfig.logo && headerConfig.showLogo && (
        <div className="w-24 h-24 border rounded flex items-center justify-center overflow-hidden">
          <img 
            src={headerConfig.logo} 
            alt="Logo" 
            className="max-w-full max-h-full object-contain"
          />
        </div>
      )}
      
      <div className="flex-1 space-y-2">
        <Label htmlFor="header-text">Texte d'en-tête</Label>
        <Textarea
          id="header-text"
          value={headerConfig.text}
          onChange={(e) => onChange({
            ...headerConfig,
            text: e.target.value
          })}
          placeholder="Texte à afficher dans l'en-tête"
          rows={3}
        />
        
        <div className="flex items-center gap-2 mt-2">
          <Button 
            type="button" 
            variant="outline" 
            size="sm"
            onClick={triggerFileUpload}
          >
            <Image className="h-4 w-4 mr-1" />
            {headerConfig.logo ? 'Changer le logo' : 'Ajouter un logo'}
          </Button>
          <Input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
          />
          <Label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={headerConfig.showLogo}
              onChange={(e) => onChange({
                ...headerConfig,
                showLogo: e.target.checked
              })}
              className="accent-primary h-4 w-4"
            />
            <span className="text-sm">Afficher le logo</span>
          </Label>
        </div>
      </div>
    </div>
  );
};

export default HeaderTab;
