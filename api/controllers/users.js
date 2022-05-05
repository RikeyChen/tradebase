import UserModel from '../../models/User';
import UserService from '../../services/models/UserService';

export const registerUser = async (req, res) => {
  const userData = req.body;
  const UserServiceInstance = new UserService(UserModel);

  try {
    const user = await UserServiceInstance.createUser(userData);
    const redactedUser = user.getPublicFields();
    return res.json(redactedUser);
  } catch(err) {
    res.status(400).json(err);
  }
};