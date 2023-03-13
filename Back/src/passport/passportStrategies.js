import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GithubStrategy } from "passport-github2";
import { usersModel } from "../persistence/models/users.model.js";
import { hashPass, comparePasswords } from "../utils.js";

// Local passport
passport.use(
  "registro",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      const user = await usersModel.find({ email });
      if (user.length !== 0) {
        return done(null, false);
      }
      const hashPassword = await hashPass(password);
      const newUser = { ...req.body, password: hashPassword };
      const newUserBD = await usersModel.create(newUser);
      done(null, newUserBD);
    }
  )
);

// Github passport
passport.use(
  "githubRegistro",
  new GithubStrategy(
    {
      clientID: "Iv1.385aad437b705986",
      clientSecret: "06704e0a224a37a8811e98eb478fb952477153ca",
      callbackURL: "http://localhost:8080/users/github",
    },
    async (accessToken, refreshToken, profile, done) => {
      const user = await usersModel.findOne({ email: profile._json.email });
      if (!user) {
        const newUser = {
          first_name: profile._json.name.split(" ")[0],
          last_name: profile._json.name.split(" ")[1] || " ",
          email: profile._json.email,
          password: " ",
        }
        const dbUser = await usersModel.create(newUser);
        done(null, dbUser);
      } else {
        done(null, false);
      }
    }
  )
);

// passport.use(
//   "login",
//   new LocalStrategy(
//     {
//       usernameField: "email",
//       passwordField: "password",
//       passReqToCallback: true,
//     },
//     async (req, email, password, done) => {
//       const user = await usersModel.find({ email });
//       if (user.length !== 0) {
//         const checkPass = await comparePasswords(password, user[0].password);
//         if (checkPass) {
//             return done(null, user);
//         }
//       }
//       done(null, false);
//     }
//   )
// );

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (_id, done) => {
  const user = await usersModel.findById(_id);
  done(null, user);
});
