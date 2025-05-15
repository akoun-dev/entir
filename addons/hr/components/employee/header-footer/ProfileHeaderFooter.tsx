
import React, { useRef } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../../../../src/components/ui/tabs';
import { Button } from '../../../../../src/components/ui/button';
import { useToast } from '../../../../../src/hooks/use-toast';
import HeaderTab from './HeaderTab';
import FooterTab from './FooterTab';
import { ProfileHeaderFooterProps } from '../../../hooks/employee-profile/types';

const ProfileHeaderFooter: React.FC<ProfileHeaderFooterProps> = ({
  config,
  onChange,
  onSave
}) => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    
    const file = e.target.files[0];
    const reader = new FileReader();
    
    reader.onload = (event) => {
      if (event.target?.result) {
        onChange({
          ...config,
          header: {
            ...config.header,
            logo: event.target.result.toString(),
          }
        });
        
        toast({
          title: "Logo mis à jour",
          description: "Le logo a été mis à jour avec succès"
        });
      }
    };
    
    reader.readAsDataURL(file);
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleHeaderChange = (headerConfig: typeof config.header) => {
    onChange({
      ...config,
      header: headerConfig
    });
  };

  const handleFooterChange = (footerConfig: typeof config.footer) => {
    onChange({
      ...config,
      footer: footerConfig
    });
  };

  const handleSave = () => {
    onSave?.();
    toast({
      title: "Configuration sauvegardée",
      description: "Les paramètres d'en-tête et de pied de page ont été sauvegardés"
    });
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="header">
        <TabsList>
          <TabsTrigger value="header">En-tête</TabsTrigger>
          <TabsTrigger value="footer">Pied de page</TabsTrigger>
        </TabsList>
        
        <TabsContent value="header" className="space-y-4 pt-4">
          <HeaderTab 
            headerConfig={config.header}
            onChange={handleHeaderChange}
            fileInputRef={fileInputRef}
            triggerFileUpload={triggerFileUpload}
          />
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleLogoUpload}
          />
        </TabsContent>
        
        <TabsContent value="footer" className="space-y-4 pt-4">
          <FooterTab
            footerConfig={config.footer}
            onChange={handleFooterChange}
          />
        </TabsContent>
      </Tabs>
      
      {onSave && (
        <div className="flex justify-end">
          <Button onClick={handleSave}>
            Enregistrer la configuration
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProfileHeaderFooter;
