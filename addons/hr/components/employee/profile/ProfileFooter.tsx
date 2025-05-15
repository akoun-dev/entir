
import React from 'react';
import QRCodeComponent from '../QRCodeComponent';
import { ProfileFooterProps } from '../../../hooks/employee-profile/types';

const ProfileFooter: React.FC<ProfileFooterProps> = ({
  footerConfig,
  employee,
  showQRCode,
  qrCodePosition,
  getProfileUrl
}) => {
  if (!footerConfig.text && !footerConfig.showContactInfo && !footerConfig.showAddress) {
    return null;
  }

  return (
    <div className="border-t mt-6 pt-4 print:mt-8 print:pt-6">
      <div className="flex justify-between items-end">
        <div className="text-sm text-muted-foreground">
          {footerConfig.text}
        </div>
        
        <div className="text-right text-xs text-muted-foreground">
          {footerConfig.showContactInfo && (
            <div>
              {employee.work_email && <div>{employee.work_email}</div>}
              {employee.work_phone && <div>{employee.work_phone}</div>}
            </div>
          )}
          
          {footerConfig.showAddress && (
            <div className="mt-1">
              123 Rue Principale, Abidjan, Côte d'Ivoire
            </div>
          )}
        </div>
        
        {showQRCode && qrCodePosition === 'footer' && (
          <QRCodeComponent 
            value={getProfileUrl()}
            size={60}
            downloadable={false}
          />
        )}
      </div>
    </div>
  );
};

export default ProfileFooter;
