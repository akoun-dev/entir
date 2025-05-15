
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../../src/components/ui/tabs';
import { User, Briefcase, FileText } from 'lucide-react';
import { useToast } from '../../../../src/hooks/use-toast';
import {
  EmployeeDetailHeader,
  EmployeeProfileHeader,
  EmployeeGeneralInfo,
  EmployeeContractsTab,
  EmployeeDocumentsTab
} from '../components/employee';

/**
 * Vue de détail d'un employé
 */
const EmployeeDetailView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();

  // État pour stocker les données de l'employé
  const [employee, setEmployee] = useState({
    id: '',
    name: '',
    job_title: '',
    department: { id: '', name: '' },
    work_email: '',
    work_phone: '',
    mobile_phone: '',
    address: '',
    birth_date: '',
    hire_date: '',
    employment_type: { id: '', name: '' },
    manager: { id: '', name: '' },
    notes: '',
    is_active: true,
    photo: '' // Photo field
  });

  // Données simulées pour l'historique des contrats
  const contracts = [
    { id: '1', type: 'CDI', start_date: '2020-01-01', end_date: null, department: 'Informatique', job_title: 'Développeur Frontend' },
    { id: '2', type: 'CDD', start_date: '2019-01-01', end_date: '2019-12-31', department: 'Informatique', job_title: 'Développeur Junior' }
  ];

  // Données simulées pour les documents
  const documents = [
    { id: '1', name: 'Contrat de travail', date: '2020-01-01', type: 'Contrat', size: '1.2 MB' },
    { id: '2', name: 'Avenant au contrat', date: '2021-06-15', type: 'Avenant', size: '0.8 MB' },
    { id: '3', name: 'Fiche de poste', date: '2020-01-05', type: 'Fiche', size: '0.5 MB' }
  ];

  // Charger les données de l'employé
  useEffect(() => {
    // Simuler le chargement des données depuis une API
    const mockEmployee = {
      id: id || '',
      name: 'Jean Dupont',
      job_title: 'Développeur Frontend',
      department: { id: '3', name: 'Informatique' },
      work_email: 'jean.dupont@example.com',
      work_phone: '01 23 45 67 89',
      mobile_phone: '06 12 34 56 78',
      address: '123 Rue de la Paix, 75001 Paris',
      birth_date: '1990-01-01',
      hire_date: '2020-01-01',
      employment_type: { id: 'cdi', name: 'CDI' },
      manager: { id: '2', name: 'Marie Martin' },
      notes: 'Employé très compétent et motivé.',
      is_active: true,
      photo: 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=250&q=80'
    };

    setEmployee(mockEmployee);
  }, [id]);

  // Gérer le changement de photo
  const handlePhotoChange = (photoData: string) => {
    setEmployee(prev => ({
      ...prev,
      photo: photoData
    }));

    toast({
      title: "Photo mise à jour",
      description: "La photo de profil a été mise à jour avec succès"
    });
  };

  // Gérer la suppression d'un employé
  const handleDelete = () => {
    // Logique de suppression à implémenter
    console.log('Suppression de l\'employé', id);
    toast({
      title: "Employé supprimé",
      description: "L'employé a été supprimé avec succès"
    });
  };

  return (
    <div className="w-full">
      {/* En-tête avec actions */}
      <EmployeeDetailHeader id={id || ''} onDelete={handleDelete} />

      {/* En-tête de la fiche employé */}
      <EmployeeProfileHeader
        employee={employee}
        onPhotoChange={handlePhotoChange}
      />

      {/* Onglets d'information */}
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="mb-6 grid grid-cols-3 md:w-fit">
          <TabsTrigger value="general" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Informations générales
          </TabsTrigger>
          <TabsTrigger value="contracts" className="flex items-center gap-2">
            <Briefcase className="h-4 w-4" />
            Contrats
          </TabsTrigger>
          <TabsTrigger value="documents" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Documents
          </TabsTrigger>
        </TabsList>

        {/* Onglet Informations générales */}
        <TabsContent value="general">
          <EmployeeGeneralInfo employee={employee} />
        </TabsContent>

        {/* Onglet Contrats */}
        <TabsContent value="contracts">
          <EmployeeContractsTab contracts={contracts} />
        </TabsContent>

        {/* Onglet Documents */}
        <TabsContent value="documents">
          <EmployeeDocumentsTab documents={documents} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EmployeeDetailView;
