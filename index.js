import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { rateLimit } from 'express-rate-limit';
import { router as backOfficeRouter } from './src/routers/backOffice/index.js';
import { router as apiRouter } from './src/routers/index.js';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';

dotenv.config();
const app = express();
app.set('trust proxy', 1);

// Désactiver le header x-powered-by Express
app.disable('x-powered-by');

// Adresses autorisées pour CORS
const allowedOrigins = process.env.CORS_ORIGIN.split(',');

// Configure Express pour faire confiance aux proxies

// app.set('trust proxy', 3);

// app.use(
//   helmet({
//     contentSecurityPolicy: false,
//   }),
// );
//todo a modifier une fois le backOffice géré
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        fontSrc: [
          "'self'",
          'data:',
          'https://greenrootsback-production.up.railway.app',
        ],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-hashes'"],
        scriptSrcAttr: ["'unsafe-inline'"],
        connectSrc: ["'self'"],
        imgSrc: ["'self'", 'data:'],
      },
    },
    referrerPolicy: { policy: 'no-referrer' },
    crossOriginEmbedderPolicy: true,
  }),
);
app.use(helmet.xssFilter());

const corsOptions = {
  // origin: [
  // 'http://localhost:5173', // Origine pour le développement local
  // 'https://greenroots-front.vercel.app', // Origine pour la production
  allowedOrigins,
  // ],
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};
app.use(cors(corsOptions));

// Gérer les requêtes préflight (OPTIONS)
app.options('*', cors(corsOptions));

// Désactivation du cache pour les réponses
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  next();
});

// Ajout du cookie parser pour le backOffice
app.use(cookieParser());

//TODO A MODIFIER POUR LA PROD SUR LA LIMITATION
// Limitation de la fréquence des requêtes
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 1 minutes).
  standardHeaders: true, // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
});

// Applique la limitation à toutes les requêtes
app.use(limiter);

// Ajout du body parser
app.use(express.urlencoded({ extended: true })); // Body parser pour les body des <form> (mettre true pour permettre la lecture de form en HTML)
app.use(express.json({ limit: '10kb' })); // Body parser pour routes API pour les body de type "JSON"

// Routes API
app.use('/api', apiRouter);

// Configuration du moteur de vue
app.set('view engine', 'ejs');
app.set('views', './src/views');
app.use(express.static('public'));

// Route pour le backoffice
app.use('/admin', backOfficeRouter);

// Route racine
app.use('/', (req, res) => {
  res.send("<h1>Bienvenue sur l'API de GreenRoots</h1>");
});
console.log('Environment Variables:', process.env);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
