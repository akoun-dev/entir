import React, { useEffect, useState } from 'react';
import AddonManager from '../core/AddonManager';
import { getAllModules } from '../core/ModuleRegistry';

interface AddonLoaderProps {
  children: React.ReactNode;
}

/**
 * Composant qui charge tous les addons au démarrage de l'application
 */
const AddonLoader: React.FC<AddonLoaderProps> = ({ children }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const loadAddons = async () => {
      const addonManager = AddonManager.getInstance();

      try {
        // Découvrir et charger automatiquement tous les modules disponibles
        console.log("Chargement des modules depuis le registre...");
        const modules = await getAllModules();
        console.log(`${modules.length} modules découverts:`, modules.map(m => m.manifest.name));

        // Enregistrer chaque module découvert
        for (const addon of modules) {
          console.log(`Enregistrement du module ${addon.manifest.name}...`);
          console.log(`Routes du module ${addon.manifest.name}:`, addon.routes);
          addonManager.registerAddon(addon);
        }

        // Vérifier que les routes sont bien enregistrées
        const allRoutes = addonManager.getAllRoutes();
        console.log("Routes après enregistrement:", allRoutes);

        // Vérifier spécifiquement les routes du module HR
        const hrAddon = addonManager.getAddon('hr');
        if (hrAddon) {
          console.log("Module HR trouvé:", hrAddon);
          console.log("Routes du module HR:", hrAddon.routes);
        } else {
          console.error("Module HR non trouvé dans le gestionnaire d'addons");
        }

        // Afficher tous les menus enregistrés
        console.log("Menus enregistrés:", addonManager.getAllMenus());
      } catch (error) {
        console.error("Erreur lors du chargement des modules:", error);
      }

      setLoaded(true);
    };

    loadAddons();

    // Nettoyage lors du démontage du composant
    return () => {
      const addonManager = AddonManager.getInstance();
      addonManager.cleanup();
    };
  }, []);

  if (!loaded) {
    return <div>Chargement des modules...</div>;
  }

  return <>{children}</>;
};

export default AddonLoader;
