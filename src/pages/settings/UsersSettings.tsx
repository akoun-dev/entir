import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Switch } from '../../components/ui/switch';
import { Badge } from '../../components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Label } from '../../components/ui/label';
import { Users, Search, Plus, Pencil, Trash2, UserPlus, Mail, Lock, Shield } from 'lucide-react';

// Types pour les utilisateurs
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  lastLogin?: string;
  groups: string[];
}

/**
 * Page des paramètres des utilisateurs
 * Permet de gérer les utilisateurs de l'application
 */
const UsersSettings: React.FC = () => {
  // État pour les utilisateurs
  const [users, setUsers] = useState<User[]>([
    { 
      id: '1', 
      name: 'Admin Système', 
      email: 'admin@example.com', 
      role: 'Administrateur', 
      status: 'active',
      lastLogin: '2023-06-15 14:30',
      groups: ['Administrateurs']
    },
    { 
      id: '2', 
      name: 'Jean Dupont', 
      email: 'jean.dupont@example.com', 
      role: 'Gestionnaire', 
      status: 'active',
      lastLogin: '2023-06-14 09:15',
      groups: ['Gestionnaires', 'Ventes']
    },
    { 
      id: '3', 
      name: 'Marie Martin', 
      email: 'marie.martin@example.com', 
      role: 'Utilisateur', 
      status: 'active',
      lastLogin: '2023-06-13 16:45',
      groups: ['Comptabilité']
    },
    { 
      id: '4', 
      name: 'Pierre Durand', 
      email: 'pierre.durand@example.com', 
      role: 'Utilisateur', 
      status: 'inactive',
      groups: ['Ressources Humaines']
    },
    { 
      id: '5', 
      name: 'Sophie Leroy', 
      email: 'sophie.leroy@example.com', 
      role: 'Gestionnaire', 
      status: 'active',
      lastLogin: '2023-06-10 11:20',
      groups: ['Gestionnaires', 'Marketing']
    }
  ]);

  // État pour la recherche
  const [searchTerm, setSearchTerm] = useState('');

  // État pour l'utilisateur en cours d'édition
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Filtrer les utilisateurs en fonction du terme de recherche
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Gérer l'ajout ou la modification d'un utilisateur
  const handleSaveUser = (user: User) => {
    if (editingUser) {
      // Mise à jour d'un utilisateur existant
      setUsers(users.map(u => u.id === user.id ? user : u));
    } else {
      // Ajout d'un nouvel utilisateur
      setUsers([...users, { ...user, id: String(users.length + 1) }]);
    }
    setIsDialogOpen(false);
    setEditingUser(null);
  };

  // Gérer la suppression d'un utilisateur
  const handleDeleteUser = (id: string) => {
    setUsers(users.filter(u => u.id !== id));
  };

  // Gérer l'activation/désactivation d'un utilisateur
  const handleToggleUserStatus = (id: string) => {
    setUsers(users.map(user => 
      user.id === id 
        ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' } 
        : user
    ));
  };

  return (
    <div className="p-6">
      {/* En-tête */}
      <div className="flex items-center gap-3 mb-6">
        <Users className="h-8 w-8 text-ivory-orange" />
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Utilisateurs</h1>
          <p className="text-muted-foreground mt-1">Gérez les utilisateurs de votre application</p>
        </div>
      </div>

      {/* Carte principale */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Liste des utilisateurs</CardTitle>
            <CardDescription>Gérez les comptes utilisateurs et leurs permissions</CardDescription>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button 
                className="bg-ivory-orange hover:bg-ivory-orange/90"
                onClick={() => setEditingUser(null)}
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Ajouter un utilisateur
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingUser ? 'Modifier l\'utilisateur' : 'Ajouter un utilisateur'}</DialogTitle>
                <DialogDescription>
                  {editingUser 
                    ? 'Modifiez les informations de l\'utilisateur' 
                    : 'Remplissez les informations pour ajouter un nouvel utilisateur'}
                </DialogDescription>
              </DialogHeader>
              <UserForm 
                user={editingUser || { 
                  id: '', 
                  name: '', 
                  email: '', 
                  role: 'Utilisateur', 
                  status: 'active',
                  groups: []
                }}
                onSave={handleSaveUser}
                onCancel={() => setIsDialogOpen(false)}
              />
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          {/* Barre de recherche */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher un utilisateur..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Tableau des utilisateurs */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Rôle</TableHead>
                  <TableHead>Groupes</TableHead>
                  <TableHead>Dernière connexion</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Badge variant={user.role === 'Administrateur' ? 'destructive' : user.role === 'Gestionnaire' ? 'default' : 'secondary'}>
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {user.groups.map((group, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {group}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>{user.lastLogin || 'Jamais connecté'}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Switch 
                          checked={user.status === 'active'}
                          onCheckedChange={() => handleToggleUserStatus(user.id)}
                        />
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          user.status === 'active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {user.status === 'active' ? 'Actif' : 'Inactif'}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => {
                            setEditingUser(user);
                            setIsDialogOpen(true);
                          }}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleDeleteUser(user.id)}
                          disabled={user.role === 'Administrateur'}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Composant de formulaire pour ajouter/modifier un utilisateur
interface UserFormProps {
  user: User;
  onSave: (user: User) => void;
  onCancel: () => void;
}

const UserForm: React.FC<UserFormProps> = ({ user, onSave, onCancel }) => {
  const [formData, setFormData] = useState<User>(user);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleRoleChange = (value: string) => {
    setFormData({
      ...formData,
      role: value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">Nom</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="col-span-3"
            required
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="email" className="text-right">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="col-span-3"
            required
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="role" className="text-right">Rôle</Label>
          <Select
            value={formData.role}
            onValueChange={handleRoleChange}
          >
            <SelectTrigger className="col-span-3">
              <SelectValue placeholder="Sélectionnez un rôle" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Administrateur">Administrateur</SelectItem>
              <SelectItem value="Gestionnaire">Gestionnaire</SelectItem>
              <SelectItem value="Utilisateur">Utilisateur</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel}>
          Annuler
        </Button>
        <Button type="submit" className="bg-ivory-orange hover:bg-ivory-orange/90">
          Enregistrer
        </Button>
      </DialogFooter>
    </form>
  );
};

export default UsersSettings;
