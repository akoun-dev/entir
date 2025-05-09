
import React, { useState, useEffect } from 'react';
import { HrLayout } from '../components';
import {
  FileText,
  Plus,
  Search,
  Filter,
  X,
  ChevronDown,
  Clock,
  AlertCircle,
  CheckCircle2,
  Calendar
} from 'lucide-react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '../../../../src/components/ui/tabs';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '../../../../src/components/ui/breadcrumb';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../../../src/components/ui/card';
import { Button } from '../../../../src/components/ui/button';
import { Input } from '../../../../src/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../../../src/components/ui/dropdown-menu';
import { Badge } from '../../../../src/components/ui/badge';
import { Contract } from '../../models/types';
import { Skeleton } from '../../../../src/components/ui/skeleton';

/**
 * Vue de gestion des contrats
 */
const ContractsView: React.FC = () => {
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [currentTab, setCurrentTab] = useState('all');

  // Fonction pour obtenir les données des contrats
  useEffect(() => {
    const fetchContracts = async () => {
      setLoading(true);
      try {
        // Simulation de données (à remplacer par un appel API réel)
        const mockContracts: Contract[] = [
          {
            id: 1,
            name: 'CDI-001',
            employee_id: 1,
            employee_name: 'Kouamé Konan',
            contract_type: 'CDI',
            date_start: '2023-03-15',
            wage: 650000,
            state: 'running',
            notes: 'Contrat standard avec période d\'essai de 3 mois',
            created_at: '2023-03-10',
            updated_at: '2023-03-10'
          },
          {
            id: 2,
            name: 'CDD-021',
            employee_id: 2,
            employee_name: 'Aminata Touré',
            contract_type: 'CDD',
            date_start: '2022-10-01',
            date_end: '2023-10-01',
            wage: 450000,
            state: 'running',
            created_at: '2022-09-25',
            updated_at: '2022-09-25'
          },
          {
            id: 3,
            name: 'Stage-005',
            employee_id: 3,
            employee_name: 'Jean Konaté',
            contract_type: 'Stage',
            date_start: '2023-01-15',
            date_end: '2023-07-15',
            wage: 150000,
            state: 'running',
            created_at: '2023-01-10',
            updated_at: '2023-01-10'
          },
          {
            id: 4,
            name: 'CDI-002',
            employee_id: 4,
            employee_name: 'Marie Diallo',
            contract_type: 'CDI',
            date_start: '2022-05-01',
            wage: 550000,
            state: 'running',
            created_at: '2022-04-25',
            updated_at: '2022-04-25'
          },
          {
            id: 5,
            name: 'CDD-018',
            employee_id: 5,
            employee_name: 'Pascal Ouattara',
            contract_type: 'CDD',
            date_start: '2023-02-01',
            date_end: '2023-08-01',
            wage: 400000,
            state: 'expired',
            created_at: '2023-01-25',
            updated_at: '2023-08-02'
          }
        ];

        // Délai simulé pour montrer le chargement
        setTimeout(() => {
          setContracts(mockContracts);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Erreur lors du chargement des contrats', error);
        setLoading(false);
      }
    };

    fetchContracts();
  }, []);

  // Filtrer les contrats en fonction de la recherche et des filtres
  const filteredContracts = contracts.filter(contract => {
    // Recherche textuelle
    const matchesSearch = !searchQuery ||
      contract.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contract.employee_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contract.contract_type.toLowerCase().includes(searchQuery.toLowerCase());

    // Filtre par type de contrat
    const matchesFilter = !activeFilter || contract.contract_type === activeFilter;

    // Filtre par onglet (état)
    const matchesTab = currentTab === 'all' ||
      (currentTab === 'running' && contract.state === 'running') ||
      (currentTab === 'expired' && contract.state === 'expired') ||
      (currentTab === 'draft' && contract.state === 'draft');

    return matchesSearch && matchesFilter && matchesTab;
  });

  // Rendu du statut des contrats
  const renderStatus = (status: string) => {
    switch (status) {
      case 'running':
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 flex items-center gap-1">
            <CheckCircle2 className="h-3 w-3" />
            En cours
          </Badge>
        );
      case 'expired':
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 flex items-center gap-1">
            <Clock className="h-3 w-3" />
            Expiré
          </Badge>
        );
      case 'draft':
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 flex items-center gap-1">
            <FileText className="h-3 w-3" />
            Brouillon
          </Badge>
        );
      case 'cancelled':
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 flex items-center gap-1">
            <AlertCircle className="h-3 w-3" />
            Annulé
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <HrLayout>
      <div className="w-full">
        {/* En-tête avec fil d'Ariane */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mt-4">
            <div className="h-6 w-1.5 bg-amber-500 rounded-full"></div>
            <FileText className="h-6 w-6 text-amber-500" />
            <h1 className="text-2xl font-bold">Gestion des Contrats</h1>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-4 gap-4">
            <p className="text-muted-foreground">
              Gérez les contrats des employés, supervisez les dates d'expiration et effectuez des actions en conséquence
            </p>
          </div>
        </div>

        {/* Barre d'actions */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-2 mt-4">
          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:w-80">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher un contrat..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-2.5 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-1">
                  <Filter className="h-4 w-4" />
                  {activeFilter ? activeFilter : 'Filtres'}
                  <ChevronDown className="h-4 w-4 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                <DropdownMenuLabel>Type de contrat</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setActiveFilter(null)}>
                  Tous
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setActiveFilter('CDI')}>
                  CDI
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setActiveFilter('CDD')}>
                  CDD
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setActiveFilter('Stage')}>
                  Stage
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <Button className="bg-ivory-orange hover:bg-amber-600 flex items-center gap-2 w-full md:w-auto">
            <Plus className="h-4 w-4" />
            Nouveau contrat
          </Button>
        </div>

        {/* Onglets par statut */}
        <Tabs defaultValue="all" className="w-full" onValueChange={setCurrentTab}>
          <TabsList className="mb-6 bg-muted/50 p-1">
            <TabsTrigger value="all" className="flex items-center gap-2">
              Tous
            </TabsTrigger>
            <TabsTrigger value="running" className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" />
              En cours
            </TabsTrigger>
            <TabsTrigger value="draft" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Brouillons
            </TabsTrigger>
            <TabsTrigger value="expired" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Expirés
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-0">
            {renderContractsTable()}
          </TabsContent>
          <TabsContent value="running" className="mt-0">
            {renderContractsTable('running')}
          </TabsContent>
          <TabsContent value="draft" className="mt-0">
            {renderContractsTable('draft')}
          </TabsContent>
          <TabsContent value="expired" className="mt-0">
            {renderContractsTable('expired')}
          </TabsContent>
        </Tabs>
      </div>
    </HrLayout>
  );

  // Fonction pour afficher le tableau des contrats
  function renderContractsTable(statusFilter?: string) {
    if (loading) {
      return (
        <Card>
          <CardHeader className="pb-0">
            <div className="space-y-2">
              <CardTitle>
                <Skeleton className="h-6 w-40" />
              </CardTitle>
              <div className="text-sm text-muted-foreground">
                <Skeleton className="h-4 w-60" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="flex items-center justify-between border-b pb-4">
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-40" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                  <Skeleton className="h-9 w-24" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      );
    }

    // Filtre supplémentaire par statut si spécifié
    const filtered = statusFilter
      ? filteredContracts.filter(c => c.state === statusFilter)
      : filteredContracts;

    if (filtered.length === 0) {
      return (
        <Card className="border-dashed">
          <CardContent className="p-8 flex flex-col items-center justify-center text-center">
            <div className="rounded-full bg-muted p-3 mb-3">
              <FileText className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-2">Aucun contrat trouvé</h3>
            <p className="text-muted-foreground mb-6">
              {searchQuery || activeFilter
                ? "Aucun contrat ne correspond à votre recherche. Essayez de modifier vos critères."
                : "Vous n'avez pas encore créé de contrat. Commencez par en créer un nouveau."}
            </p>
            <Button className="bg-ivory-orange hover:bg-amber-600 flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Nouveau contrat
            </Button>
          </CardContent>
        </Card>
      );
    }

    return (
      <Card>
        <CardHeader className="pb-0">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Liste des contrats</CardTitle>
              <CardDescription>
                {filtered.length} contrat{filtered.length > 1 ? 's' : ''} trouvé{filtered.length > 1 ? 's' : ''}
              </CardDescription>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  Actions
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Exporter en CSV</DropdownMenuItem>
                <DropdownMenuItem>Exporter en PDF</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Tout sélectionner</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            {filtered.map((contract) => (
              <div key={contract.id} className="flex flex-col md:flex-row md:items-center justify-between border-b pb-4">
                <div className="mb-2 md:mb-0">
                  <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                    <div className="font-medium">{contract.name}</div>
                    <div className="text-muted-foreground text-sm">
                      {contract.employee_name}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-4 mt-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(contract.date_start).toLocaleDateString()}</span>
                      {contract.date_end && (
                        <>
                          <span>-</span>
                          <span>{new Date(contract.date_end).toLocaleDateString()}</span>
                        </>
                      )}
                    </div>
                    <div>
                      <Badge variant="secondary" className="font-normal">
                        {contract.contract_type}
                      </Badge>
                    </div>
                    <div>
                      {new Intl.NumberFormat('fr-CI', {
                        style: 'currency',
                        currency: 'XOF',
                        minimumFractionDigits: 0
                      }).format(contract.wage)}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-2 md:mt-0">
                  {renderStatus(contract.state)}
                  <Button
                    variant="outline"
                    size="sm"
                    className="ml-2"
                  >
                    Détails
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }
};

export default ContractsView;
