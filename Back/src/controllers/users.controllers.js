import {
  createUser,
  findByEmail,
  deleteUser,
} from "../services/users.services.js";

export async function create(req, res) {
  const { first_name, last_name, email, age, password, rol } = req.body;
  if (!first_name || !last_name || !email || !age || !password || !rol) {
    res.status(400).json({ error: "Field missing" });
  }
  try {
    const userExists = await findByEmail({ email });
    console.log(userExists);
    if (userExists.length !== 0) {
      res.status(200).json({ error: "User already exists" });
    } else {
      const newUser = await createUser(req.body);
      res.status(200).json({ message: "User created", newUser });

    }
  } catch (error) {
    res.status(500).json(error);
  }
  }

// export async function create(req, res) {
//   const { email, password } = req.body;
//   const userExists = await findByEmail({ email });
//   if (userExists.length !== 0) {
//     res.redirect("/views/errorRegistro");
//   } else {
//     const newUser = req.body;
//     await createUser(newUser);
//     res.redirect("/views/login");
//   }
// }

export async function find(req, res) {
  try {
    const { email } = req.body;
    const user = await findByEmail({ email });
    if (user.length === 0) {
      res.status(200).json({ message: "User incorrect" });
    } else {
      res.status(200).json({ message: "User found", user });
    }
  } catch (error) {
    res.status(500).json(error);
  }
}

export async function deleteUserById(req, res) {
  try {
    const { _id } = req.params;
    const user = await deleteUser( _id );
    if (user.length === 0) {
      res.status(200).json({ message: "User incorrect" });
    } else {
      res.status(200).json({ message: "User found", user });
    }
  } catch (error) {
    res.status(500).json(error);
  }
}
