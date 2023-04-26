import {
  createUser,
  findByEmail,
  deleteUser,
} from "../services/users.services.js";

export async function create(req, res) {
  let predRole = 'user'
  const { first_name, last_name, email, age, password  } = req.body;
  if (!first_name || !last_name || !email || !age || !password) {
    res.status(400).json({ error: "Field missing" });
  }
  try {
    const userExists = await findByEmail({ email });
    if (userExists.length !== 0) {
      // res.status(200).json({ error: "User already exists" });
      res.redirect("/views/errorRegistro"); 
    } else {
      if (email === "adminCoder2@coder.com" && password === "adminCod3r123") {
        req.session.isAdmin = true;
        predRole = 'isAdmin'
        console.log({...req.body, role: predRole});
      } else {
        req.session.isAdmin = false;
      }
      console.log({...req.body, role: predRole});
      const newUser = await createUser({...req.body, role: predRole});
      // res.status(200).json({ message: "User created", newUser });
      res.redirect("/views/login");
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
