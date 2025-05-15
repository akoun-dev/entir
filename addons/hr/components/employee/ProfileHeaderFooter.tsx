
import React from 'react';
import { Input } from '../../../../src/components/ui/input';
import { Label } from '../../../../src/components/ui/label';
import { Button } from '../../../../src/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../../../src/components/ui/tabs';
import { Textarea } from '../../../../src/components/ui/textarea';
import { useToast } from '../../../../src/hooks/use-toast';
import { Image } from 'lucide-react';

export interface HeaderFooterConfig {
  header: {
    text: string;
    logo?: string;
    showLogo: boolean;
  };
  footer: {
    text: string;
    showContactInfo: boolean;
    showAddress: boolean;
  };
}

interface ProfileHeaderFooterProps {
  config: HeaderFooterConfig;
  onChange: (config: HeaderFooterConfig) => void;
  onSave?: () => void;
}

const ProfileHeaderFooter: React.FC<ProfileHeaderFooterProps> = ({
  config,
  onChange,
  onSave
}) => {
  const { toast } = useToast();
  const fileInputRef = React.useRef<HTMLInputElement>(null);

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
          <div className="flex items-start gap-4">
            {config.header.logo && config.header.showLogo && (
              <div className="w-24 h-24 border rounded flex items-center justify-center overflow-hidden">
                <img 
                  src={config.header.logo} 
                  alt="Logo" 
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            )}
            
            <div className="flex-1 space-y-2">
              <Label htmlFor="header-text">Texte d'en-tête</Label>
              <Textarea
                id="header-text"
                value={config.header.text}
                onChange={(e) => onChange({
                  ...config,
                  header: {
                    ...config.header,
                    text: e.target.value
                  }
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
                  {config.header.logo ? 'Changer le logo' : 'Ajouter un logo'}
                </Button>
                <Input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleLogoUpload}
                />
                <Label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={config.header.showLogo}
                    onChange={(e) => onChange({
                      ...config,
                      header: {
                        ...config.header,
                        showLogo: e.target.checked
                      }
                    })}
                    className="accent-primary h-4 w-4"
                  />
                  <span className="text-sm">Afficher le logo</span>
                </Label>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="footer" className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="footer-text">Texte de pied de page</Label>
            <Textarea
              id="footer-text"
              value={config.footer.text}
              onChange={(e) => onChange({
                ...config,
                footer: {
                  ...config.footer,
                  text: e.target.value
                }
              })}
              placeholder="Texte à afficher dans le pied de page"
              rows={3}
            />
          </div>
          
          <div className="flex items-center gap-6 mt-2">
            <Label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={config.footer.showContactInfo}
                onChange={(e) => onChange({
                  ...config,
                  footer: {
                    ...config.footer,
                    showContactInfo: e.target.checked
                  }
                })}
                className="accent-primary h-4 w-4"
              />
              <span className="text-sm">Afficher les contacts</span>
            </Label>
            
            <Label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={config.footer.showAddress}
                onChange={(e) => onChange({
                  ...config,
                  footer: {
                    ...config.footer,
                    showAddress: e.target.checked
                  }
                })}
                className="accent-primary h-4 w-4"
              />
              <span className="text-sm">Afficher l'adresse</span>
            </Label>
          </div>
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
