import db from '../models/index.js';

(async () => {
  const { Role } = db;

  await Role.findOrCreate({ where: { id: 1 }, defaults: { name: 'admin' } });
  await Role.findOrCreate({ where: { id: 2 }, defaults: { name: 'user' } });

  console.log('✅ Roles seeded');
  process.exit();
})();
