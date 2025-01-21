import 'dotenv/config';

import { Sequelize } from 'sequelize';
// Définir une URL par défaut pour le développement local
const DATABASE_URL =
  process.env.PG_URL ||
  'postgres://greenroots:greenroots@localhost:5432/greenroots';

export const sequelize = new Sequelize(DATABASE_URL, {
  define: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
});
