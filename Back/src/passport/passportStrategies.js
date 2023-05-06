import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GithubStrategy } from "passport-github2";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import { usersModel } from "../DAL/models/users.model.js";
import { hashData, comparePasswords } from "../utils/utils.js";

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
      try {
        const user = await usersModel.find({ email });
        if (user.length !== 0) {
          return done(null, false);
        }
        const hashDataword = await hashData(password);
        const newUser = { ...req.body, password: hashDataword };
        const newUserBD = await usersModel.create(newUser);
        done(null, newUserBD);
      } catch (error) {
        done(error);
      }
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
        };
        const dbUser = await usersModel.create(newUser);
        done(null, dbUser);
      } else {
        done(null, false);
      }
    }
  )
);

passport.use(
  "login",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        const user = await usersModel.findOne({ email });
        if (!user) return done(null, false);
        const checkPass = await comparePasswords(password, user.password);
        if (!checkPass) return done(null, false);
        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  "jwt",
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: "secretKey",
    },
    async (jwy_payload, done) => {
      try {
        done(null, jwy_payload.user);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  const user = await usersModel.findById(id);
  done(null, user);
});
