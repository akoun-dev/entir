
import { useState } from 'react';
import { useToast } from '../../../../src/hooks/use-toast';
import { UsePdfExportReturn } from './types';
import * as htmlToImage from 'html-to-image';

export const usePdfExport = (): UsePdfExportReturn => {
  const { toast } = useToast();
  const [isPdfGenerating, setIsPdfGenerating] = useState(false);

  const generatePDF = async (element: HTMLElement, filename: string) => {
    setIsPdfGenerating(true);
    
    try {
      // Dynamically import jsPDF to reduce initial load
      const jspdfModule = await import('jspdf');
      const jsPDF = jspdfModule.default;
      
      // Wait a bit to ensure any state updates have completed
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: 'a4',
        hotfixes: ['px_scaling']
      });
      
      // Get element dimensions
      const { width } = element.getBoundingClientRect();
      const pdfWidth = doc.internal.pageSize.getWidth();
      const pdfHeight = doc.internal.pageSize.getHeight();
      const ratio = pdfWidth / width;
      
      // Clone the element to modify it for export without affecting the UI
      const clone = element.cloneNode(true) as HTMLElement;
      clone.style.width = `${width}px`;
      document.body.appendChild(clone);
      
      // Apply print-specific styles to the clone
      const printStyles = Array.from(document.querySelectorAll('style.print-styles'));
      printStyles.forEach(style => {
        const newStyle = document.createElement('style');
        newStyle.textContent = style.textContent || '';
        clone.insertAdjacentElement('afterbegin', newStyle);
      });
      
      // Create image of the content
      const dataUrl = await htmlToImage.toPng(clone, {
        quality: 1,
        pixelRatio: 2,
        skipAutoScale: true
      });
      
      // Remove the clone after capturing the image
      document.body.removeChild(clone);
      
      // Add image to PDF
      const img = new Image();
      img.src = dataUrl;
      
      await new Promise<void>((resolve) => {
        img.onload = () => {
          const imgHeight = img.height * ratio;
          let heightLeft = imgHeight;
          let position = 0;
          
          // Add first page
          doc.addImage(img, 'PNG', 0, position, pdfWidth, imgHeight);
          heightLeft -= pdfHeight;
          
          // Add additional pages if content is longer than one page
          while (heightLeft > 0) {
            position -= pdfHeight;
            doc.addPage();
            doc.addImage(img, 'PNG', 0, position, pdfWidth, imgHeight);
            heightLeft -= pdfHeight;
          }
          
          // Save the PDF
          doc.save(`${filename.replace(/\s+/g, '_')}.pdf`);
          resolve();
        };
      });
      
      toast({
        title: "PDF généré",
        description: `Le fichier PDF a été créé avec succès.`
      });
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast({
        title: "Erreur",
        description: "Impossible de générer le fichier PDF",
        variant: "destructive"
      });
    } finally {
      setIsPdfGenerating(false);
    }
  };

  return {
    generatePDF,
    isPdfGenerating
  };
};
