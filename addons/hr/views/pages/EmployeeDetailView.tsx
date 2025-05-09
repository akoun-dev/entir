import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Button } from '../../../../src/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../../../src/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../../src/components/ui/tabs';
import { HrDashboardMenu } from '../components';
import { ArrowLeft, Edit, Trash2, User, Mail, Phone, Building2, Calendar, FileText, Briefcase, Clock, Download } from 'lucide-react';
import { Separator } from '../../../../src/components/ui/separator';
import { Badge } from '../../../../src/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../../../../src/components/ui/avatar';

/**
 * Vue de détail d'un employé
 */
const EmployeeDetailView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
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
    avatar_url: ''
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
      avatar_url: ''
    };
    
    setEmployee(mockEmployee);
  }, [id]);
  
  // Formater une date
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(date);
  };
  
  // Obtenir les initiales pour l'avatar
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };
  
  return (
    <div className="container mx-auto px-4 py-6">
      {/* En-tête avec actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Fiche employé</h1>
          <p className="text-muted-foreground mt-1">Détails et informations de l'employé</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="flex items-center gap-2" onClick={() => navigate('/hr/employees')}>
            <ArrowLeft size={16} />
            Retour
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-2" onClick={() => navigate(`/hr/employees/edit/${id}`)}>
            <Edit size={16} />
            Modifier
          </Button>
          <Button variant="destructive" size="sm" className="flex items-center gap-2">
            <Trash2 size={16} />
            Supprimer
          </Button>
        </div>
      </div>
      
      {/* Menu de navigation */}
      {/* <HrDashboardMenu /> */}
      
      {/* En-tête de la fiche employé */}
      <div className="flex flex-col md:flex-row gap-6 items-start mt-8 mb-6">
        <Avatar className="h-24 w-24">
          {employee.avatar_url ? (
            <AvatarImage src={employee.avatar_url} alt={employee.name} />
          ) : (
            <AvatarFallback className="text-2xl">{getInitials(employee.name)}</AvatarFallback>
          )}
        </Avatar>
        
        <div className="flex-1">
          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
            <h2 className="text-2xl font-bold">{employee.name}</h2>
            <Badge variant={employee.is_active ? "default" : "secondary"}>
              {employee.is_active ? 'Actif' : 'Inactif'}
            </Badge>
          </div>
          
          <div className="text-lg text-muted-foreground mt-1">{employee.job_title}</div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-muted-foreground" />
              <span>{employee.department.name}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <a href={`mailto:${employee.work_email}`} className="text-primary hover:underline">
                {employee.work_email}
              </a>
            </div>
            
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <a href={`tel:${employee.work_phone}`} className="hover:underline">
                {employee.work_phone}
              </a>
            </div>
            
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>Embauché le {formatDate(employee.hire_date)}</span>
            </div>
          </div>
        </div>
      </div>
      
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Informations personnelles</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">Date de naissance</div>
                    <div>{formatDate(employee.birth_date)}</div>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <div className="text-sm font-medium text-muted-foreground">Adresse</div>
                  <div className="whitespace-pre-line">{employee.address}</div>
                </div>
                
                <Separator />
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">Téléphone professionnel</div>
                    <div>{employee.work_phone}</div>
                  </div>
                  
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">Téléphone mobile</div>
                    <div>{employee.mobile_phone}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Informations professionnelles</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">Département</div>
                    <div>{employee.department.name}</div>
                  </div>
                  
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">Type de contrat</div>
                    <div>{employee.employment_type.name}</div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">Date d'embauche</div>
                    <div>{formatDate(employee.hire_date)}</div>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <div className="text-sm font-medium text-muted-foreground">Responsable</div>
                  <div>{employee.manager.name}</div>
                </div>
              </CardContent>
            </Card>
            
            {employee.notes && (
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Notes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="whitespace-pre-line">{employee.notes}</div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
        
        {/* Onglet Contrats */}
        <TabsContent value="contracts">
          <Card>
            <CardHeader>
              <CardTitle>Historique des contrats</CardTitle>
              <CardDescription>Historique des contrats et changements de poste</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {contracts.map((contract, index) => (
                  <div key={contract.id} className="relative pl-6 pb-6 border-l border-border">
                    {/* Indicateur de chronologie */}
                    <div className="absolute -left-1.5 top-0 h-3 w-3 rounded-full bg-primary"></div>
                    
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                      <div>
                        <h3 className="font-medium">{contract.job_title}</h3>
                        <p className="text-sm text-muted-foreground">{contract.department}</p>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{contract.type}</Badge>
                        <span className="text-sm">
                          {formatDate(contract.start_date)} - {contract.end_date ? formatDate(contract.end_date) : 'Présent'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Onglet Documents */}
        <TabsContent value="documents">
          <Card>
            <CardHeader className="flex flex-col md:flex-row md:items-center justify-between space-y-2 md:space-y-0">
              <div>
                <CardTitle>Documents</CardTitle>
                <CardDescription>Documents liés à l'employé</CardDescription>
              </div>
              <Button size="sm" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Ajouter un document
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {documents.map(doc => (
                  <div key={doc.id} className="flex items-center justify-between p-3 border rounded-md hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-primary" />
                      <div>
                        <div className="font-medium">{doc.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {doc.type} • {formatDate(doc.date)} • {doc.size}
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EmployeeDetailView;
