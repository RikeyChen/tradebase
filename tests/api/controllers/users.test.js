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
        email: userAttrs.email
      })
    );
  });

  it('responds with 400 status when there is an error', async () => {
    const invalidReqObj = { body: {} };
    await usersController.registerUser(invalidReqObj, res);

    expect(res.status).toBeCalledWith(400);
  })
});