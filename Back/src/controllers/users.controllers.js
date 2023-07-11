import {
  createUser,
  findByEmail,
  deleteUser,
  getAllUsers
} from "../services/users.services.js";
import logger from '../utils/logs/winston.js'
import UserDTO from '../dao/DTOs/users.dto.js'

export async function create(req, res) {
  let predRole = 'user'
  const { first_name, last_name, email, age, password  } = req.body;
  if (!first_name || !last_name || !email || !age || !password) {
    res.status(400).json({ error: "Field missing" });
  }
  try {
    const userExists = await findByEmail({ email });
    if (userExists.length !== 0) {
      res.status(200).json({ error: "User already exists" });
    } else {
      if (email === "adminCoder2@coder.com" && password === "adminCod3r123") {
        req.session.isAdmin = true;
        predRole = 'isAdmin'
        console.log({...req.body, role: predRole});
      } else {
        req.session.isAdmin = false;
      }
      const newUser = await createUser({...req.body, role: predRole});
      res.status(200).json({ message: "User created", newUser });
    }
  } catch (error) {
    res.status(500).json(error);
  }
  }

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

export async function getUsers(req,res){
  try {
      const users = await getAllUsers()
      if (users) {
          const usersDto = UserDTO.usersToDTO(users)
          if(usersDto){
              logger.info('Users found')
              res.status(200).json({message: 'Users found', usersDto})
          }else{
              logger.error('Users not found') 
              res.status(500).json({message: 'Users not found'})
          }
      }
  } catch (error) {
      logger.error(error)
  }
}

export async function deleteUserById(req, res) {
  try {
    const {_id} = req.params;
    const user = await deleteUser(_id);
    if (user.length === 0) {
      res.status(200).json({message: "User incorrect"});
    } else {
      res.status(200).json({message: "User found", user});
    }
  } catch (error) {
    res.status(500).json(error);
  }
}
