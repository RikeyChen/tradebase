import UserModel from "../../models/User";

describe('instance methods', () => {
  describe('getPublicFields', () => {
    const user = new UserModel({
      username: 'user1',
      email: 'user1@email.com',
      password: 'user1password'
    })

    const redactedUser = user.getPublicFields();

    it('returns the user model without the password field', () => {
      expect(redactedUser.password).toBeUndefined();
      expect(redactedUser.username).toEqual(user.username);
      expect(redactedUser.email).toEqual(user.email);
    });
  });
});