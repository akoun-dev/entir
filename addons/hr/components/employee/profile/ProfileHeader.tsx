
import React from 'react';
import { Button } from '../../../../../src/components/ui/button';
import { Settings } from 'lucide-react';
import QRCodeImport from '../QRCodeComponent';
import { ProfileHeaderProps } from '../../../hooks/employee-profile/types';

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  headerConfig,
  showQRCode,
  qrCodePosition,
  getProfileUrl,
  onHeaderFooterEdit
}) => {
  if (!headerConfig.text && !headerConfig.showLogo) {
    return null;
  }

  return (
    <div className="border-b pb-4 mb-6 print:pb-6 print:mb-8 relative">
      <div className="flex justify-between items-center">
        {headerConfig.showLogo && headerConfig.logo ? (
          <img 
            src={headerConfig.logo} 
            alt="Logo" 
            className="h-12 object-contain"
          />
        ) : (
          <div className="h-12"></div>
        )}
        
        <div className="text-center flex-1 text-xl font-semibold">
          {headerConfig.text}
        </div>
        
        {showQRCode && qrCodePosition === 'header' && (
          <div className="flex-shrink-0">
            <QRCodeImport
              value={getProfileUrl()}
              size={80}
              downloadable={false}
            />
          </div>
        )}
      </div>
      
      <Button
        size="icon"
        variant="ghost"
        onClick={onHeaderFooterEdit}
        className="absolute top-0 right-0 opacity-30 hover:opacity-100 print:hidden"
      >
        <Settings className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default ProfileHeader;
