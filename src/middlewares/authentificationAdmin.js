import jwt from 'jsonwebtoken';

export default function verifyTokenAdmin(req, res, next) {
  // Récupérer le token stocké dans les cookies
  const token = req.cookies.token;

  // Vérifier que le token est présent et qu'il suit le format "Bearer <token>"
  if (!token) {
    return res
      .status(401)
      .send(
        'Accès refusé : token manquant ou incorrect<br><a href="/admin">Se connecter</a>',
      );
  }

  try {
    // Vérifier que le token est valide et décoder le payload
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Stocker l'identifiant de l'utilisateur dans la requête pour l'utiliser dans les routes suivantes
    req.userId = decoded.userId;
    next();
  } catch (error) {
    // Si le token est invalide ou a expiré
    res.status(401).send('Token invalide');
  }
}
