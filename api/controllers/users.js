import UserModel from '../../models/User';
import UserService from '../../services/models/UserService';

export const registerUser = async (req, res) => {
  const userData = req.body;
  const UserServiceInstance = new UserService(UserModel);

  try {
    const user = await UserServiceInstance.createUser(userData);

    return res.json(user);
  } catch(err) {
    res.status(400).json(err);
  }
};

export const loginUser = async (req, res) => {
  const credentials = req.body;
  const UserServiceInstance = new UserService(UserModel);

  try {
    const user = await UserServiceInstance.loginUser(credentials);

    return res.json(user);
  } catch(err) {
    res.status(400).json(err);
  }
};