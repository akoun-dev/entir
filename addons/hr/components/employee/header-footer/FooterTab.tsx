
import React from 'react';
import { Label } from '../../../../../src/components/ui/label';
import { Textarea } from '../../../../../src/components/ui/textarea';
import { FooterTabProps } from '../../../hooks/employee-profile/types';

const FooterTab: React.FC<FooterTabProps> = ({ footerConfig, onChange }) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="footer-text">Texte de pied de page</Label>
        <Textarea
          id="footer-text"
          value={footerConfig.text}
          onChange={(e) => onChange({
            ...footerConfig,
            text: e.target.value
          })}
          placeholder="Texte à afficher dans le pied de page"
          rows={3}
        />
      </div>
      
      <div className="flex items-center gap-6 mt-2">
        <Label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={footerConfig.showContactInfo}
            onChange={(e) => onChange({
              ...footerConfig,
              showContactInfo: e.target.checked
            })}
            className="accent-primary h-4 w-4"
          />
          <span className="text-sm">Afficher les contacts</span>
        </Label>
        
        <Label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={footerConfig.showAddress}
            onChange={(e) => onChange({
              ...footerConfig,
              showAddress: e.target.checked
            })}
            className="accent-primary h-4 w-4"
          />
          <span className="text-sm">Afficher l'adresse</span>
        </Label>
      </div>
    </div>
  );
};

export default FooterTab;
