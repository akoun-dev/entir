import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Avatar } from '../ui/avatar';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Card } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { PaperclipIcon, Send, User, Clock, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getMessages, sendMessage, Message, Attachment } from '@/services/chatterService';

interface ChatterProps {
  modelName: string;
  modelId: number;
  className?: string;
  collapsed?: boolean;
}

/**
 * Composant Chatter - Système de messagerie et suivi des modifications
 * Permet d'ajouter des messages, des pièces jointes et de suivre l'historique des modifications
 *
 * Ce composant s'inspire du système de chatter d'Odoo pour fournir une interface
 * de communication contextuelle liée à n'importe quel enregistrement du système.
 */
const Chatter: React.FC<ChatterProps> = ({
  modelName,
  modelId,
  className,
  collapsed = false
}) => {
  const [newMessage, setNewMessage] = useState('');
  const [activeTab, setActiveTab] = useState('messages');
  const [isExpanded, setIsExpanded] = useState(!collapsed);
  const queryClient = useQueryClient();

  // Récupération des messages
  const { data: messages = [], isLoading } = useQuery({
    queryKey: ['chatter', modelName, modelId, activeTab],
    queryFn: async () => {
      // Utiliser le service pour récupérer les messages
      const type = activeTab === 'logs' ? 'logs' : 'messages';
      return getMessages(modelName, modelId, type);
    }
  });

  // Mutation pour envoyer un nouveau message
  const sendMessageMutation = useMutation({
    mutationFn: async (content: string) => {
      // Utiliser le service pour envoyer le message
      return sendMessage(modelName, modelId, content);
    },
    onSuccess: () => {
      // Réinitialiser le champ de message
      setNewMessage('');

      // Invalider la requête pour recharger les messages
      queryClient.invalidateQueries({ queryKey: ['chatter', modelName, modelId] });
    }
  });

  // Gérer l'envoi du message
  const handleSendMessage = () => {
    if (newMessage.trim()) {
      sendMessageMutation.mutate(newMessage);
    }
  };

  // Gérer l'appui sur Entrée (envoyer le message)
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isExpanded) {
    return (
      <Button
        variant="ghost"
        className={cn("w-full flex justify-between items-center", className)}
        onClick={() => setIsExpanded(true)}
      >
        <MessageSquare className="h-4 w-4 mr-2" />
        <span>Afficher les messages et le suivi</span>
      </Button>
    );
  }

  return (
    <Card className={cn("p-4", className)}>
      {/* En-tête du chatter */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Messages et activités</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(false)}
        >
          Réduire
        </Button>
      </div>

      {/* Onglets */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full">
          <TabsTrigger value="messages" className="flex-1">
            <MessageSquare className="h-4 w-4 mr-2" />
            Messages
          </TabsTrigger>
          <TabsTrigger value="logs" className="flex-1">
            <Clock className="h-4 w-4 mr-2" />
            Historique
          </TabsTrigger>
        </TabsList>

        {/* Contenu des onglets */}
        <TabsContent value="messages" className="mt-4 space-y-4">
          {/* Liste des messages */}
          <div className="space-y-4 max-h-60 overflow-y-auto">
            {isLoading ? (
              <div className="text-center py-4">Chargement des messages...</div>
            ) : messages.length === 0 ? (
              <div className="text-center py-4 text-muted-foreground">
                Aucun message pour le moment
              </div>
            ) : (
              messages
                .filter(msg => !msg.isSystemMessage)
                .map(message => (
                  <MessageItem key={message.id} message={message} />
                ))
            )}
          </div>

          {/* Formulaire d'envoi de message */}
          <div className="pt-4 border-t">
            <Textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Écrivez un message..."
              className="min-h-24 mb-2"
            />
            <div className="flex justify-between">
              <Button variant="outline" size="sm">
                <PaperclipIcon className="h-4 w-4 mr-2" />
                Pièce jointe
              </Button>
              <Button
                onClick={handleSendMessage}
                disabled={!newMessage.trim() || sendMessageMutation.isPending}
              >
                <Send className="h-4 w-4 mr-2" />
                Envoyer
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="logs" className="mt-4">
          <div className="space-y-4 max-h-60 overflow-y-auto">
            {isLoading ? (
              <div className="text-center py-4">Chargement de l'historique...</div>
            ) : messages.length === 0 ? (
              <div className="text-center py-4 text-muted-foreground">
                Aucune activité enregistrée
              </div>
            ) : (
              messages
                .filter(msg => msg.isSystemMessage)
                .map(message => (
                  <LogItem key={message.id} message={message} />
                ))
            )}
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

// Composant pour afficher un message
const MessageItem: React.FC<{ message: Message }> = ({ message }) => {
  return (
    <div className="flex gap-3">
      <Avatar className="h-8 w-8">
        {message.user.avatar ? (
          <img src={message.user.avatar} alt={message.user.name} />
        ) : (
          <User className="h-4 w-4" />
        )}
      </Avatar>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="font-medium">{message.user.name}</span>
          <span className="text-xs text-muted-foreground">
            {new Date(message.createdAt).toLocaleString()}
          </span>
        </div>
        <div className="mt-1 text-sm whitespace-pre-wrap">{message.content}</div>

        {/* Affichage des pièces jointes */}
        {message.attachments && message.attachments.length > 0 && (
          <div className="mt-2 space-y-1">
            {message.attachments.map(attachment => (
              <div key={attachment.id} className="flex items-center gap-2 text-xs">
                <PaperclipIcon className="h-3 w-3" />
                <a href={attachment.url} className="text-primary hover:underline">
                  {attachment.name}
                </a>
                <span className="text-muted-foreground">
                  ({Math.round(attachment.size / 1024)} Ko)
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Composant pour afficher un élément de log
const LogItem: React.FC<{ message: Message }> = ({ message }) => {
  return (
    <div className="flex gap-3">
      <div className="h-8 w-8 flex items-center justify-center rounded-full bg-muted">
        <Clock className="h-4 w-4 text-muted-foreground" />
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">
            {new Date(message.createdAt).toLocaleString()}
          </span>
        </div>
        <div className="mt-1 text-sm">{message.content}</div>
      </div>
    </div>
  );
};

export default Chatter;
