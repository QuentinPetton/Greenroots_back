import bcrypt from 'bcrypt';

async function hashPassword(password) {
  const saltRounds = 10; // Le sel utilisé
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  console.log(`Mot de passe : ${password}`);
  console.log(`Haché : ${hashedPassword}`);
}

hashPassword('motdepasse1');
