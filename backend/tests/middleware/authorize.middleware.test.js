const authorize = require('../../middleware/authorize.middleware');

describe('CT-UM-04 – Accès refusé si rôle non autorisé (authorize)', () => {
  it('renvoie 403 si le rôle utilisateur n’est pas autorisé', () => {
    const req = {
      headers: {
        'x-user-role': 'user' // rôle actuel
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const next = jest.fn();

    const middleware = authorize('admin'); // seul "admin" est autorisé
    middleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ message: 'Forbidden' });
    expect(next).not.toHaveBeenCalled();
  });

  describe(' CT-UM-05 – Accès autorisé si rôle permis (authorize)', () => {
    it('appelle next() si le rôle utilisateur est autorisé', () => {
      const req = {
        headers: {
          'x-user-role': 'admin' // rôle actuel
        }
      };
      const res = {
        status: jest.fn(),
        json: jest.fn()
      };
      const next = jest.fn();

      const middleware = authorize(['admin']); // "admin" est autorisé
      middleware(req, res, next);

      expect(next).toHaveBeenCalled();            // accès autorisé
      expect(res.status).not.toHaveBeenCalled();  // aucune erreur
      expect(res.json).not.toHaveBeenCalled();
    });
  });
});
