import api from './api';

export interface LoginCredentials {
  name: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  role: 'user' | 'admin';
}

export interface AuthResponse {
  accessToken: string;
  id: string;
  name: string;
  role: string;
  user: {
    id: string;
    name: string;
    role: string;
  };
}

class AuthService {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      console.log('Attempting login for user:', credentials.name); // Debug log
      const response = await api.post<AuthResponse>('users/login', credentials);
  
      // Stocker les informations de l'utilisateur dans localStorage
    
        localStorage.setItem('user', JSON.stringify(response.data));
        console.log('User data stored in localStorage:', response.data);
      
      return response.data;
    } catch (error) {
       
      console.error('Login error:', error);
      throw error
    }
  }

  async register(data: RegisterData): Promise<AuthResponse> {
    try {
      console.log('Attempting registration for user:', data.name); // Debug log
      const response = await api.post<AuthResponse>('users/register', data);
  
      // Stocker les informations de l'utilisateur dans localStorage
   
        localStorage.setItem('user', JSON.stringify(response.data));
        console.log('User data stored in localStorage:', response.data);
  
      return response.data;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }

  async logout(): Promise<AuthResponse> {
    try {
      
      const response = await api.post<AuthResponse>('users/logout');
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  async refreshaccessToken(): Promise<AuthResponse> {
    try {
      console.log('Attempting accessToken refresh'); // Debug log
      const response = await api.post<AuthResponse>('users/refresh');
      const { accessToken } = response.data;
      
      if (!accessToken) {
        throw new Error('Invalid refresh accessToken response');
      }

      localStorage.setItem('accessToken', accessToken);
      console.log('accessToken refresh successful'); // Debug log
      return response.data;
    } catch (error) {
      console.error('accessToken refresh error:', error);
      localStorage.removeItem('accessToken');
      throw error;
    }
  }

  async updateProfile(id: string, name: string): Promise<AuthResponse> {
    try {
      console.log('Attempting profile update for user:', id); // Debug log
      const response = await api.put<AuthResponse>(`users/update/${id}`, { name });
      console.log('Profile update successful'); // Debug log
      return response.data;
    } catch (error) {
      console.error('Profile update error:', error);
      throw error;
    }
  }

  async updateRole(id: string, role: 'user' | 'admin'): Promise<AuthResponse> {
    try {
      console.log('Attempting role update for user:', id); // Debug log
      const response = await api.put<AuthResponse>(`users/update/role/${id}`, { role });
      console.log('Role update successful'); // Debug log
      return response.data;
    } catch (error) {
      console.error('Role update error:', error);
      throw error;
    }
  }

  getCurrentUser(): AuthResponse['user'] | null {
    try {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        console.log('No accessToken found'); // Debug log
        return null;
      }
      
      const base64Url = accessToken.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      
      const user = JSON.parse(jsonPayload);
      console.log('Current user:', user); // Debug log
      return user;
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  }

  isAuthenticated(): boolean {
    const accessToken = localStorage.getItem('accessToken');
    const isAuth = !!accessToken;
    console.log('Authentication status:', isAuth); // Debug log
    return isAuth;
  }
}

export const authService = new AuthService(); 