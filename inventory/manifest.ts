import { AddonManifest } from '../../src/types/addon';

const manifest: AddonManifest = {
  // Métadonnées de base
  name: 'inventory',
  version: '1.0.0',
  displayName: 'Inventaire',
  summary: 'Gestion des stocks et inventaires',
  description: 'Module de gestion des stocks, produits, entrepôts et mouvements de stock',

  // Configuration
  application: true,
  autoInstall: false,
  installable: true,

  // Routes définies par l'addon
  routes: [],

  // Modèles de données
  models: [
    {
      name: 'inventory.product',
      displayName: 'Produit',
      fields: [
        { name: 'name', type: 'string', required: true, label: 'Nom' },
        { name: 'code', type: 'string', required: true, label: 'Code' },
        { name: 'category_id', type: 'many2one', required: false, label: 'Catégorie', relation: 'inventory.category' },
        { name: 'price', type: 'number', required: false, label: 'Prix' },
        { name: 'cost', type: 'number', required: false, label: 'Coût' }
      ]
    },
    {
      name: 'inventory.category',
      displayName: 'Catégorie',
      fields: [
        { name: 'name', type: 'string', required: true, label: 'Nom' },
        { name: 'parent_id', type: 'many2one', required: false, label: 'Catégorie parente', relation: 'inventory.category' }
      ]
    }
  ],

  // Menus définis par l'addon
  menus: [
    {
      id: 'menu_inventory_root',
      name: 'Inventaire',
      sequence: 30,
      route: '/inventory',
      icon: 'Package'
    },
    {
      id: 'menu_inventory_products',
      name: 'Produits',
      sequence: 10,
      route: '/inventory/products',
      parent: 'menu_inventory_root',
      icon: 'Box'
    },
    {
      id: 'menu_inventory_categories',
      name: 'Catégories',
      sequence: 20,
      route: '/inventory/categories',
      parent: 'menu_inventory_root',
      icon: 'Folder'
    },
    {
      id: 'menu_inventory_warehouses',
      name: 'Entrepôts',
      sequence: 30,
      route: '/inventory/warehouses',
      parent: 'menu_inventory_root',
      icon: 'Warehouse'
    },
    {
      id: 'menu_inventory_stock_moves',
      name: 'Mouvements de stock',
      sequence: 40,
      route: '/inventory/stock-moves',
      parent: 'menu_inventory_root',
      icon: 'Truck'
    }
  ],

  // Dépendances
  dependencies: []
};

export default manifest;
