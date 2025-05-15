
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../../src/components/ui/card';
import { User } from 'lucide-react';
import PhotoUpload from './PhotoUpload';
import PersonalInfoFields from './PersonalInfoFields';

interface PersonalInfoFormProps {
  employee: {
    name: string;
    birth_date: string;
    address: string;
    work_phone: string;
    mobile_phone: string;
    work_email: string;
    photo?: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { name: string; value: string }) => void;
}

const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({ employee, onChange }) => {
  // Handle photo change
  const handlePhotoChange = (photoData: string) => {
    onChange({
      name: 'photo',
      value: photoData
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          Informations personnelles
        </CardTitle>
        <CardDescription>
          Informations de base de l'employé
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Photo Upload Component */}
        <PhotoUpload 
          name={employee.name} 
          photo={employee.photo} 
          onPhotoChange={handlePhotoChange} 
        />

        {/* Personal Information Fields */}
        <PersonalInfoFields 
          employee={employee} 
          onChange={onChange} 
        />
      </CardContent>
    </Card>
  );
};

export default PersonalInfoForm;
