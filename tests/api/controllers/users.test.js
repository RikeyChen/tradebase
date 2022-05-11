import * as usersController from '../../../api/controllers/users';
import * as db from '../../db';

beforeAll(async () => await db.setUp() );
afterEach(async () => await db.dropCollections() );
afterAll(async () => await db.dropDatabase() );

describe('registerUser', () => {
  const userAttrs = {
    username: 'user1',
    email: 'user1@email.com',
    password: 'user1password'
  };

  const req = mockRequest({ body: userAttrs });
  const res = mockResponse();

  it('successfully returns a redacted user as JSON', async () => {
    await usersController.registerUser(req, res);

    expect(res.json).toBeCalledWith(
      expect.objectContaining({
        username: userAttrs.username,
        email: userAttrs.email,
        token: expect.anything(),
        success: true
      })
    );
  });

  it('responds with 400 status when there is an error', async () => {
    const invalidReqObj = { body: {} };
    await usersController.registerUser(invalidReqObj, res);

    expect(res.status).toBeCalledWith(400);
  })
});

describe('loginUser', () => {
  const userAttrs = {
    username: 'user1',
    email: 'user1@email.com',
    password: 'user1password'
  };

  it('successfully returns a validated user as JSON', async () => {
    const req = mockRequest({ body: userAttrs });
    const res = mockResponse();

    await usersController.registerUser(req, res);
    await usersController.loginUser(req, res);

    expect(res.json).toBeCalledWith(
      expect.objectContaining({
        username: userAttrs.username,
        email: userAttrs.email,
        token: expect.anything(),
        success: true
      })
    );
  });

  it('respond with a 400 error message when the credentials are invalid', async () => {
    const req = mockRequest({ body: { username: 'notexistinguser', password: 'pass' } });
    const res = mockResponse();
    const invalidCredentialsError = "The entered username and password were invalid."

    await usersController.loginUser(req, res);

    expect(res.status).toBeCalledWith(400);
    expect(res.json).toBeCalledWith(invalidCredentialsError);
  });
});