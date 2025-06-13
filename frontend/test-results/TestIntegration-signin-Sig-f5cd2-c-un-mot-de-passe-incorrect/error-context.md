# Page snapshot

```yaml
- heading "Bienvenue sur Propelize" [level=1]
- paragraph: Connectez-vous pour accéder à votre compte
- text: Name
- textbox "Name": TestUser
- text: Mot de passe
- textbox "Mot de passe": wrongpassword
- checkbox "Se souvenir de moi"
- text: Se souvenir de moi
- link "Mot de passe oublié ?":
  - /url: /auth/forgot-password
- button "Connexion en cours..." [disabled]
- paragraph:
  - text: Pas encore de compte ?
  - link "S'inscrire":
    - /url: /auth/signup
- alert
- button "Open Next.js Dev Tools":
  - img
```