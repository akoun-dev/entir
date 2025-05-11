# Paramètres Techniques

## Base de Données

La section Base de Données permet de configurer les paramètres de connexion à la base de données.

| Paramètre | Description | Options |
|-----------|-------------|---------|
| Type | Type de base de données | MySQL, PostgreSQL, SQLite, SQL Server |
| Hôte | Adresse du serveur de base de données | - |
| Port | Port de connexion | 3306 (MySQL), 5432 (PostgreSQL) |
| Nom de la base | Nom de la base de données | - |
| Utilisateur | Nom d'utilisateur pour la connexion | - |
| Mot de passe | Mot de passe pour la connexion | - |
| Préfixe des tables | Préfixe ajouté aux noms des tables | - |
| Charset | Jeu de caractères utilisé | utf8, utf8mb4, latin1 |
| Collation | Règles de comparaison des caractères | utf8_general_ci, utf8mb4_unicode_ci |
| SSL | Utilisation d'une connexion sécurisée | Activé, Désactivé |
| Timeout | Délai d'expiration des requêtes (secondes) | 30 |

## Email

La section Email permet de configurer les paramètres d'envoi d'emails depuis l'application.

| Paramètre | Description | Options |
|-----------|-------------|---------|
| Serveur SMTP | Adresse du serveur SMTP | - |
| Port | Port de connexion SMTP | 25, 465 (SSL), 587 (TLS) |
| Sécurité | Type de sécurité pour la connexion | Aucune, SSL, TLS |
| Authentification | Nécessite une authentification | Oui, Non |
| Utilisateur | Nom d'utilisateur pour l'authentification | - |
| Mot de passe | Mot de passe pour l'authentification | - |
| Email expéditeur | Adresse email utilisée comme expéditeur | - |
| Nom expéditeur | Nom affiché comme expéditeur | - |
| Email de réponse | Adresse email pour les réponses | - |
| Limite d'envoi | Nombre maximum d'emails par heure | 100 |
| Taille maximale | Taille maximale des pièces jointes (Mo) | 10 |
| Mode test | Rediriger tous les emails vers une adresse de test | Activé, Désactivé |
| Adresse de test | Adresse email utilisée en mode test | - |

## Sécurité

La section Sécurité permet de configurer les paramètres de sécurité de l'application.

| Paramètre | Description | Options |
|-----------|-------------|---------|
| Complexité mot de passe | Niveau de complexité requis | Faible, Moyen, Élevé, Personnalisé |
| Longueur minimale | Nombre minimum de caractères | 8 |
| Exige majuscules | Nécessite au moins une majuscule | Oui, Non |
| Exige minuscules | Nécessite au moins une minuscule | Oui, Non |
| Exige chiffres | Nécessite au moins un chiffre | Oui, Non |
| Exige caractères spéciaux | Nécessite au moins un caractère spécial | Oui, Non |
| Expiration mot de passe | Délai avant expiration (jours) | 90 |
| Historique mots de passe | Nombre de mots de passe mémorisés | 5 |
| Verrouillage compte | Nombre d'échecs avant verrouillage | 5 |
| Durée verrouillage | Durée du verrouillage (minutes) | 30 |
| Authentification 2FA | Authentification à deux facteurs | Désactivée, Optionnelle, Obligatoire |
| Méthode 2FA | Méthode d'authentification à deux facteurs | SMS, Email, Application |
| Session timeout | Délai d'expiration de session (minutes) | 30 |
| Autoriser plusieurs sessions | Permettre plusieurs connexions simultanées | Oui, Non |
| HTTPS obligatoire | Forcer l'utilisation de HTTPS | Oui, Non |
| Protection CSRF | Protection contre les attaques CSRF | Activée, Désactivée |
| Protection XSS | Protection contre les attaques XSS | Activée, Désactivée |
| En-têtes de sécurité | En-têtes HTTP de sécurité | Activés, Désactivés |

## Automatisation

La section Automatisation permet de configurer les tâches automatisées et les workflows.

| Paramètre | Description | Options |
|-----------|-------------|---------|
| Planificateur | Activer le planificateur de tâches | Activé, Désactivé |
| Méthode d'exécution | Méthode pour exécuter les tâches planifiées | Cron, Webhook, File d'attente |
| Intervalle minimum | Intervalle minimum entre les exécutions (minutes) | 5 |
| Timeout | Délai d'expiration des tâches (minutes) | 30 |
| Nombre de tentatives | Nombre de tentatives en cas d'échec | 3 |
| Délai entre tentatives | Délai entre les tentatives (minutes) | 15 |
| Notifications d'échec | Envoyer des notifications en cas d'échec | Activées, Désactivées |
| Email de notification | Adresse email pour les notifications | - |
| Journalisation | Niveau de journalisation des tâches | Aucun, Erreurs, Complet |
| Rétention des journaux | Durée de conservation des journaux (jours) | 30 |
| Parallélisme | Nombre maximum de tâches simultanées | 5 |
| Priorité | Priorité des tâches automatisées | Basse, Normale, Haute |

## API

La section API permet de configurer les paramètres de l'API REST.

| Paramètre | Description | Options |
|-----------|-------------|---------|
| Activer l'API | Activer l'accès à l'API | Activé, Désactivé |
| Version | Version actuelle de l'API | - |
| Authentification | Méthode d'authentification | Clé API, OAuth2, JWT |
| Expiration token | Durée de validité des tokens (minutes) | 60 |
| Limite de requêtes | Nombre maximum de requêtes par minute | 100 |
| CORS | Autoriser les requêtes cross-origin | Activé, Désactivé |
| Origines autorisées | Domaines autorisés pour les requêtes CORS | * |
| Méthodes autorisées | Méthodes HTTP autorisées | GET, POST, PUT, DELETE |
| En-têtes autorisés | En-têtes HTTP autorisés | Content-Type, Authorization |
| Documentation | Activer la documentation interactive | Activée, Désactivée |
| URL de documentation | URL de la documentation de l'API | /api/docs |
| Journalisation | Niveau de journalisation des requêtes API | Aucun, Erreurs, Complet |
| Compression | Compression des réponses | Activée, Désactivée |
| Cache | Mise en cache des réponses | Activée, Désactivée |
| Durée du cache | Durée de validité du cache (secondes) | 300 |

## Journalisation

La section Journalisation permet de configurer les paramètres de journalisation du système.

| Paramètre | Description | Options |
|-----------|-------------|---------|
| Niveau de journalisation | Niveau de détail des journaux | Debug, Info, Warning, Error, Critical |
| Format | Format des entrées de journal | Simple, Détaillé, JSON |
| Destination | Destination des journaux | Fichier, Base de données, Syslog, Service externe |
| Rotation | Fréquence de rotation des fichiers journaux | Quotidienne, Hebdomadaire, Mensuelle, Par taille |
| Taille maximale | Taille maximale d'un fichier journal (Mo) | 100 |
| Nombre de fichiers | Nombre de fichiers de rotation conservés | 10 |
| Compression | Compression des anciens journaux | Activée, Désactivée |
| Rétention | Durée de conservation des journaux (jours) | 90 |
| Inclure contexte | Inclure des informations contextuelles | Activé, Désactivé |
| Inclure trace | Inclure la trace des appels pour les erreurs | Activé, Désactivé |
| Anonymisation | Anonymiser les données sensibles | Activée, Désactivée |
| Alertes | Envoyer des alertes pour certains événements | Activées, Désactivées |
| Seuil d'alerte | Niveau minimum pour déclencher une alerte | Warning |
| Email d'alerte | Adresse email pour les alertes | - |

## Imprimantes

La section Imprimantes permet de configurer les imprimantes disponibles dans le système.

| Paramètre | Description | Options |
|-----------|-------------|---------|
| Nom | Nom unique de l'imprimante | - |
| Type | Type d'imprimante | Locale, Réseau, PDF, Email |
| Adresse | Adresse IP ou nom d'hôte | - |
| Port | Port de connexion | 9100 |
| Protocole | Protocole de communication | RAW, LPR, IPP |
| Pilote | Pilote d'impression | - |
| Format papier par défaut | Format de papier par défaut | A4, Letter, Legal |
| Recto-verso | Impression recto-verso par défaut | Activée, Désactivée |
| Couleur | Impression couleur par défaut | Activée, Désactivée |
| Résolution | Résolution d'impression par défaut (DPI) | 300 |
| Bac par défaut | Bac d'alimentation par défaut | Auto |
| Par défaut | Définit si c'est l'imprimante par défaut | Oui, Non |
| Actif | État d'activation de l'imprimante | Actif, Inactif |

## Modèles de Rapports

La section Modèles de Rapports permet de configurer les modèles utilisés pour générer des rapports.

| Paramètre | Description | Options |
|-----------|-------------|---------|
| Nom | Nom unique du modèle | - |
| Type | Type de document | Facture, Devis, Bon de livraison, Rapport |
| Format | Format de sortie | PDF, HTML, Excel, Word |
| Orientation | Orientation du document | Portrait, Paysage |
| Taille de page | Format de la page | A4, Letter, Legal |
| Marges | Marges du document (mm) | - |
| En-tête | Contenu de l'en-tête | - |
| Pied de page | Contenu du pied de page | - |
| Logo | Inclure le logo de l'entreprise | Oui, Non |
| Position du logo | Position du logo | Gauche, Centre, Droite |
| Police | Police principale | Arial, Times New Roman, Calibri |
| Taille de police | Taille de la police principale (pt) | 11 |
| Couleur principale | Couleur principale du modèle | - |
| Couleur secondaire | Couleur secondaire du modèle | - |
| Numérotation des pages | Inclure la numérotation des pages | Oui, Non |
| Date | Inclure la date d'émission | Oui, Non |
| Par défaut | Définit si c'est le modèle par défaut | Oui, Non |
| Actif | État d'activation du modèle | Actif, Inactif |
