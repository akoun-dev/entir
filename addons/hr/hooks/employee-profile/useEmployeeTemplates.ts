
import { useState, useEffect } from 'react';
import { useToast } from '../../../../src/hooks/use-toast';
import { ProfileTemplate, UseEmployeeTemplatesReturn } from './types';

export const useEmployeeTemplates = (): UseEmployeeTemplatesReturn => {
  const { toast } = useToast();
  const [selectedTemplate, setSelectedTemplate] = useState<string>("standard");
  const [templates, setTemplates] = useState<ProfileTemplate[]>([
    {
      id: "standard",
      name: "Standard",
      description: "Affichage standard avec toutes les informations",
      headerFooterConfig: {
        header: {
          text: "Fiche Employé",
          showLogo: true,
          logo: undefined,
        },
        footer: {
          text: "© 2023 Votre Entreprise. Confidentiel.",
          showContactInfo: true,
          showAddress: true,
        }
      },
      showQRCode: true,
      qrCodePosition: 'body',
      showDepartmentInfo: true,
      showManagerInfo: true,
      showJobTitle: true,
    },
    {
      id: "minimal",
      name: "Minimaliste",
      description: "Version simplifiée avec informations essentielles",
      headerFooterConfig: {
        header: {
          text: "",
          showLogo: false,
        },
        footer: {
          text: "Document interne",
          showContactInfo: false,
          showAddress: false,
        }
      },
      showQRCode: false,
      qrCodePosition: 'body',
      showDepartmentInfo: false,
      showManagerInfo: false,
      showJobTitle: true,
    },
    {
      id: "print",
      name: "Version imprimable",
      description: "Optimisé pour l'impression",
      headerFooterConfig: {
        header: {
          text: "DOSSIER PERSONNEL",
          showLogo: true,
        },
        footer: {
          text: "CONFIDENTIEL - Usage interne uniquement",
          showContactInfo: true,
          showAddress: true,
        }
      },
      showQRCode: true,
      qrCodePosition: 'header',
      showDepartmentInfo: true,
      showManagerInfo: true,
      showJobTitle: true,
    },
    {
      id: "badge",
      name: "Badge",
      description: "Format badge employé",
      headerFooterConfig: {
        header: {
          text: "BADGE EMPLOYÉ",
          showLogo: true,
        },
        footer: {
          text: "À retourner à la sécurité en cas de perte",
          showContactInfo: false,
          showAddress: false,
        }
      },
      showQRCode: true,
      qrCodePosition: 'footer',
      showDepartmentInfo: true,
      showManagerInfo: false,
      showJobTitle: true,
    }
  ]);

  // Load templates from localStorage if available
  useEffect(() => {
    const savedTemplates = localStorage.getItem('employee-templates');
    if (savedTemplates) {
      try {
        const parsedTemplates = JSON.parse(savedTemplates);
        setTemplates(parsedTemplates);
      } catch (error) {
        console.error("Error parsing saved templates:", error);
      }
    }
  }, []);

  // Function to handle template change
  const handleTemplateChange = (templateId: string) => {
    setSelectedTemplate(templateId);
    toast({
      title: "Template modifié",
      description: `Le template "${templates.find(t => t.id === templateId)?.name}" a été appliqué`
    });
  };

  // Function to update header/footer config
  const updateHeaderFooterConfig = (templateId: string, config: ProfileTemplate['headerFooterConfig']) => {
    const updatedTemplates = templates.map(template => 
      template.id === templateId 
        ? { ...template, headerFooterConfig: config } 
        : template
    );
    setTemplates(updatedTemplates);
    
    // Persist to localStorage for demo purposes
    localStorage.setItem('employee-templates', JSON.stringify(updatedTemplates));
  };
  
  // Function to save a new template
  const saveNewTemplate = (template: ProfileTemplate) => {
    const updatedTemplates = [...templates, template];
    setTemplates(updatedTemplates);
    setSelectedTemplate(template.id);
    
    // Persist to localStorage for demo purposes
    localStorage.setItem('employee-templates', JSON.stringify(updatedTemplates));
    
    toast({
      title: "Template créé",
      description: `Le template "${template.name}" a été créé et sélectionné`
    });
    
    return template;
  };

  // Get current template
  const getCurrentTemplate = () => {
    return templates.find(t => t.id === selectedTemplate) || templates[0];
  };

  return {
    templates,
    selectedTemplate,
    handleTemplateChange,
    updateHeaderFooterConfig,
    saveNewTemplate,
    getCurrentTemplate
  };
};
