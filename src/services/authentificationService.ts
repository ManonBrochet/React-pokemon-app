export default class AuthentificationService {
  static isAuthenticated = false;
  static token: string | null = null;

  static async login(email: string, password: string): Promise<boolean> {
    try {
      // Envoi des identifiants au backend
      const response = await fetch('http://localhost:8000/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        console.error('Login failed with status:', response.status);
        return false;
      }

      // Traitement de la réponse
      const data = await response.json();
      console.log('Login response data:', data);

      if (data.token) {
        // Enregistrement du token dans le localStorage
        localStorage.setItem('authToken', data.token);
        this.token = data.token;
        this.isAuthenticated = true;
        return true;
      }

      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  }

  static logout(): void {
    // Nettoyage lors de la déconnexion
    localStorage.removeItem('authToken');
    this.token = null;
    this.isAuthenticated = false;
  }

  static isLoggedIn(): boolean {
    // Vérification si l'utilisateur est connecté
    const token = localStorage.getItem('authToken');
    return token !== null;
  }

  static getToken(): string | null {
    // Récupération du token depuis le localStorage
    return localStorage.getItem('authToken');
  }
}