// 1. we need our database, that is, where to store those records.
const db = require("../config/db");

// 2. importing our bcrypt package to hash our passwords in the database
const bcrypt = require("bcryptjs");

// 3. user registration function/logic
exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // check if the user exists in the database
    const [rows] = await db.execute("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    if (rows.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    // hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // insert the record to the database
    await db.execute(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword]
    );

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "An error occured.", error });
  }
};

exports.loginUser;

exports.logoutUser;
