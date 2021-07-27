import { Test } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    }).compile();

    userService = moduleRef.get<UserService>(UserService);
    userController = moduleRef.get<UserController>(UserController);
    return;
  });

  describe('findAll', () => {
    it('should return an array of user', async () => {
      console.log(userController)
      const result = [
        { id: 1, firstName: 'kidsan', lastName: 'kidsan', isActive: true },
      ];
      jest
        .spyOn(userService, 'findAll')
        .mockImplementation(() => new Promise((res) => res(result)));

      expect(await userController.findAll()).toBe(result);
    });
  });
});
