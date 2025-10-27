import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { JwtGuard } from 'src/guards/varify-token/varify-token.guard';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  const mockUserService = {
    createUser: jest.fn(),
    listAllUsers: jest.fn(),
  };

  const mockJwtGuard = {
    canActivate: jest.fn(() => true),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    })
      .overrideGuard(JwtGuard)
      .useValue(mockJwtGuard)
      .compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('createUserHandler', () => {
    it('should create a user successfully', async () => {
      const userData = {
        name: 'Test User',
        email: 'test@example.com',
        role: 'merchant' as const,
        password: 'password123',
        confiremPassword: 'password123',
      };

      const expectedResponse = true;

      mockUserService.createUser.mockResolvedValue(expectedResponse);

      const result = await controller.createUserHandler(userData);

      expect(service.createUser).toHaveBeenCalledWith(userData);
      expect(service.createUser).toHaveBeenCalledTimes(1);
      expect(result).toEqual({
        data: expectedResponse,
        message: 'User created successfully!.',
      });
    });

    it('should throw an error if service throws', async () => {
      const userData = {
        name: 'Test User',
        email: 'test@example.com',
        role: 'merchant' as const,
        password: 'password123',
        confiremPassword: 'password123',
      };

      const error = new Error('Email already exists');
      mockUserService.createUser.mockRejectedValue(error);

      await expect(controller.createUserHandler(userData)).rejects.toThrow(error);
      expect(service.createUser).toHaveBeenCalledWith(userData);
    });
  });

  describe('usersListHandler', () => {
    it('should return paginated list of users', async () => {
      const options = {
        page: 1,
        limit: 10,
      };

      const expectedResponse = {
        documents: [
          { id: '1', name: 'User 1', email: 'user1@example.com' },
          { id: '2', name: 'User 2', email: 'user2@example.com' },
        ],
        totalItems: 2,
        page: 1,
        totalPages: 1,
      };

      mockUserService.listAllUsers.mockResolvedValue(expectedResponse);

      const result = await controller.usersListHandler(options);

      expect(service.listAllUsers).toHaveBeenCalledWith(options);
      expect(service.listAllUsers).toHaveBeenCalledTimes(1);
      expect(result).toEqual({
        data: expectedResponse,
        message: 'Users list fetched successfully!.',
      });
    });

    it('should throw an error if service throws', async () => {
      const options = {
        page: 1,
        limit: 10,
      };

      const error = new Error('Database error');
      mockUserService.listAllUsers.mockRejectedValue(error);

      await expect(controller.usersListHandler(options)).rejects.toThrow(error);
      expect(service.listAllUsers).toHaveBeenCalledWith(options);
    });
  });
});
