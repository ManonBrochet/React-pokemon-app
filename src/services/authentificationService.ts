export default class AuthentificationService {
  static isAuthenticated = false;
  static token: string | null = null;

  static async login(email: string, password: string): Promise<boolean> {
    try {
      //on envoie en post vers le back les données de connexion
      const response = await fetch('http://localhost:8000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
      if (!response.ok) {
        return false;
      }
      //si on obtient une réponse ok
      const data = await response.json();
      console.log('Login response data:', data);
      if (data.token) {
        //on enregistre le token dans le localStorge du navigateur
        localStorage.setItem('authToken', data.token);
        this.token = data.token;
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  }
}