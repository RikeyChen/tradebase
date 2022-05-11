import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../../config';

export default class UserService {
  constructor(userModel) {
    this.userModel = userModel;
  }

  async getUser(userAttrs) {
    const user = await this.userModel.findOne(userAttrs);
    return user;
  }

  async createUser(userAttrs) {
    const user = await this.getUser({ username: userAttrs.username });

    if (user) {
     throw new Error("A user has already registered with this email address");
    }

    const newUser = new this.userModel(userAttrs);
    const encryptedPassword = await this.getEncryptedPassword(userAttrs.password);
    newUser.password = encryptedPassword;
    let savedUser = await newUser.save();

    // Remove password from the returned data - this returns an object not a document
    savedUser = savedUser.getPublicFields();

    savedUser = this.jwtSignUser(savedUser, config.secretOrKey, { expiresIn: 18000 });

    return savedUser;
  }

  async loginUser(userAttrs) {
    const { username, password } = userAttrs;
    const invalidCredentialsError = new Error("The entered username and password were invalid.");

    let user = await this.getUser({ username });
    if (!user) throw invalidCredentialsError;

    const isPasswordMatch = await this.checkPasswordMatch(password, user.password);
    if(!isPasswordMatch) throw invalidCredentialsError;

    user = user.getPublicFields();

    return this.jwtSignUser(user, config.secretOrKey, { expiresIn: 18000 });
  }

  async getEncryptedPassword(password) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    return hash;
  }

  async checkPasswordMatch(password, encryptedPassword) {
    return await bcrypt.compare(password, encryptedPassword);
  }

  // user needs to be an object instead of a document or jwt#sign will error
  jwtSignUser(user, secretOrKey, options) {
    const jsonWebToken = jwt.sign(user, secretOrKey, options);

    user.success = true;
    user.token = "Bearer " + jsonWebToken;

    return user;
  }
}