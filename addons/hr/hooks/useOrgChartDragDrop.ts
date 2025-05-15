
import { useState, useCallback, useRef, useEffect } from 'react';
import { OrgChartPerson } from '../types/organization';
import { toast } from 'sonner';

export interface DragDropResult {
  source: {
    droppableId: string;
    index: number;
  };
  destination?: {
    droppableId: string;
    index: number;
  };
  draggableId: string;
  type?: string;
  reason?: string;
  mode?: string;
}

export const useOrgChartDragDrop = (
  initialRoot: OrgChartPerson,
  editModeEnabled: boolean,
  readOnly: boolean,
  onStructureChange?: (updatedRoot: OrgChartPerson) => void
) => {
  const [rootData, setRootData] = useState<OrgChartPerson>(
    JSON.parse(JSON.stringify(initialRoot))
  );
  const [hasChanges, setHasChanges] = useState(false);
  const initialRootRef = useRef<OrgChartPerson>(
    JSON.parse(JSON.stringify(initialRoot))
  );

  // Update initialRootRef when initialRoot changes
  useEffect(() => {
    initialRootRef.current = JSON.parse(JSON.stringify(initialRoot));
  }, [initialRoot]);
  
  // Find a person in the tree by ID
  const findPerson = useCallback((personId: string, node: OrgChartPerson): OrgChartPerson | null => {
    if (node.id === personId) return node;
    if (!node.children) return null;
    
    for (const child of node.children) {
      const found = findPerson(personId, child);
      if (found) return found;
    }
    
    return null;
  }, []);

  // Find the parent of a person
  const findParent = useCallback((personId: string, node: OrgChartPerson): OrgChartPerson | null => {
    if (!node.children) return null;
    
    for (const child of node.children) {
      if (child.id === personId) return node;
      
      const found = findParent(personId, child);
      if (found) return found;
    }
    
    return null;
  }, []);

  // Check if node is a descendant to prevent cycles
  const isDescendant = useCallback((potentialParent: OrgChartPerson | null, node: OrgChartPerson): boolean => {
    if (!potentialParent) return false;
    if (potentialParent.id === node.id) return true;
    
    if (!node.children) return false;
    
    for (const child of node.children) {
      if (isDescendant(potentialParent, child)) return true;
    }
    
    return false;
  }, []);

  // Handle drag end event with more robust error handling
  const handleDragEnd = useCallback((result: DragDropResult) => {
    console.log("Drag end event:", result);
    
    try {
      const { source, destination, draggableId } = result;
      
      // Verifier si le mode édition est activé
      if (!editModeEnabled || readOnly) {
        console.log("Drag and drop disabled: edit mode or read-only");
        return;
      }
      
      // Dropped outside the list or didn't move
      if (!destination || 
          (source.droppableId === destination.droppableId && 
           source.index === destination.index)) {
        console.log("No destination or same position, ignoring");
        return;
      }

      // Clone the current structure to avoid direct mutations
      const newRoot = JSON.parse(JSON.stringify(rootData));
      
      // Find the dragged person
      const draggedPerson = findPerson(draggableId, newRoot);
      if (!draggedPerson) {
        toast.error("Employé non trouvé");
        return;
      }
      
      // Find the destination parent
      const destParent = findPerson(destination.droppableId, newRoot);
      if (!destParent) {
        toast.error("Destination non trouvée");
        return;
      }
      
      // Cannot move to a position that would create a cycle
      if (isDescendant(draggedPerson, destParent)) {
        toast.error("Déplacement impossible : cela créerait une boucle hiérarchique");
        return;
      }
      
      // Remove from current parent
      const sourceParent = findParent(draggableId, newRoot);
      if (sourceParent && sourceParent.children) {
        sourceParent.children = sourceParent.children.filter(child => child.id !== draggableId);
        
        // If parent has no more children, set children to undefined
        if (sourceParent.children.length === 0) {
          sourceParent.children = undefined;
        }
      }
      
      // Add to new parent
      if (!destParent.children) {
        destParent.children = [];
      }
      
      // Create a new child node with the same data
      const newChild = { ...draggedPerson };
      
      // Update department if moving between departments
      if (destParent.department && destParent.department !== newChild.department) {
        newChild.department = destParent.department;
      }
      
      // Insert at the correct position
      destParent.children.splice(destination.index, 0, newChild);
      
      console.log("Updated structure:", newRoot);
      
      // Update state
      setRootData(newRoot);
      setHasChanges(true);
      toast.success("Position mise à jour");
    } catch (error) {
      console.error("Erreur lors du déplacement:", error);
      toast.error("Une erreur est survenue lors du déplacement");
    }
  }, [rootData, editModeEnabled, readOnly, findPerson, findParent, isDescendant]);

  // Update rootData when initialRoot changes
  const updateRootData = useCallback((newRoot: OrgChartPerson) => {
    if (JSON.stringify(newRoot) !== JSON.stringify(rootData)) {
      const clonedRoot = JSON.parse(JSON.stringify(newRoot));
      setRootData(clonedRoot);
      initialRootRef.current = JSON.parse(JSON.stringify(newRoot));
      setHasChanges(false);
    }
  }, [rootData]);

  // Save changes
  const handleSaveChanges = useCallback(() => {
    if (onStructureChange) {
      try {
        onStructureChange(rootData);
        initialRootRef.current = JSON.parse(JSON.stringify(rootData));
        setHasChanges(false);
        toast.success("Changements enregistrés");
      } catch (error) {
        console.error("Erreur lors de l'enregistrement des changements:", error);
        toast.error("Erreur lors de l'enregistrement des changements");
      }
    }
  }, [rootData, onStructureChange]);

  // Discard changes
  const handleDiscardChanges = useCallback(() => {
    setRootData(JSON.parse(JSON.stringify(initialRootRef.current)));
    setHasChanges(false);
    toast.info("Changements annulés");
  }, []);

  return {
    rootData,
    hasChanges,
    handleDragEnd,
    handleSaveChanges,
    handleDiscardChanges,
    updateRootData
  };
};
