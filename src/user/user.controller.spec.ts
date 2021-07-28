import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './user.entity';

const mockRepository = {};

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [],
      controllers: [UserController],
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository,
        },
      ],
    }).compile();

    userService = moduleRef.get<UserService>(UserService);
    userController = moduleRef.get<UserController>(UserController);
  });

  describe('findAll', () => {
    it('should return an array of user', async () => {
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
