
import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../../../../../src/components/ui/avatar';
import { Badge } from '../../../../../src/components/ui/badge';
import { Building2, Mail, Phone, Calendar, Camera } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../../../../src/components/ui/dialog';
import { Input } from '../../../../../src/components/ui/input';
import { useToast } from '../../../../../src/hooks/use-toast';

interface EmployeeProfileHeaderProps {
  employee: {
    name: string;
    job_title?: string;
    department: { id: string; name: string };
    work_email?: string;
    work_phone?: string;
    hire_date?: string;
    is_active: boolean;
    photo?: string;
  };
  onPhotoChange: (photoData: string) => void;
}

const EmployeeProfileHeader: React.FC<EmployeeProfileHeaderProps> = ({ 
  employee,
  onPhotoChange
}) => {
  const [isPhotoDialogOpen, setIsPhotoDialogOpen] = useState(false);
  const { toast } = useToast();
  
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

  // Gérer le changement de photo
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "Erreur",
          description: "La taille de l'image ne doit pas dépasser 5 Mo",
          variant: "destructive"
        });
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          onPhotoChange(event.target.result.toString());
          toast({
            title: "Photo mise à jour",
            description: "La photo de profil a été mise à jour avec succès"
          });
          setIsPhotoDialogOpen(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 items-start mt-8 mb-6">
      <div className="relative group">
        <Dialog open={isPhotoDialogOpen} onOpenChange={setIsPhotoDialogOpen}>
          <DialogTrigger asChild>
            <div className="cursor-pointer relative">
              <Avatar className="h-24 w-24">
                {employee.photo ? (
                  <AvatarImage src={employee.photo} alt={employee.name} />
                ) : (
                  <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                    {getInitials(employee.name)}
                  </AvatarFallback>
                )}
              </Avatar>
              <div className="absolute inset-0 bg-black bg-opacity-40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera className="h-8 w-8 text-white" />
              </div>
            </div>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Modifier la photo</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col items-center gap-6 py-4">
              <Avatar className="h-32 w-32">
                {employee.photo ? (
                  <AvatarImage src={employee.photo} alt={employee.name} />
                ) : (
                  <AvatarFallback className="text-4xl">{getInitials(employee.name)}</AvatarFallback>
                )}
              </Avatar>
              <div className="space-y-4 w-full">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                />
                <p className="text-xs text-muted-foreground">
                  Formats acceptés : JPG, PNG. Taille maximale : 5 Mo
                </p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      
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
            <span>{employee.department?.name}</span>
          </div>
          
          {employee.work_email && (
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <a href={`mailto:${employee.work_email}`} className="text-primary hover:underline">
                {employee.work_email}
              </a>
            </div>
          )}
          
          {employee.work_phone && (
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <a href={`tel:${employee.work_phone}`} className="hover:underline">
                {employee.work_phone}
              </a>
            </div>
          )}
          
          {employee.hire_date && (
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>Embauché le {formatDate(employee.hire_date)}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfileHeader;
