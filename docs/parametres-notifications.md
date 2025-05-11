# Paramètres de Notifications

## Configuration Générale des Notifications

La section Configuration Générale permet de configurer les paramètres globaux du système de notifications.

| Paramètre | Description | Valeur par défaut |
|-----------|-------------|-------------------|
| Notifications par email | Activer les notifications par email | Activé |
| Notifications par SMS | Activer les notifications par SMS | Activé |
| Notifications dans l'application | Activer les notifications in-app | Activé |
| Notifications webhook | Activer les notifications webhook | Activé |
| Nombre maximum de tentatives | Nombre de tentatives en cas d'échec d'envoi | 3 |
| Délai entre les tentatives | Délai entre les tentatives (minutes) | 15 |
| Durée de conservation | Durée de conservation des notifications (jours) | 90 |
| Nombre maximum de notifications par jour | Limite quotidienne par utilisateur | 50 |
| Regroupement des notifications | Activer le regroupement des notifications similaires | Activé |
| Intervalle de regroupement | Intervalle pour le regroupement (minutes) | 15 |

### Paramètres Avancés

| Paramètre | Description | Valeur par défaut |
|-----------|-------------|-------------------|
| Limitation des emails | Activer la limitation du nombre d'emails | Activé |
| Maximum d'emails par heure | Nombre maximum d'emails par heure | 100 |
| Maximum d'emails par jour | Nombre maximum d'emails par jour | 500 |
| Limitation des SMS | Activer la limitation du nombre de SMS | Activé |
| Maximum de SMS par heure | Nombre maximum de SMS par heure | 20 |
| Maximum de SMS par jour | Nombre maximum de SMS par jour | 100 |
| Priorité élevée contourne les limites | Les notifications prioritaires ignorent les limites | Activé |
| Délai pour priorité basse | Délai pour les notifications non prioritaires (minutes) | 60 |
| Heures de livraison | Restreindre la livraison à certaines heures | Activé |
| Début des heures de livraison | Heure de début pour l'envoi des notifications | 08:00 |
| Fin des heures de livraison | Heure de fin pour l'envoi des notifications | 20:00 |
| Fuseau horaire | Fuseau horaire pour les heures de livraison | Europe/Paris |
| Respecter les week-ends | Ne pas envoyer de notifications le week-end | Activé |
| Langue par défaut des modèles | Langue par défaut pour les modèles | fr-FR |
| Langue de secours | Langue utilisée si la traduction n'existe pas | en-US |

## Canaux de Notification

La section Canaux de Notification permet de configurer les différents canaux par lesquels les notifications peuvent être envoyées.

### Email

| Paramètre | Description | Options |
|-----------|-------------|---------|
| Nom | Nom unique du canal | Email principal |
| Type | Type de canal | email |
| Description | Description du canal | Notifications par email |
| Utiliser SMTP | Utiliser un serveur SMTP | Oui, Non |
| Serveur SMTP | Adresse du serveur SMTP | smtp.example.com |
| Port SMTP | Port de connexion SMTP | 587 |
| Utiliser TLS | Sécuriser la connexion avec TLS | Oui, Non |
| Email expéditeur | Adresse email utilisée comme expéditeur | notifications@example.com |
| Nom expéditeur | Nom affiché comme expéditeur | Système de notification |
| Actif | État d'activation du canal | Actif, Inactif |
| Ordre d'affichage | Position dans la liste des canaux | 1 |
| Icône | Icône représentant le canal | mail |

### SMS

| Paramètre | Description | Options |
|-----------|-------------|---------|
| Nom | Nom unique du canal | SMS professionnel |
| Type | Type de canal | sms |
| Description | Description du canal | Notifications par SMS |
| Fournisseur | Fournisseur de service SMS | twilio, nexmo, etc. |
| ID de compte | Identifiant du compte chez le fournisseur | AC_EXAMPLE |
| Jeton d'authentification | Jeton d'authentification | AUTH_TOKEN_EXAMPLE |
| Numéro expéditeur | Numéro de téléphone expéditeur | +33600000000 |
| Actif | État d'activation du canal | Actif, Inactif |
| Ordre d'affichage | Position dans la liste des canaux | 2 |
| Icône | Icône représentant le canal | smartphone |

### Application (In-App)

| Paramètre | Description | Options |
|-----------|-------------|---------|
| Nom | Nom unique du canal | Application |
| Type | Type de canal | in_app |
| Description | Description du canal | Notifications dans l'application |
| Nombre maximum de notifications | Limite par utilisateur | 100 |
| Suppression automatique | Supprimer automatiquement les anciennes notifications | Oui, Non |
| Délai de suppression | Délai avant suppression automatique (jours) | 30 |
| Actif | État d'activation du canal | Actif, Inactif |
| Ordre d'affichage | Position dans la liste des canaux | 3 |
| Icône | Icône représentant le canal | bell |

### Webhook

| Paramètre | Description | Options |
|-----------|-------------|---------|
| Nom | Nom unique du canal | Webhook Slack |
| Type | Type de canal | webhook |
| Description | Description du canal | Notifications vers Slack |
| URL | URL du webhook | https://hooks.slack.com/services/EXAMPLE |
| En-têtes | En-têtes HTTP à inclure | Content-Type: application/json |
| Méthode | Méthode HTTP à utiliser | POST |
| Actif | État d'activation du canal | Actif, Inactif |
| Ordre d'affichage | Position dans la liste des canaux | 4 |
| Icône | Icône représentant le canal | webhook |

## Modèles de Notification

La section Modèles de Notification permet de configurer les modèles de contenu pour les notifications.

### Nouveau message

| Paramètre | Description | Valeur |
|-----------|-------------|--------|
| Nom | Nom unique du modèle | Nouveau message |
| Événement | Code de l'événement associé | message.received |
| Sujet | Sujet pour les emails | Vous avez reçu un nouveau message |
| Contenu | Contenu textuel de la notification | Vous avez reçu un nouveau message de {{sender}}. |
| Contenu HTML | Contenu HTML pour les emails | `<p>Vous avez reçu un nouveau message de <strong>{{sender}}</strong>.</p><p>Message: {{message}}</p>` |
| Variables | Variables disponibles dans le modèle | sender, message, date |
| Actif | État d'activation du modèle | Actif |
| Catégorie | Catégorie du modèle | communication |
| Langue | Langue du modèle | fr-FR |
| Canaux | Canaux utilisés pour ce modèle | Email, SMS, Application, Webhook |

### Tâche assignée

| Paramètre | Description | Valeur |
|-----------|-------------|--------|
| Nom | Nom unique du modèle | Tâche assignée |
| Événement | Code de l'événement associé | task.assigned |
| Sujet | Sujet pour les emails | Une nouvelle tâche vous a été assignée |
| Contenu | Contenu textuel de la notification | La tâche "{{taskName}}" vous a été assignée par {{assignedBy}}. Date d'échéance: {{dueDate}}. |
| Contenu HTML | Contenu HTML pour les emails | `<p>La tâche <strong>"{{taskName}}"</strong> vous a été assignée par {{assignedBy}}.</p><p>Date d'échéance: {{dueDate}}</p><p>Description: {{description}}</p>` |
| Variables | Variables disponibles dans le modèle | taskName, assignedBy, dueDate, description, priority |
| Actif | État d'activation du modèle | Actif |
| Catégorie | Catégorie du modèle | task |
| Langue | Langue du modèle | fr-FR |
| Canaux | Canaux utilisés pour ce modèle | Email, Application |

### Rappel de rendez-vous

| Paramètre | Description | Valeur |
|-----------|-------------|--------|
| Nom | Nom unique du modèle | Rappel de rendez-vous |
| Événement | Code de l'événement associé | appointment.reminder |
| Sujet | Sujet pour les emails | Rappel de votre rendez-vous |
| Contenu | Contenu textuel de la notification | Rappel: Vous avez un rendez-vous "{{title}}" le {{date}} à {{time}}. |
| Contenu HTML | Contenu HTML pour les emails | `<p>Rappel: Vous avez un rendez-vous <strong>"{{title}}"</strong> le {{date}} à {{time}}.</p><p>Lieu: {{location}}</p><p>Notes: {{notes}}</p>` |
| Variables | Variables disponibles dans le modèle | title, date, time, location, notes, participants |
| Actif | État d'activation du modèle | Actif |
| Catégorie | Catégorie du modèle | calendar |
| Langue | Langue du modèle | fr-FR |
| Canaux | Canaux utilisés pour ce modèle | Email, SMS, Application |

### Alerte de sécurité

| Paramètre | Description | Valeur |
|-----------|-------------|--------|
| Nom | Nom unique du modèle | Alerte de sécurité |
| Événement | Code de l'événement associé | security.alert |
| Sujet | Sujet pour les emails | Alerte de sécurité importante |
| Contenu | Contenu textuel de la notification | Alerte de sécurité: {{alertType}}. Détails: {{details}} |
| Contenu HTML | Contenu HTML pour les emails | `<p><strong>Alerte de sécurité: {{alertType}}</strong></p><p>Détails: {{details}}</p><p>Date et heure: {{timestamp}}</p><p>IP: {{ipAddress}}</p>` |
| Variables | Variables disponibles dans le modèle | alertType, details, timestamp, ipAddress, location, device |
| Actif | État d'activation du modèle | Actif |
| Catégorie | Catégorie du modèle | security |
| Langue | Langue du modèle | fr-FR |
| Canaux | Canaux utilisés pour ce modèle | Email, SMS, Application, Webhook |

### Mise à jour système

| Paramètre | Description | Valeur |
|-----------|-------------|--------|
| Nom | Nom unique du modèle | Mise à jour système |
| Événement | Code de l'événement associé | system.update |
| Sujet | Sujet pour les emails | Mise à jour système prévue |
| Contenu | Contenu textuel de la notification | Une mise à jour système est prévue le {{date}} à {{time}}. Durée estimée: {{duration}}. |
| Contenu HTML | Contenu HTML pour les emails | `<p>Une mise à jour système est prévue le <strong>{{date}}</strong> à <strong>{{time}}</strong>.</p><p>Durée estimée: {{duration}}</p><p>Impact: {{impact}}</p><p>Notes: {{notes}}</p>` |
| Variables | Variables disponibles dans le modèle | date, time, duration, impact, notes, version |
| Actif | État d'activation du modèle | Actif |
| Catégorie | Catégorie du modèle | system |
| Langue | Langue du modèle | fr-FR |
| Canaux | Canaux utilisés pour ce modèle | Email, Application |

## Préférences de Notification

La section Préférences de Notification permet de configurer les préférences de notification par utilisateur et par type d'événement.

| Paramètre | Description | Options |
|-----------|-------------|---------|
| Utilisateur | Utilisateur concerné par la préférence | - |
| Type d'événement | Type d'événement concerné | message.received, task.assigned, etc. |
| Canaux activés | Canaux par lesquels l'utilisateur souhaite recevoir les notifications | Email, SMS, Application, Webhook |
| Fréquence | Fréquence d'envoi des notifications | Immédiate, Quotidienne, Hebdomadaire |
| Heure préférée | Heure préférée pour les notifications regroupées | HH:MM |
| Jour préféré | Jour préféré pour les notifications hebdomadaires | Lundi, Mardi, Mercredi, Jeudi, Vendredi, Samedi, Dimanche |
| Actif | État d'activation de la préférence | Actif, Inactif |
