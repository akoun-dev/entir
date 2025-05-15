
import React, { useRef } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../../../../src/components/ui/avatar';
import { Button } from '../../../../src/components/ui/button';
import { Input } from '../../../../src/components/ui/input';
import { Camera } from 'lucide-react';
import { useToast } from '../../../../src/hooks/use-toast';

interface PhotoUploadProps {
  name: string;
  photo?: string;
  onPhotoChange: (value: string) => void;
}

const PhotoUpload: React.FC<PhotoUploadProps> = ({ name, photo, onPhotoChange }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // Function to get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  // Handle click on avatar to trigger file input
  const handleAvatarClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Handle photo upload
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
      
      // Check file type
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Erreur",
          description: "Seuls les fichiers image sont acceptés",
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
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col items-center mb-6">
      <div 
        className="relative cursor-pointer group" 
        onClick={handleAvatarClick}
      >
        <Avatar className="h-24 w-24 mb-2">
          {photo ? (
            <AvatarImage src={photo} alt={name} />
          ) : (
            <AvatarFallback className="text-lg">{getInitials(name)}</AvatarFallback>
          )}
        </Avatar>
        <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <Camera className="h-8 w-8 text-white" />
        </div>
      </div>
      <Input 
        ref={fileInputRef}
        type="file" 
        accept="image/*"
        onChange={handlePhotoChange}
        className="hidden"
      />
      <Button 
        variant="outline" 
        size="sm" 
        className="mt-2"
        onClick={handleAvatarClick}
      >
        Changer la photo
      </Button>
    </div>
  );
};

export default PhotoUpload;
