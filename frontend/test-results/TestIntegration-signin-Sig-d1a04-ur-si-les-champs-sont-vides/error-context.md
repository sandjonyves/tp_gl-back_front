# Page snapshot

```yaml
- heading "Bienvenue sur Propelize" [level=1]
- paragraph: Connectez-vous pour accéder à votre compte
- text: Name
- textbox "Name"
- text: Mot de passe
- textbox "Mot de passe"
- checkbox "Se souvenir de moi"
- text: Se souvenir de moi
- link "Mot de passe oublié ?":
  - /url: /auth/forgot-password
- button "Se connecter"
- paragraph:
  - text: Pas encore de compte ?
  - link "S'inscrire":
    - /url: /auth/signup
- alert
- button "Open Next.js Dev Tools":
  - img
```