import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import config from "../config";
import UserService from '../services/models/UserService';
import UserModel from '../models/User';

const options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = config.secretOrKey;

export const passportConfig = passport => {
  passport.use(new JwtStrategy(options, async (jwtPayload, done) => {
    const UserServiceInstance = new UserService(UserModel);

    try {
      const user = await UserServiceInstance.getUser(jwtPayload.id);

      if (user) return done(null, user)

      return done(null, false);
    } catch(err) {
      return done(err, false);
    }
  }));
};

export const authenticateUser = passport => passport.authenticate('jwt', { session: false });