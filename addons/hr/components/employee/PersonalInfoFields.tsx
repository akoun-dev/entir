
import React from 'react';
import { Input } from '../../../../src/components/ui/input';
import { Label } from '../../../../src/components/ui/label';

interface PersonalInfoFieldsProps {
  employee: {
    name: string;
    birth_date: string;
    address: string;
    work_phone: string;
    mobile_phone: string;
    work_email: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const PersonalInfoFields: React.FC<PersonalInfoFieldsProps> = ({ employee, onChange }) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Nom complet</Label>
          <Input
            id="name"
            name="name"
            value={employee.name}
            onChange={onChange}
            required
            placeholder="Nom et prénoms"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="birth_date">Date de naissance</Label>
          <Input
            id="birth_date"
            name="birth_date"
            type="date"
            value={employee.birth_date}
            onChange={onChange}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="address">Adresse</Label>
        <Input
          id="address"
          name="address"
          value={employee.address}
          onChange={onChange}
          placeholder="Adresse complète"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="work_phone">Téléphone professionnel</Label>
          <Input
            id="work_phone"
            name="work_phone"
            value={employee.work_phone}
            onChange={onChange}
            placeholder="+225 XX XX XX XX"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="mobile_phone">Téléphone personnel</Label>
          <Input
            id="mobile_phone"
            name="mobile_phone"
            value={employee.mobile_phone}
            onChange={onChange}
            placeholder="+225 XX XX XX XX"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="work_email">Email professionnel</Label>
        <Input
          id="work_email"
          name="work_email"
          type="email"
          value={employee.work_email}
          onChange={onChange}
          placeholder="email@example.com"
        />
      </div>
    </>
  );
};

export default PersonalInfoFields;
