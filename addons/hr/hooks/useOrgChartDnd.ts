import { useState, useCallback } from 'react';
import { OrgChartPerson, OrgChartData } from '../types/organization';
import { toast } from 'sonner';

export const useOrgChartDnd = (
  initialData: OrgChartData,
  onSave?: (data: OrgChartData) => void
) => {
  const [orgData, setOrgData] = useState<OrgChartData>(initialData);
  
  // Keep track of modifications
  const [hasChanges, setHasChanges] = useState(false);
  
  // Update local data when props change
  useCallback(() => {
    if (initialData && JSON.stringify(initialData) !== JSON.stringify(orgData)) {
      setOrgData(initialData);
      setHasChanges(false);
    }
  }, [initialData]);

  // Find a person in the tree by ID
  const findPerson = useCallback((id: string, rootNode: OrgChartPerson): OrgChartPerson | null => {
    if (rootNode.id === id) {
      return rootNode;
    }
    
    if (!rootNode.children) return null;
    
    for (const child of rootNode.children) {
      const found = findPerson(id, child);
      if (found) return found;
    }
    
    return null;
  }, []);

  // Find parent of a person
  const findParent = useCallback((id: string, rootNode: OrgChartPerson): OrgChartPerson | null => {
    if (!rootNode.children) return null;
    
    for (const child of rootNode.children) {
      if (child.id === id) {
        return rootNode;
      }
      
      const found = findParent(id, child);
      if (found) return found;
    }
    
    return null;
  }, []);

  // Handle drag end event
  const handleDragEnd = useCallback((result: any) => {
    const { source, destination, draggableId } = result;
    
    // Dropped outside the list or in the same position
    if (!destination || 
        (source.droppableId === destination.droppableId && 
         source.index === destination.index)) {
      return;
    }

    // Ensure we have a root person
    if (!orgData.rootPerson) {
      toast.error("Structure d'organigramme invalide");
      return;
    }
    
    // Find the dragged person
    const draggedPerson = findPerson(draggableId, orgData.rootPerson);
    if (!draggedPerson) {
      toast.error("Employé non trouvé");
      return;
    }
    
    // Find the source and destination parents
    const sourceParent = findParent(draggableId, orgData.rootPerson);
    const destParent = findPerson(destination.droppableId, orgData.rootPerson);
    
    // Cannot move to a position that would create a cycle
    if (isDescendant(destParent, draggedPerson)) {
      toast.error("Déplacement impossible : cela créerait une boucle hiérarchique");
      return;
    }

    // Create a deep copy of the data structure
    const newData = JSON.parse(JSON.stringify(orgData));
    
    // Remove the person from their current position
    if (sourceParent && newData.rootPerson) {
      const newSourceParent = findPerson(sourceParent.id, newData.rootPerson);
      if (newSourceParent && newSourceParent.children) {
        newSourceParent.children = newSourceParent.children.filter(
          child => child.id !== draggableId
        );
      }
    }
    
    // Add the person to their new position
    if (destParent && newData.rootPerson) {
      const newDestParent = findPerson(destParent.id, newData.rootPerson);
      if (newDestParent) {
        if (!newDestParent.children) {
          newDestParent.children = [];
        }
        // Find the dragged person in the new data structure
        const newDraggedPerson = findPerson(draggableId, newData.rootPerson);
        if (newDraggedPerson) {
          newDestParent.children.splice(destination.index, 0, newDraggedPerson);
        }
      }
    }
    
    // Update data and mark as changed
    setOrgData(newData);
    setHasChanges(true);
    toast.success("Organigramme mis à jour");
  }, [orgData, findPerson, findParent]);

  // Check if node is a descendant of another node
  const isDescendant = useCallback((potentialParent: OrgChartPerson | null, node: OrgChartPerson): boolean => {
    if (!potentialParent) return false;
    if (potentialParent.id === node.id) return true;
    
    if (!node.children) return false;
    
    for (const child of node.children) {
      if (isDescendant(potentialParent, child)) {
        return true;
      }
    }
    
    return false;
  }, []);

  // Save changes
  const saveChanges = useCallback(() => {
    if (onSave) {
      onSave(orgData);
      setHasChanges(false);
      toast.success("Changements enregistrés");
    }
  }, [orgData, onSave]);

  // Discard changes
  const discardChanges = useCallback(() => {
    if (initialData) {
      setOrgData(initialData);
      setHasChanges(false);
      toast.info("Changements annulés");
    }
  }, [initialData]);

  return {
    orgData,
    hasChanges,
    handleDragEnd,
    saveChanges,
    discardChanges
  };
};
