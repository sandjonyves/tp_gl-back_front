import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import api from './services/api'; // Votre configuration Axios

// Liste des routes protégées
const protectedRoutes = ['/dashboard', '/vehicles'];
// Liste des routes d'authentification
const authRoutes = ['/auth/signin', '/auth/signup'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Vérifier si l'utilisateur est authentifié
  const accessToken = request.cookies.get('accessToken')?.value;

  // Si la route est protégée et qu'il n'y a pas de token
  if (!accessToken && protectedRoutes.some(route => pathname.startsWith(route))) {
    console.log('No access token, redirecting to signin');
    return NextResponse.redirect(new URL('/auth/signin', request.url));
  }

  // Si un token est présent, valider optionnellement avec le backend
  let isAuthenticated = !!accessToken;

  // Si l'utilisateur est authentifié et accède à une route d'authentification
  if (isAuthenticated && authRoutes.some(route => pathname.startsWith(route))) {
    console.log('Authenticated user, redirecting to dashboard');
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

//   Autoriser la requête à continuer
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match toutes les routes sauf API, fichiers statiques, et favicon
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};