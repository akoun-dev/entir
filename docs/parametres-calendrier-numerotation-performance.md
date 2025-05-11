# Paramètres de Calendrier, Numérotation et Performance

## Calendrier

### Configuration du Calendrier

La section Configuration du Calendrier permet de configurer les paramètres généraux du calendrier.

| Paramètre | Description | Options |
|-----------|-------------|---------|
| Premier jour de la semaine | Jour considéré comme le début de la semaine | Lundi, Dimanche |
| Jours ouvrés | Jours considérés comme ouvrés | Lundi, Mardi, Mercredi, Jeudi, Vendredi, Samedi, Dimanche |
| Heures de travail - Début | Heure de début de la journée de travail | HH:MM |
| Heures de travail - Fin | Heure de fin de la journée de travail | HH:MM |
| Fuseau horaire | Fuseau horaire par défaut | Europe/Paris |
| Format de date | Format d'affichage des dates | DD/MM/YYYY, MM/DD/YYYY, YYYY-MM-DD |
| Format d'heure | Format d'affichage des heures | 24h, 12h (AM/PM) |
| Afficher les week-ends | Afficher les week-ends dans le calendrier | Oui, Non |
| Afficher les jours fériés | Afficher les jours fériés dans le calendrier | Oui, Non |
| Couleur des événements par défaut | Couleur par défaut pour les événements | #3788d8 |
| Durée par défaut | Durée par défaut des nouveaux événements (minutes) | 60 |
| Intervalle de la grille | Intervalle de la grille horaire (minutes) | 30 |
| Vue par défaut | Vue affichée par défaut | Jour, Semaine, Mois, Agenda |
| Rappels automatiques | Activer les rappels automatiques | Activés, Désactivés |
| Délai de rappel par défaut | Délai par défaut pour les rappels (minutes) | 15 |

### Jours Fériés

La section Jours Fériés permet de configurer les jours fériés et non travaillés.

| Paramètre | Description | Exemple |
|-----------|-------------|---------|
| Nom | Nom du jour férié | Jour de l'An |
| Date | Date du jour férié | 01/01/2023 |
| Récurrent | Se répète chaque année | Oui, Non |
| Jour ouvré | Considéré comme un jour ouvré | Oui, Non |
| Pays | Pays concerné par ce jour férié | France |
| Région | Région concernée (si applicable) | Alsace-Moselle |
| Description | Description ou informations supplémentaires | - |
| Couleur | Couleur d'affichage dans le calendrier | #FF0000 |

### Intégrations de Calendrier

La section Intégrations de Calendrier permet de configurer les intégrations avec des calendriers externes.

| Paramètre | Description | Options |
|-----------|-------------|---------|
| Nom | Nom de l'intégration | Google Calendar |
| Type | Type de calendrier externe | Google, Microsoft, iCal, Exchange |
| URL | URL du calendrier externe | - |
| Identifiant | Identifiant du calendrier | - |
| Clé API | Clé API pour l'authentification | - |
| Client ID | ID client pour OAuth | - |
| Client Secret | Secret client pour OAuth | - |
| Jeton d'accès | Jeton d'accès pour l'API | - |
| Jeton de rafraîchissement | Jeton de rafraîchissement pour l'API | - |
| Synchronisation | Direction de la synchronisation | Import, Export, Bidirectionnelle |
| Fréquence | Fréquence de synchronisation | 15 minutes, 1 heure, 1 jour |
| Dernière synchronisation | Date et heure de la dernière synchronisation | - |
| Filtres | Filtres pour les événements à synchroniser | - |
| Actif | État d'activation de l'intégration | Actif, Inactif |

## Numérotation

### Configuration des Séquences

La section Configuration des Séquences permet de configurer les paramètres généraux de numérotation.

| Paramètre | Description | Options |
|-----------|-------------|---------|
| Préfixe global | Préfixe appliqué à toutes les séquences | - |
| Séparateur | Caractère séparateur entre les parties | - |
| Inclure l'année | Inclure l'année dans les numéros | Oui, Non |
| Format de l'année | Format de l'année dans les numéros | YY, YYYY |
| Inclure le mois | Inclure le mois dans les numéros | Oui, Non |
| Format du mois | Format du mois dans les numéros | MM, M |
| Réinitialisation automatique | Réinitialiser automatiquement les compteurs | Aucune, Annuelle, Mensuelle |
| Longueur minimale | Longueur minimale de la partie numérique | 4 |
| Remplissage | Caractère de remplissage pour la partie numérique | 0 |
| Vérification des doublons | Vérifier les doublons avant création | Activée, Désactivée |
| Génération automatique | Générer automatiquement les numéros | Activée, Désactivée |
| Autoriser modification | Autoriser la modification manuelle des numéros | Oui, Non |

### Séquences

La section Séquences permet de configurer les différentes séquences de numérotation utilisées dans l'application.

#### Factures

| Paramètre | Description | Exemple |
|-----------|-------------|---------|
| Nom | Nom de la séquence | Factures |
| Préfixe | Préfixe spécifique à cette séquence | FAC |
| Format | Format de la séquence | {PREFIX}{YEAR}{MONTH}{SEQ} |
| Valeur actuelle | Valeur actuelle du compteur | 42 |
| Valeur suivante | Prochaine valeur qui sera générée | FAC-2023-05-0043 |
| Dernière valeur | Dernière valeur générée | FAC-2023-05-0042 |
| Incrément | Valeur d'incrémentation | 1 |
| Longueur minimale | Longueur minimale de la partie numérique | 4 |
| Réinitialisation | Période de réinitialisation | Annuelle |
| Dernière réinitialisation | Date de la dernière réinitialisation | 01/01/2023 |
| Actif | État d'activation de la séquence | Actif |

#### Devis

| Paramètre | Description | Exemple |
|-----------|-------------|---------|
| Nom | Nom de la séquence | Devis |
| Préfixe | Préfixe spécifique à cette séquence | DEV |
| Format | Format de la séquence | {PREFIX}{YEAR}{SEQ} |
| Valeur actuelle | Valeur actuelle du compteur | 28 |
| Valeur suivante | Prochaine valeur qui sera générée | DEV-2023-0029 |
| Dernière valeur | Dernière valeur générée | DEV-2023-0028 |
| Incrément | Valeur d'incrémentation | 1 |
| Longueur minimale | Longueur minimale de la partie numérique | 4 |
| Réinitialisation | Période de réinitialisation | Annuelle |
| Dernière réinitialisation | Date de la dernière réinitialisation | 01/01/2023 |
| Actif | État d'activation de la séquence | Actif |

#### Commandes

| Paramètre | Description | Exemple |
|-----------|-------------|---------|
| Nom | Nom de la séquence | Commandes |
| Préfixe | Préfixe spécifique à cette séquence | CMD |
| Format | Format de la séquence | {PREFIX}{YEAR}{MONTH}{SEQ} |
| Valeur actuelle | Valeur actuelle du compteur | 103 |
| Valeur suivante | Prochaine valeur qui sera générée | CMD-2023-05-0104 |
| Dernière valeur | Dernière valeur générée | CMD-2023-05-0103 |
| Incrément | Valeur d'incrémentation | 1 |
| Longueur minimale | Longueur minimale de la partie numérique | 4 |
| Réinitialisation | Période de réinitialisation | Mensuelle |
| Dernière réinitialisation | Date de la dernière réinitialisation | 01/05/2023 |
| Actif | État d'activation de la séquence | Actif |

#### Clients

| Paramètre | Description | Exemple |
|-----------|-------------|---------|
| Nom | Nom de la séquence | Clients |
| Préfixe | Préfixe spécifique à cette séquence | CLI |
| Format | Format de la séquence | {PREFIX}{SEQ} |
| Valeur actuelle | Valeur actuelle du compteur | 1458 |
| Valeur suivante | Prochaine valeur qui sera générée | CLI1459 |
| Dernière valeur | Dernière valeur générée | CLI1458 |
| Incrément | Valeur d'incrémentation | 1 |
| Longueur minimale | Longueur minimale de la partie numérique | 4 |
| Réinitialisation | Période de réinitialisation | Aucune |
| Dernière réinitialisation | Date de la dernière réinitialisation | - |
| Actif | État d'activation de la séquence | Actif |

## Performance

### Configuration de Performance

La section Configuration de Performance permet de configurer les paramètres liés à la performance du système.

| Paramètre | Description | Options |
|-----------|-------------|---------|
| Mise en cache | Activer la mise en cache | Activée, Désactivée |
| Durée du cache | Durée de validité du cache (secondes) | 300 |
| Type de cache | Mécanisme de cache utilisé | Mémoire, Redis, Fichier |
| Compression | Activer la compression des réponses | Activée, Désactivée |
| Niveau de compression | Niveau de compression (1-9) | 6 |
| Minification | Minifier les ressources statiques | Activée, Désactivée |
| Regroupement | Regrouper les ressources statiques | Activé, Désactivé |
| Préchargement | Précharger les ressources critiques | Activé, Désactivé |
| Lazy loading | Charger les ressources à la demande | Activé, Désactivé |
| Limite de requêtes | Nombre maximum de requêtes simultanées | 100 |
| Timeout | Délai d'expiration des requêtes (secondes) | 30 |
| Surveillance | Activer la surveillance des performances | Activée, Désactivée |
| Intervalle de surveillance | Intervalle de collecte des métriques (secondes) | 10 |
| Seuil d'alerte CPU | Seuil d'utilisation CPU pour les alertes (%) | 80 |
| Seuil d'alerte mémoire | Seuil d'utilisation mémoire pour les alertes (%) | 80 |
| Seuil d'alerte disque | Seuil d'utilisation disque pour les alertes (%) | 90 |
| Seuil d'alerte temps de réponse | Seuil de temps de réponse pour les alertes (ms) | 1000 |
| Notifications de performance | Envoyer des notifications en cas de problème | Activées, Désactivées |
| Email pour les alertes | Adresse email pour les alertes de performance | - |

### Métriques de Performance

La section Métriques de Performance affiche les métriques de performance en temps réel.

#### CPU

| Métrique | Description | Unité |
|----------|-------------|-------|
| Utilisation | Pourcentage d'utilisation du CPU | % |
| Nombre de cœurs | Nombre de cœurs CPU disponibles | - |
| Charge | Charge moyenne du système | - |

#### Mémoire

| Métrique | Description | Unité |
|----------|-------------|-------|
| Total | Mémoire totale disponible | MB |
| Utilisée | Mémoire actuellement utilisée | MB |
| Libre | Mémoire actuellement libre | MB |
| Utilisation | Pourcentage d'utilisation de la mémoire | % |

#### Disque

| Métrique | Description | Unité |
|----------|-------------|-------|
| Total | Espace disque total | GB |
| Utilisé | Espace disque utilisé | GB |
| Libre | Espace disque libre | GB |
| Utilisation | Pourcentage d'utilisation du disque | % |

#### Réseau

| Métrique | Description | Unité |
|----------|-------------|-------|
| Entrant | Trafic réseau entrant | KB/s |
| Sortant | Trafic réseau sortant | KB/s |
| Connexions | Nombre de connexions actives | - |

#### Base de données

| Métrique | Description | Unité |
|----------|-------------|-------|
| Connexions | Nombre de connexions à la base de données | - |
| Temps de requête | Temps moyen des requêtes | ms |
| Requêtes lentes | Nombre de requêtes lentes | - |

#### API

| Métrique | Description | Unité |
|----------|-------------|-------|
| Requêtes | Nombre de requêtes API | - |
| Temps de réponse | Temps moyen de réponse | ms |
| Erreurs | Nombre d'erreurs API | - |
