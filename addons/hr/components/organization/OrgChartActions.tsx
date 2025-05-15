
import React, { useCallback } from 'react';
import { toast } from 'sonner';
import { OrgChartPerson } from '../../types/organization';

interface OrgChartActionsProps {
  data: OrgChartPerson;
}

// Change to a proper hook that returns functions
const useOrgChartActions = ({ data }: OrgChartActionsProps) => {
  // Export data to JSON file with better error handling
  const handleExport = useCallback(() => {
    if (!data) {
      toast("Aucune donnée à exporter");
      return;
    }
    
    try {
      // Create a pretty-printed JSON string with proper indentation
      const jsonString = JSON.stringify(data, null, 2);
      const blob = new Blob([jsonString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      
      // Create a link element and trigger the download
      const downloadAnchorNode = document.createElement('a');
      downloadAnchorNode.setAttribute("href", url);
      downloadAnchorNode.setAttribute("download", `organigramme-${new Date().toISOString().split('T')[0]}.json`);
      
      // Append to body, click, and clean up
      document.body.appendChild(downloadAnchorNode);
      downloadAnchorNode.click();
      downloadAnchorNode.remove();
      
      // Release the object URL
      setTimeout(() => {
        URL.revokeObjectURL(url);
      }, 100);
      
      toast("Organigramme exporté avec succès");
    } catch (error) {
      console.error("Erreur lors de l'exportation de l'organigramme:", error);
      toast("Erreur lors de l'exportation de l'organigramme");
    }
  }, [data]);

  // Export a simplified version for CSV/Excel
  const handleExportSimplified = useCallback(() => {
    if (!data) {
      toast("Aucune donnée à exporter");
      return;
    }
    
    try {
      // Extract flattened data from the hierarchical structure
      const flattenedData: Record<string, string>[] = [];
      
      const flattenPerson = (person: OrgChartPerson, manager: string = "") => {
        const personData = {
          id: person.id,
          name: person.name,
          position: person.position,
          department: person.department,
          email: person.email || "",
          managedBy: manager
        };
        
        flattenedData.push(personData);
        
        if (person.children && person.children.length > 0) {
          person.children.forEach(child => {
            flattenPerson(child, person.name);
          });
        }
      };
      
      flattenPerson(data);
      
      // Convert to CSV
      const headers = ["ID", "Nom", "Poste", "Département", "Email", "Responsable"];
      const csvContent = [
        headers.join(","),
        ...flattenedData.map(row => [
          row.id, 
          `"${row.name}"`, 
          `"${row.position}"`, 
          `"${row.department}"`, 
          row.email,
          `"${row.managedBy}"`
        ].join(","))
      ].join("\n");
      
      // Create blob and download
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `organigramme-liste-${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      
      setTimeout(() => {
        URL.revokeObjectURL(url);
      }, 100);
      
      toast("Liste des employés exportée avec succès");
    } catch (error) {
      console.error("Erreur lors de l'exportation de la liste:", error);
      toast("Erreur lors de l'exportation");
    }
  }, [data]);

  return { 
    handleExport,
    handleExportSimplified
  };
};

export default useOrgChartActions;
