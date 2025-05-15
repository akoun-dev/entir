
import React from 'react';
import { Button } from '../../../../src/components/ui/button';
import { Download } from 'lucide-react';
import { QRCodeComponentProps } from '../../hooks/employee-profile/types';

// Import the QRCode library dynamically to ensure it only loads on the client side
const QRCodeComponent: React.FC<QRCodeComponentProps> = ({
  value,
  size = 128,
  title,
  downloadable = true
}) => {
  const [qrUrl, setQrUrl] = React.useState<string>('');
  
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      // Dynamic import of qrcode
      import('qrcode').then(QRCode => {
        QRCode.toDataURL(value, {
          width: size,
          margin: 1,
          color: {
            dark: '#000000',
            light: '#FFFFFF'
          }
        })
        .then(url => {
          setQrUrl(url);
        })
        .catch(err => {
          console.error('Error generating QR code:', err);
        });
      });
    }
  }, [value, size]);

  const handleDownload = () => {
    if (!qrUrl) return;
    
    const link = document.createElement('a');
    link.href = qrUrl;
    link.download = `qrcode-${title || 'download'}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!qrUrl) {
    return <div className="w-[{size}px] h-[{size}px] bg-gray-100 animate-pulse rounded" />;
  }

  return (
    <div className="flex flex-col items-center">
      <img 
        src={qrUrl} 
        alt="QR Code" 
        width={size} 
        height={size} 
        className="border rounded"
      />
      
      {title && <div className="text-xs mt-1 text-center">{title}</div>}
      
      {downloadable && (
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleDownload} 
          className="mt-1"
        >
          <Download className="h-3 w-3 mr-1" />
          <span className="text-xs">Télécharger</span>
        </Button>
      )}
    </div>
  );
};

export default QRCodeComponent;
