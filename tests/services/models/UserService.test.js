import * as mockingoose from 'mockingoose';
import UserService from "../../../services/models/UserService";
import UserModel from "../../../models/User";

beforeEach(() => {
  mockingoose.resetAll();
});

describe('UserService', () => {
  const userAttrs = {
    username: 'user1',
    email: 'user1@email.com',
    password: 'user1password'
  }

  const UserServiceInstance = new UserService(UserModel);

  it('constructs a new instance with the passed in User model', () => {
    expect(UserServiceInstance.userModel).toEqual(UserModel);
    expect(UserServiceInstance).toBeDefined();
  });

  describe('getUser', () => {
    it('should return an existing user', async () => {
      mockingoose(UserModel).toReturn(userAttrs, 'findOne');
      const user = await UserServiceInstance.getUser(userAttrs);

      expect(user.username).toEqual(userAttrs.username);
      expect(user.email).toEqual(userAttrs.email);
    });

    it('should return undefined if there is no existing user with the given params', async () => {
      mockingoose(UserModel).toReturn(undefined, 'findOne');
      const user = await UserServiceInstance.getUser(userAttrs);

      expect(user).toBeUndefined();
    });
  });

  describe('createUser', () => {
    it('successfully creates a new user', async () => {
      const getUserMock = jest.spyOn(UserServiceInstance, 'getUser')
                            .mockImplementation(() => undefined);
      const getEncryptedPasswordMock =
        jest.spyOn(UserServiceInstance, 'getEncryptedPassword')
          .mockImplementation(() => 'random*salted*hash');

      const user = {
        username: userAttrs.username,
        email: userAttrs.email,
        password: 'random*salted*hash'
      };

      mockingoose(UserModel).toReturn(user, 'save');

      const savedUser = await UserServiceInstance.createUser(userAttrs);

      expect(savedUser.username).toEqual(userAttrs.username);
      expect(savedUser.email).toEqual(userAttrs.email);
      expect(savedUser.password).toEqual('random*salted*hash');

      getUserMock.mockRestore();
      getEncryptedPasswordMock.mockRestore();
    });

    it('throws an error when the user already exists', async () => {
      const spy = jest.spyOn(UserServiceInstance, 'getUser')
                    .mockImplementation(() => new UserModel(userAttrs));

      await expect(UserServiceInstance.createUser(userAttrs)).rejects.toThrow();
    });
  });

  describe('getEncryptedPassword', () => {
    it('returns a salted and hashed password', async () => {
      const encryptedPassword =  await UserServiceInstance.getEncryptedPassword(userAttrs.password);

      expect(encryptedPassword).toBeDefined();
      expect(encryptedPassword).not.toBe(userAttrs.password);
    });
  });
});