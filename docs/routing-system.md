# Système de Routage Modulaire

Ce document explique comment utiliser le système de routage modulaire pour ajouter des routes à un module existant ou à un nouveau module.

## Vue d'ensemble

Le système de routage modulaire permet de :

1. Enregistrer automatiquement les routes de chaque module dans le backend
2. Charger dynamiquement les routes lorsqu'un nouveau module est ajouté
3. Assurer une structure cohérente des routes (préfixage par module)
4. Gérer les middlewares nécessaires pour chaque route

## Structure des fichiers

Le système de routage est organisé comme suit :

```
src/server/core/routing/
├── RouteManager.js       # Gestionnaire principal des routes
├── middlewares.js        # Middlewares communs
├── RouteTypes.js         # Types de routes (Public, Protected, Permission)
├── utils.js              # Utilitaires pour le routage
└── index.js              # Point d'entrée du système de routage
```

## Ajouter des routes à un module existant

Pour ajouter des routes à un module existant, vous pouvez utiliser l'une des approches suivantes :

### Approche 1 : Utiliser un dossier `routes`

1. Créez un dossier `routes` dans le répertoire de votre module (s'il n'existe pas déjà)
2. Créez des fichiers de routes pour chaque entité ou fonctionnalité
3. Créez un fichier `index.js` qui regroupe toutes les routes du module

Exemple de structure :

```
addons/monmodule/
├── routes/
│   ├── entite1.js
│   ├── entite2.js
│   └── index.js
└── ...
```

Exemple de fichier de routes (`entite1.js`) :

```javascript
'use strict';

const express = require('express');
const { asyncHandler } = require('../../../src/server/core/routing/middlewares');
const { Entite1 } = require('../../../src/models');

// Créer un router Express
const router = express.Router();

// Définir les routes
router.get('/', asyncHandler(async (req, res) => {
  const items = await Entite1.findAll();
  res.json(items);
}));

router.get('/:id', asyncHandler(async (req, res) => {
  const item = await Entite1.findByPk(req.params.id);
  if (!item) return res.status(404).json({ message: 'Item non trouvé' });
  res.json(item);
}));

// Exporter le router
module.exports = router;
```

Exemple de fichier `index.js` :

```javascript
'use strict';

const express = require('express');
const entite1Routes = require('./entite1');
const entite2Routes = require('./entite2');

// Créer un router Express
const router = express.Router();

// Monter les routes
router.use('/entite1', entite1Routes);
router.use('/entite2', entite2Routes);

// Route racine du module
router.get('/', (req, res) => {
  res.json({
    message: 'API du module MonModule',
    version: '1.0.0',
    endpoints: [
      { path: '/monmodule/entite1', description: 'Gestion de l\'entité 1' },
      { path: '/monmodule/entite2', description: 'Gestion de l\'entité 2' }
    ]
  });
});

module.exports = router;
```

### Approche 2 : Utiliser un fichier `api-routes.js`

1. Créez un fichier `api-routes.js` à la racine de votre module
2. Définissez vos routes dans ce fichier

Exemple de fichier `api-routes.js` :

```javascript
'use strict';

const express = require('express');
const { asyncHandler } = require('../../src/server/core/routing/middlewares');
const { Entite1, Entite2 } = require('../../src/models');

// Fonction d'initialisation des routes
function register(router) {
  // Routes pour l'entité 1
  router.get('/entite1', asyncHandler(async (req, res) => {
    const items = await Entite1.findAll();
    res.json(items);
  }));
  
  router.get('/entite1/:id', asyncHandler(async (req, res) => {
    const item = await Entite1.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item non trouvé' });
    res.json(item);
  }));
  
  // Routes pour l'entité 2
  router.get('/entite2', asyncHandler(async (req, res) => {
    const items = await Entite2.findAll();
    res.json(items);
  }));
  
  // Route racine du module
  router.get('/', (req, res) => {
    res.json({
      message: 'API du module MonModule',
      version: '1.0.0'
    });
  });
}

module.exports = { register };
```

## Créer un nouveau module avec des routes

Pour créer un nouveau module avec des routes :

1. Créez un nouveau dossier pour votre module dans le répertoire `addons`
2. Créez les fichiers nécessaires pour votre module (index.ts, manifest.ts, etc.)
3. Ajoutez des routes en utilisant l'une des approches décrites ci-dessus

## Utiliser les types de routes

Le système de routage fournit des types de routes prédéfinis pour faciliter la création de routes avec des comportements spécifiques :

### Route publique

```javascript
const { createPublicRoute } = require('../../../src/server/core/routing');

// Créer une route publique
const getItemsRoute = createPublicRoute({
  path: '/',
  method: 'GET',
  handler: async (req, res) => {
    const items = await Item.findAll();
    res.json(items);
  }
});

// Enregistrer la route sur un router Express
getItemsRoute.register(router);
```

### Route protégée (nécessite une authentification)

```javascript
const { createProtectedRoute } = require('../../../src/server/core/routing');

// Créer une route protégée
const createItemRoute = createProtectedRoute({
  path: '/',
  method: 'POST',
  handler: async (req, res) => {
    const item = await Item.create(req.body);
    res.status(201).json(item);
  },
  validation: {
    name: { required: true, type: 'string', minLength: 3 }
  }
});

// Enregistrer la route sur un router Express
createItemRoute.register(router);
```

### Route avec permissions

```javascript
const { createPermissionRoute } = require('../../../src/server/core/routing');

// Créer une route avec permissions
const deleteItemRoute = createPermissionRoute({
  path: '/:id',
  method: 'DELETE',
  handler: async (req, res) => {
    const item = await Item.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item non trouvé' });
    await item.destroy();
    res.json({ success: true });
  },
  permissions: ['item.delete']
});

// Enregistrer la route sur un router Express
deleteItemRoute.register(router);
```

## Middlewares disponibles

Le système de routage fournit plusieurs middlewares prêts à l'emploi :

- `asyncHandler` : Gère les erreurs asynchrones
- `authMiddleware` : Vérifie l'authentification
- `permissionMiddleware` : Vérifie les permissions
- `validationMiddleware` : Valide les données de la requête
- `requestLogger` : Enregistre les requêtes

Exemple d'utilisation :

```javascript
const { middlewares } = require('../../../src/server/core/routing');
const { asyncHandler, validationMiddleware } = middlewares;

router.post('/', 
  validationMiddleware({
    name: { required: true, type: 'string', minLength: 3 },
    price: { required: true, type: 'number', min: 0 }
  }),
  asyncHandler(async (req, res) => {
    const item = await Item.create(req.body);
    res.status(201).json(item);
  })
);
```

## Bonnes pratiques

1. **Structurez vos routes de manière logique** : Organisez vos routes par entité ou fonctionnalité
2. **Utilisez les middlewares appropriés** : Utilisez les middlewares fournis pour gérer l'authentification, les permissions et la validation
3. **Documentez vos routes** : Ajoutez des commentaires pour décrire vos routes (chemin, description, accès)
4. **Utilisez les types de routes** : Utilisez les types de routes prédéfinis pour faciliter la création de routes avec des comportements spécifiques
5. **Respectez la convention de nommage** : Utilisez des noms clairs et cohérents pour vos routes et vos fichiers
6. **Gérez les erreurs** : Utilisez le middleware `asyncHandler` pour gérer les erreurs asynchrones
7. **Validez les données** : Utilisez le middleware `validationMiddleware` pour valider les données de la requête

## Dépannage

Si vos routes ne sont pas chargées correctement, vérifiez les points suivants :

1. Assurez-vous que votre module est actif et installé dans la base de données
2. Vérifiez que vos fichiers de routes sont correctement structurés
3. Vérifiez les logs du serveur pour détecter d'éventuelles erreurs
4. Assurez-vous que vos routes sont correctement exportées
5. Vérifiez que vos routes sont correctement montées sur le router principal
