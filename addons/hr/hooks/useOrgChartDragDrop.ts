import { useState, useCallback, useRef } from 'react';
import { OrgChartPerson } from '../types/organization';
import { useOrgChart } from './useOrgChart';
import { useOrgChartConfig } from './useOrgChartConfig';

/**
 * Hook pour gérer le glisser-déposer dans l'organigramme
 * 
 * Ce hook permet de gérer les opérations de glisser-déposer dans l'organigramme,
 * comme le déplacement d'un employé d'un manager à un autre.
 */
export const useOrgChartDragDrop = () => {
  const { orgChartData, saveOrgChartData } = useOrgChart();
  const { config } = useOrgChartConfig();
  
  // États pour le glisser-déposer
  const [isDragging, setIsDragging] = useState(false);
  const [draggedPerson, setDraggedPerson] = useState<OrgChartPerson | null>(null);
  const [dropTarget, setDropTarget] = useState<OrgChartPerson | null>(null);
  const [isDropAllowed, setIsDropAllowed] = useState(false);
  
  // Référence pour stocker le parent d'origine de l'élément déplacé
  const originalParentRef = useRef<OrgChartPerson | null>(null);
  
  // Fonction pour démarrer le glisser-déposer
  const handleDragStart = useCallback((person: OrgChartPerson, parent: OrgChartPerson | null) => {
    if (!config.allowDragDrop) return false;
    
    setIsDragging(true);
    setDraggedPerson(person);
    originalParentRef.current = parent;
    return true;
  }, [config.allowDragDrop]);
  
  // Fonction pour gérer le survol d'une cible potentielle
  const handleDragOver = useCallback((target: OrgChartPerson) => {
    if (!isDragging || !draggedPerson) return;
    
    setDropTarget(target);
    
    // Vérifier si le dépôt est autorisé
    let allowed = true;
    
    // Ne pas autoriser le dépôt sur soi-même
    if (target.id === draggedPerson.id) {
      allowed = false;
    }
    
    // Ne pas autoriser le dépôt sur un descendant direct
    if (draggedPerson.children?.some(child => child.id === target.id)) {
      allowed = false;
    }
    
    // Vérifier si la restriction au même niveau est activée
    if (config.restrictDragToSameLevel) {
      // Vérifier si la cible est au même niveau hiérarchique
      // Cette vérification nécessite de connaître le niveau de chaque nœud
      // Pour simplifier, on peut vérifier si les deux ont le même parent
      const originalParent = originalParentRef.current;
      const targetIsAtSameLevel = originalParent?.children?.some(child => child.id === target.id);
      
      if (!targetIsAtSameLevel) {
        allowed = false;
      }
    }
    
    // Vérifier si la cible n'est pas un descendant indirect (pour éviter les cycles)
    const isDescendant = (person: OrgChartPerson, potentialDescendant: OrgChartPerson): boolean => {
      if (!person.children || person.children.length === 0) return false;
      
      return person.children.some(child => 
        child.id === potentialDescendant.id || isDescendant(child, potentialDescendant)
      );
    };
    
    if (isDescendant(draggedPerson, target)) {
      allowed = false;
    }
    
    setIsDropAllowed(allowed);
  }, [isDragging, draggedPerson, config.restrictDragToSameLevel]);
  
  // Fonction pour terminer le glisser-déposer
  const handleDrop = useCallback(async () => {
    if (!isDragging || !draggedPerson || !dropTarget || !isDropAllowed) {
      // Réinitialiser les états
      setIsDragging(false);
      setDraggedPerson(null);
      setDropTarget(null);
      setIsDropAllowed(false);
      return false;
    }
    
    // Demander confirmation si nécessaire
    if (config.confirmOnDrop) {
      const confirmed = window.confirm(
        `Êtes-vous sûr de vouloir déplacer ${draggedPerson.name} sous la responsabilité de ${dropTarget.name} ?`
      );
      
      if (!confirmed) {
        // Réinitialiser les états
        setIsDragging(false);
        setDraggedPerson(null);
        setDropTarget(null);
        setIsDropAllowed(false);
        return false;
      }
    }
    
    try {
      // Fonction récursive pour mettre à jour l'arbre
      const updateTree = (person: OrgChartPerson): OrgChartPerson => {
        // Si c'est la personne à déplacer, ne pas la copier ici
        if (person.id === draggedPerson.id) {
          return { ...person, children: person.children?.map(updateTree) || [] };
        }
        
        // Si c'est la cible, ajouter la personne déplacée comme enfant
        if (person.id === dropTarget.id) {
          const updatedChildren = [...(person.children || [])];
          
          // Vérifier si la personne déplacée est déjà un enfant
          const existingIndex = updatedChildren.findIndex(child => child.id === draggedPerson.id);
          
          if (existingIndex === -1) {
            // Ajouter la personne déplacée comme enfant
            updatedChildren.push({
              ...draggedPerson,
              children: draggedPerson.children?.map(updateTree) || []
            });
          }
          
          return {
            ...person,
            children: updatedChildren
          };
        }
        
        // Pour les autres personnes, mettre à jour récursivement
        return {
          ...person,
          children: person.children
            ?.filter(child => child.id !== draggedPerson.id) // Supprimer la personne déplacée
            .map(updateTree) || []
        };
      };
      
      // Mettre à jour l'arbre
      if (orgChartData.rootPerson) {
        const updatedRootPerson = updateTree(orgChartData.rootPerson);
        
        // Sauvegarder les modifications
        await saveOrgChartData(updatedRootPerson);
      }
      
      // Réinitialiser les états
      setIsDragging(false);
      setDraggedPerson(null);
      setDropTarget(null);
      setIsDropAllowed(false);
      
      return true;
    } catch (error) {
      console.error('Erreur lors du déplacement dans l\'organigramme:', error);
      
      // Réinitialiser les états
      setIsDragging(false);
      setDraggedPerson(null);
      setDropTarget(null);
      setIsDropAllowed(false);
      
      return false;
    }
  }, [isDragging, draggedPerson, dropTarget, isDropAllowed, config.confirmOnDrop, orgChartData.rootPerson, saveOrgChartData]);
  
  // Fonction pour annuler le glisser-déposer
  const handleDragCancel = useCallback(() => {
    setIsDragging(false);
    setDraggedPerson(null);
    setDropTarget(null);
    setIsDropAllowed(false);
  }, []);
  
  return {
    isDragging,
    draggedPerson,
    dropTarget,
    isDropAllowed,
    handleDragStart,
    handleDragOver,
    handleDrop,
    handleDragCancel
  };
};

export default useOrgChartDragDrop;
