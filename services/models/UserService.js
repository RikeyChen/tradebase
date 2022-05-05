import bcrypt from 'bcryptjs';

export default class UserService {
  constructor(userModel) {
    this.userModel = userModel;
  }

  async getUser(userAttrs) {
    const user = await this.userModel.findOne(userAttrs);
    return user;
  }

  async createUser(userAttrs) {
    const user = await this.getUser({ email: userAttrs.email });

    if (user) {
     throw new Error("A user has already registered with this email address");
    }

    const newUser = new this.userModel(userAttrs);
    const encryptedPassword = await this.getEncryptedPassword(userAttrs.password);
    newUser.password = encryptedPassword;
    const savedUser = await newUser.save();

    return savedUser;
  }

  async getEncryptedPassword(password) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    return hash;
  }
}