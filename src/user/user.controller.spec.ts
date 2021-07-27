import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './user.entity';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    console.log('foo');
    const moduleRef = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'mysql',
          host: 'localhost',
          port: 3306,
          username: 'root',
          password: 'root',
          database: 'test',
          entities: [User],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([User]),
      ],
      controllers: [UserController],
      providers: [UserService],
    }).compile();
    console.log(moduleRef);
    userService = moduleRef.get<UserService>(UserService);
    userController = moduleRef.get<UserController>(UserController);
    return;
  });

  describe('findAll', () => {
    it('should return an array of user', async () => {
      console.log(userController);
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
