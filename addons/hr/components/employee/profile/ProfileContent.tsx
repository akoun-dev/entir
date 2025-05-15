
import React from 'react';
import { Card, CardContent } from '../../../../../src/components/ui/card';
import EditableField from '../EditableField';
import QRCodeComponent from '../QRCodeComponent';
import { ProfileContentProps } from '../../../hooks/employee-profile/types';

const ProfileContent: React.FC<ProfileContentProps> = ({
  employee,
  isEditing,
  updateField,
  currentTemplate,
  getProfileUrl
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left column */}
      <div className="lg:col-span-1">
        <Card className="print:shadow-none print:border-none">
          <CardContent className="p-6">
            <div className="flex flex-col items-center space-y-4">
              <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-amber-200">
                {employee.photo ? (
                  <img 
                    src={employee.photo} 
                    alt={employee.name} 
                    className="w-full h-full object-cover" 
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-amber-100 text-amber-800 text-3xl font-bold">
                    {employee.name?.charAt(0) || '?'}
                  </div>
                )}
              </div>
              
              <div className="text-center space-y-1">
                <EditableField
                  value={employee.name || ''}
                  isEditing={isEditing}
                  onChange={(value) => updateField('name', value)}
                  className="text-xl font-bold"
                />
                
                {currentTemplate.showJobTitle && (
                  <EditableField
                    value={employee.job_title || ''}
                    isEditing={isEditing}
                    onChange={(value) => updateField('job_title', value)}
                    className="text-muted-foreground"
                    placeholder="Poste non défini"
                  />
                )}
                
                {currentTemplate.showDepartmentInfo && (
                  <EditableField
                    value={employee.department_name || ''}
                    isEditing={isEditing}
                    onChange={(value) => updateField('department_name', value)}
                    className="text-sm text-muted-foreground"
                    placeholder="Département non défini"
                  />
                )}
              </div>
              
              {currentTemplate.showQRCode && currentTemplate.qrCodePosition === 'body' && (
                <div className="mt-4">
                  <QRCodeComponent 
                    value={getProfileUrl()}
                    title="Profil Employé"
                    downloadable={false}
                  />
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Right column */}
      <div className="lg:col-span-2 space-y-6">
        {/* Contact information */}
        <Card className="print:shadow-none print:border-none">
          <CardContent className="p-6 space-y-4">
            <h3 className="text-lg font-semibold mb-4">Informations de contact</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <EditableField
                label="Email professionnel"
                value={employee.work_email || ''}
                isEditing={isEditing}
                onChange={(value) => updateField('work_email', value)}
                type="email"
                placeholder="Email non défini"
              />
              
              <EditableField
                label="Téléphone professionnel"
                value={employee.work_phone || ''}
                isEditing={isEditing}
                onChange={(value) => updateField('work_phone', value)}
                type="tel"
                placeholder="Téléphone non défini"
              />
            </div>
          </CardContent>
        </Card>
        
        {/* Professional information */}
        <Card className="print:shadow-none print:border-none">
          <CardContent className="p-6 space-y-4">
            <h3 className="text-lg font-semibold mb-4">Informations professionnelles</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <EditableField
                label="Poste"
                value={employee.job_title || ''}
                isEditing={isEditing}
                onChange={(value) => updateField('job_title', value)}
                placeholder="Poste non défini"
              />
              
              <EditableField
                label="Département"
                value={employee.department_name || ''}
                isEditing={isEditing}
                onChange={(value) => updateField('department_name', value)}
                placeholder="Département non défini"
              />
              
              {currentTemplate.showManagerInfo && (
                <EditableField
                  label="Responsable"
                  value={employee.manager_name || ''}
                  isEditing={isEditing}
                  onChange={(value) => updateField('manager_name', value)}
                  placeholder="Responsable non défini"
                />
              )}
            </div>
          </CardContent>
        </Card>
        
        {/* Notes section */}
        <Card className="print:shadow-none print:border-none">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Notes</h3>
            
            <EditableField
              value={employee.notes || ''}
              isEditing={isEditing}
              onChange={(value) => updateField('notes', value)}
              type="textarea"
              placeholder="Ajoutez des notes ici..."
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfileContent;
