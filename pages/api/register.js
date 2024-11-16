import db from '../../lib/mysql';  // Import the MySQL connection

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { first_name, last_name, email, user_name, password } = req.body;

    // Hash the password before saving (optional, but recommended for security)
    const bcrypt = require('bcrypt');
    const hashedPassword = await bcrypt.hash(password, 10);  // Hash with salt rounds (10 is a good value)

    try {
      // Insert user data into the database
      const [result] = await db.execute(
        'INSERT INTO users (first_name, last_name, email, username, password) VALUES (?, ?, ?, ?,?)',
        [first_name, last_name, email, user_name, hashedPassword]
      );

      // Respond with success
      res.status(201).json({ message: 'User registered successfully', userId: result.insertId });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error registering user' });
    }
  } else {
    // Only allow POST requests
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
