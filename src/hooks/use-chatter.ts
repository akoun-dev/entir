import { useChatter as useChatterContext } from '@/contexts/ChatterContext';

/**
 * Hook personnalisé pour utiliser le chatter dans les vues
 *
 * Ce hook simplifie l'accès au contexte du chatter et vérifie que le contexte
 * est bien disponible (que le composant est bien à l'intérieur d'un ChatterProvider).
 *
 * Exemple d'utilisation:
 * ```
 * const { showChatter } = useChatter();
 *
 * // Dans un gestionnaire d'événements ou un effet
 * showChatter('employee', 123); // Affiche le chatter pour l'employé avec l'ID 123
 *
 * // Pour masquer le chatter
 * hideChatter();
 *
 * // Pour vérifier si le chatter est visible
 * if (isVisible) {
 *   // Faire quelque chose
 * }
 * ```
 */
export const useChatter = () => {
  const context = useChatterContext();

  if (!context) {
    throw new Error("useChatter doit être utilisé à l'intérieur d'un ChatterProvider");
  }

  return context;
};

export default useChatter;
