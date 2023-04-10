import { Router } from "express";
import { hashData } from "../utils.js";
import { comparePasswords } from "../utils.js";
import UsersManager from "../DAL/daos/mongoManagers/usersMongoManager.js";
import passport from "passport";

const router = Router()
const usersManager = new UsersManager()

router.post("/registro", async (req, res) => {
  const { email, password } = req.body;
  const userExists = await usersManager.findByEmail({ email });
  if (userExists.length !== 0) {
    res.redirect("/views/errorRegistro"); 
  } else {
    const hashData = await hashData(password);
    const newUser = { ...req.body, password: hashData };
    await usersManager.createUser(newUser);
    res.redirect("/views/login");
  }
});

// router.post(
//   "/registro",
//   passport.authenticate("registro", {
//     failureRedirect: "/views/errorRegistro",
//     successRedirect: "/views/login",
//     passReqToCallback: true,
//   })
// );

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await usersManager.findByEmail({ email });
  if (user.length !== 0) {
    const checkPass = await comparePasswords(password, user[0].password);
    if (checkPass) {
      for (const key in req.body) {
        req.session[key] = req.body[key];
      }
      req.session.logged = true;
      if (email === "adminCoder@coder.com" && password === "adminCod3r123") {
        req.session.isAdmin = true;
      } else {
        req.session.isAdmin = false;
      }
      return res.redirect("/views/products");
    }
  }
  return res.redirect("/views/errorLogin");
});

// router.post('/login', passport.authenticate('login', {
//     failureRedirect: '/views/errorLogin',
//     successRedirect: '/views/products',
//     passReqToCallback: true
// }))

router.get("/logout", async (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      console.log(error);
    } else {
      res.redirect("/views/login");
    }
  });
});

router.post('/password', async (req, res) => {
  const { email, oldPass, newPass } = req.body;
  const user = await usersManager.findByEmail({ email });
  if (user.length !== 0) {
    const checkPass = await comparePasswords(oldPass, user[0].password);
    if (checkPass) {
      const newUser = user[0];
      newUser.password = await hashData(newPass);
      await newUser.save();
      return res.send("Contraseña cambiada con éxito");
    }
  }
  res.send("Ha ocurrido un error");
});

//Github login
// router.get(
//   "/loginGH",
//   passport.authenticate('github', { scope: ["user: email"] })
// );

//Github registro
router.get(
    "/registroGH",
    passport.authenticate('githubRegistro', { scope: ["user: email"] })
  );

router.get(
  "/github",
  passport.authenticate("githubRegistro", { failureRedirect: '/views/errorRegistro' }),
  async (req, res) => {
    req.session.email = req.user.email
    res.redirect('/views/products') 
  }
);

export default router;
