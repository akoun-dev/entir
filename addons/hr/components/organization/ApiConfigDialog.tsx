import React, { useState, useEffect } from 'react';
import { Button } from '../../../../src/components/ui/button';
import { Input } from '../../../../src/components/ui/input';
import { Switch } from '../../../../src/components/ui/switch';
import { Label } from '../../../../src/components/ui/label';
import { 
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from '../../../../src/components/ui/dialog';
import { toast } from 'sonner';
import { Loader2, CheckCircle, XCircle, AlertTriangle, Database } from 'lucide-react';
import ApiService from '../../services/apiService';
import organizationApiService from '../../services/organizationApiService';

interface ApiConfigDialogProps {
  onClose: () => void;
  onSave: () => void;
}

const ApiConfigDialog: React.FC<ApiConfigDialogProps> = ({ onClose, onSave }) => {
  const [apiUrl, setApiUrl] = useState<string>('/api');
  const [organizationEndpoint, setOrganizationEndpoint] = useState<string>('/organization');
  const [token, setToken] = useState<string>('');
  const [timeout, setTimeout] = useState<number>(15);
  const [fallbackEnabled, setFallbackEnabled] = useState<boolean>(true);
  const [isTesting, setIsTesting] = useState<boolean>(false);
  const [connectionStatus, setConnectionStatus] = useState<'none' | 'testing' | 'success' | 'error'>('none');
  
  // Charger la configuration actuelle
  useEffect(() => {
    try {
      const savedConfig = localStorage.getItem('api_config');
      if (savedConfig) {
        const config = JSON.parse(savedConfig);
        if (config.apiUrl) setApiUrl(config.apiUrl);
        if (config.organizationEndpoint) setOrganizationEndpoint(config.organizationEndpoint);
        if (config.timeout) setTimeout(config.timeout);
        if (config.fallbackEnabled !== undefined) setFallbackEnabled(config.fallbackEnabled);
      }
    } catch (error) {
      console.error('Error loading API configuration:', error);
    }
  }, []);

  // Sauvegarder la configuration
  const handleSave = () => {
    try {
      // Initialiser l'API avec les paramètres
      ApiService.initialize({
        baseUrl: apiUrl,
        token: token || undefined,
        timeout: timeout * 1000, // Convertir en millisecondes
      });
      
      // Configurer le service d'organisation
      organizationApiService.configure({
        apiBaseUrl: organizationEndpoint,
        fallbackEnabled,
      });
      
      // Sauvegarder la configuration dans localStorage
      const config = {
        apiUrl,
        organizationEndpoint,
        timeout,
        fallbackEnabled,
      };
      localStorage.setItem('api_config', JSON.stringify(config));
      
      toast.success('Configuration API enregistrée');
      onSave();
      onClose();
    } catch (error) {
      console.error('Error saving API configuration:', error);
      toast.error('Erreur lors de l\'enregistrement de la configuration');
    }
  };

  // Tester la connexion à l'API
  const handleTestConnection = async () => {
    setIsTesting(true);
    setConnectionStatus('testing');
    
    try {
      // Initialiser temporairement l'API pour le test
      ApiService.initialize({
        baseUrl: apiUrl,
        token: token || undefined,
        timeout: timeout * 1000,
      });
      
      // Configurer temporairement le service d'organisation
      organizationApiService.configure({
        apiBaseUrl: organizationEndpoint,
      });
      
      // Tester la connexion
      const isConnected = await organizationApiService.testConnection();
      
      if (isConnected) {
        setConnectionStatus('success');
        toast.success('Connexion à l\'API réussie');
      } else {
        setConnectionStatus('error');
        toast.error('Échec de la connexion à l\'API');
      }
    } catch (error) {
      console.error('API connection test error:', error);
      setConnectionStatus('error');
      toast.error('Erreur lors du test de connexion');
    } finally {
      setIsTesting(false);
    }
  };

  // Réinitialiser la configuration
  const handleReset = () => {
    setApiUrl('/api');
    setOrganizationEndpoint('/organization');
    setToken('');
    setTimeout(15);
    setFallbackEnabled(true);
    setConnectionStatus('none');
    toast.info('Configuration réinitialisée');
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          <Database className="h-5 w-5" />
          Configuration de l'API
        </DialogTitle>
        <DialogDescription>
          Configurez la connexion à l'API pour utiliser des données réelles dans l'organigramme.
        </DialogDescription>
      </DialogHeader>
      
      <div className="space-y-4 py-4">
        <div className="space-y-2">
          <Label htmlFor="api-url">URL de base de l'API</Label>
          <Input
            id="api-url"
            value={apiUrl}
            onChange={(e) => setApiUrl(e.target.value)}
            placeholder="ex: https://api.example.com ou /api"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="organization-endpoint">Endpoint Organisation</Label>
          <Input
            id="organization-endpoint"
            value={organizationEndpoint}
            onChange={(e) => setOrganizationEndpoint(e.target.value)}
            placeholder="ex: /organization"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="api-token">Token d'authentification (optionnel)</Label>
          <Input
            id="api-token"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            type="password"
            placeholder="Token API (JWT, etc)"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="api-timeout">Timeout (secondes)</Label>
          <Input
            id="api-timeout"
            value={timeout}
            onChange={(e) => setTimeout(parseInt(e.target.value) || 15)}
            type="number"
            min="1"
            max="60"
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="fallback-mode">Mode fallback</Label>
            <p className="text-[0.8rem] text-muted-foreground">
              Utiliser des données simulées si l'API n'est pas disponible
            </p>
          </div>
          <Switch
            id="fallback-mode"
            checked={fallbackEnabled}
            onCheckedChange={setFallbackEnabled}
          />
        </div>
        
        <div className="pt-4 flex items-center gap-2">
          <Button
            onClick={handleTestConnection}
            disabled={isTesting}
            variant="outline"
            className="w-full"
          >
            {isTesting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Test en cours...
              </>
            ) : (
              'Tester la connexion'
            )}
          </Button>
          
          {connectionStatus === 'success' && (
            <div className="flex items-center text-green-600">
              <CheckCircle className="h-5 w-5 mr-1" />
              <span className="text-sm">Connecté</span>
            </div>
          )}
          
          {connectionStatus === 'error' && (
            <div className="flex items-center text-red-600">
              <XCircle className="h-5 w-5 mr-1" />
              <span className="text-sm">Échec</span>
            </div>
          )}
        </div>
        
        {connectionStatus === 'error' && (
          <div className="bg-amber-50 border border-amber-200 rounded p-3 flex items-start">
            <AlertTriangle className="h-5 w-5 text-amber-600 mr-2 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-amber-800">
              La connexion à l'API a échoué. Vérifiez l'URL et les paramètres d'authentification.
              <br />
              Si le mode fallback est activé, l'application utilisera des données simulées.
            </div>
          </div>
        )}
      </div>
      
      <DialogFooter className="flex justify-between items-center">
        <Button variant="outline" onClick={handleReset} type="button">
          Réinitialiser
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onClose}>
            Annuler
          </Button>
          <Button onClick={handleSave}>Enregistrer</Button>
        </div>
      </DialogFooter>
    </>
  );
};

export default ApiConfigDialog;
