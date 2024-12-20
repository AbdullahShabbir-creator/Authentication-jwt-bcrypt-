const bcrypt = require('bcryptjs');

const plainPassword = '123';  // The password to be hashed

// Generate a new hashed password
bcrypt.hash(plainPassword, 10, (err, hash) => {
  if (err) throw err;
  console.log('Hashed Password:', hash);  // This will generate a new hash for "123"
});
;
