/**
 * Service pour gérer les interactions avec l'API du chatter
 *
 * Ce service fournit des méthodes pour récupérer et envoyer des messages,
 * ainsi que pour gérer les pièces jointes liées à n'importe quel enregistrement.
 *
 * Dans une implémentation réelle, ces méthodes feraient des appels API vers le backend.
 * Pour l'instant, elles simulent des réponses avec des délais.
 */

// Types
export interface Message {
  id: number;
  content: string;
  createdAt: string;
  user: {
    id: number;
    name: string;
    avatar?: string;
  };
  isSystemMessage?: boolean;
  attachments?: Attachment[];
}

export interface Attachment {
  id: number;
  name: string;
  url: string;
  size: number;
  type: string;
}

/**
 * Récupère les messages pour un modèle et un ID spécifiques
 *
 * @param modelName - Nom du modèle (ex: "employee", "invoice", etc.)
 * @param modelId - ID de l'enregistrement
 * @param type - Type de messages à récupérer: 'messages' (messages utilisateur), 'logs' (messages système) ou 'all' (tous)
 * @returns Promise contenant un tableau de messages
 */
export const getMessages = async (modelName: string, modelId: number, type: 'messages' | 'logs' | 'all' = 'all'): Promise<Message[]> => {
  try {
    // Dans une implémentation réelle, cela ferait un appel API
    // const response = await fetch(`/api/chatter/${modelName}/${modelId}?type=${type}`);
    // return await response.json();

    // Simulation d'un délai réseau
    await new Promise(resolve => setTimeout(resolve, 500));

    // Données de test
    const messages: Message[] = [
      {
        id: 1,
        content: "Message de test",
        createdAt: new Date().toISOString(),
        user: {
          id: 1,
          name: "John Doe",
          avatar: ""
        },
        attachments: []
      },
      {
        id: 2,
        content: "Réponse au message",
        createdAt: new Date(Date.now() - 3600000).toISOString(),
        user: {
          id: 2,
          name: "Jane Smith",
          avatar: ""
        }
      },
      {
        id: 3,
        content: "Document mis à jour: Champ 'Statut' modifié de 'Brouillon' à 'Validé'",
        createdAt: new Date(Date.now() - 7200000).toISOString(),
        user: {
          id: 1,
          name: "Système",
          avatar: ""
        },
        isSystemMessage: true
      }
    ];

    // Filtrer selon le type demandé
    if (type === 'messages') {
      return messages.filter(msg => !msg.isSystemMessage);
    } else if (type === 'logs') {
      return messages.filter(msg => msg.isSystemMessage);
    }

    return messages;
  } catch (error) {
    console.error('Erreur lors de la récupération des messages:', error);
    throw error;
  }
};

/**
 * Envoie un nouveau message
 *
 * @param modelName - Nom du modèle auquel le message est associé
 * @param modelId - ID de l'enregistrement auquel le message est associé
 * @param content - Contenu du message
 * @returns Promise contenant le message créé
 */
export const sendMessage = async (modelName: string, modelId: number, content: string): Promise<Message> => {
  try {
    // Dans une implémentation réelle, cela ferait un appel API
    // const response = await fetch(`/api/chatter/${modelName}/${modelId}`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ content }),
    // });
    // return await response.json();

    // Simulation d'un délai réseau
    await new Promise(resolve => setTimeout(resolve, 500));

    // Simuler une réponse
    return {
      id: Date.now(),
      content,
      createdAt: new Date().toISOString(),
      user: {
        id: 1,
        name: "John Doe",
        avatar: ""
      }
    };
  } catch (error) {
    console.error('Erreur lors de l\'envoi du message:', error);
    throw error;
  }
};

/**
 * Télécharge une pièce jointe
 *
 * @param modelName - Nom du modèle auquel la pièce jointe est associée
 * @param modelId - ID de l'enregistrement auquel la pièce jointe est associée
 * @param file - Fichier à télécharger
 * @returns Promise contenant les informations sur la pièce jointe créée
 */
export const uploadAttachment = async (modelName: string, modelId: number, file: File): Promise<Attachment> => {
  try {
    // Dans une implémentation réelle, cela ferait un appel API avec FormData
    // const formData = new FormData();
    // formData.append('file', file);
    //
    // const response = await fetch(`/api/chatter/${modelName}/${modelId}/attachments`, {
    //   method: 'POST',
    //   body: formData,
    // });
    // return await response.json();

    // Simulation d'un délai réseau
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Simuler une réponse
    return {
      id: Date.now(),
      name: file.name,
      url: URL.createObjectURL(file), // Ceci est temporaire et ne fonctionnera que pendant la session
      size: file.size,
      type: file.type
    };
  } catch (error) {
    console.error('Erreur lors du téléchargement de la pièce jointe:', error);
    throw error;
  }
};
