import { Test, TestingModule } from '@nestjs/testing';
import { MerchantController } from './merchant.controller';
import { MerchantService } from './merchant.service';
import { JwtGuard } from 'src/guards/varify-token/varify-token.guard';
import { AdminGuard } from 'src/guards/admin/admin.guard';

describe('MerchantController', () => {
  let controller: MerchantController;
  let service: MerchantService;

  const mockMerchantService = {
    createMerchant: jest.fn(),
    listAllMerchants: jest.fn(),
    merchantDetails: jest.fn(),
    updateMerchnat: jest.fn(),
  };

  const mockJwtGuard = {
    canActivate: jest.fn(() => true),
  };

  const mockAdminGuard = {
    canActivate: jest.fn(() => true),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MerchantController],
      providers: [
        {
          provide: MerchantService,
          useValue: mockMerchantService,
        },
      ],
    })
      .overrideGuard(JwtGuard)
      .useValue(mockJwtGuard)
      .overrideGuard(AdminGuard)
      .useValue(mockAdminGuard)
      .compile();

    controller = module.get<MerchantController>(MerchantController);
    service = module.get<MerchantService>(MerchantService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('createMerchantHandler', () => {
    it('should create a merchant successfully', async () => {
      const merchantData = {
        name: 'Test Merchant',
        userId: '507f1f77bcf86cd799439011',
        currency: 'USD',
        balance: 1000,
      };

      const expectedResponse = {
        _id: '507f1f77bcf86cd799439012',
        name: 'Test Merchant',
        userId: merchantData.userId,
        currency: 'USD',
        balance: 1000,
      };

      mockMerchantService.createMerchant.mockResolvedValue(expectedResponse);

      const result = await controller.createMerchantHandler(merchantData);

      expect(service.createMerchant).toHaveBeenCalledWith(merchantData);
      expect(service.createMerchant).toHaveBeenCalledTimes(1);
      expect(result).toEqual({
        data: expectedResponse,
        message: 'Merchant created successfully!.',
      });
    });

    it('should throw an error if service throws', async () => {
      const merchantData = {
        name: 'Test Merchant',
        userId: '507f1f77bcf86cd799439011',
        currency: 'USD',
        balance: 1000,
      };

      const error = new Error('Invalid userId');
      mockMerchantService.createMerchant.mockRejectedValue(error);

      await expect(controller.createMerchantHandler(merchantData)).rejects.toThrow(error);
      expect(service.createMerchant).toHaveBeenCalledWith(merchantData);
    });
  });

  describe('listMerchantsHandler', () => {
    it('should return paginated list of merchants', async () => {
      const options = {
        page: 1,
        limit: 10,
      };

      const expectedResponse = {
        documents: [
          { _id: '1', name: 'Merchant 1', currency: 'USD', balance: 1000 },
          { _id: '2', name: 'Merchant 2', currency: 'EUR', balance: 2000 },
        ],
        totalItems: 2,
        page: 1,
        totalPages: 1,
      };

      mockMerchantService.listAllMerchants.mockResolvedValue(expectedResponse);

      const result = await controller.listMerchantsHandler(options);

      expect(service.listAllMerchants).toHaveBeenCalledWith(options);
      expect(service.listAllMerchants).toHaveBeenCalledTimes(1);
      expect(result).toEqual({
        data: expectedResponse,
        message: 'Merchants list fetched successfully!.',
      });
    });

    it('should throw an error if service throws', async () => {
      const options = {
        page: 1,
        limit: 10,
      };

      const error = new Error('Database error');
      mockMerchantService.listAllMerchants.mockRejectedValue(error);

      await expect(controller.listMerchantsHandler(options)).rejects.toThrow(error);
      expect(service.listAllMerchants).toHaveBeenCalledWith(options);
    });
  });

  describe('getMerchantDetailsHandler', () => {
    it('should return merchant details successfully', async () => {
      const data = {
        id: '507f1f77bcf86cd799439012',
      };

      const expectedResponse = {
        _id: '507f1f77bcf86cd799439012',
        name: 'Test Merchant',
        userId: '507f1f77bcf86cd799439011',
        currency: 'USD',
        balance: 1000,
      };

      mockMerchantService.merchantDetails.mockResolvedValue(expectedResponse);

      const result = await controller.getMerchantDetailsHandler(data);

      expect(service.merchantDetails).toHaveBeenCalledWith(data.id);
      expect(service.merchantDetails).toHaveBeenCalledTimes(1);
      expect(result).toEqual({
        data: expectedResponse,
        message: 'Merchant details fetched seccessfully!',
      });
    });

    it('should throw an error if service throws', async () => {
      const data = {
        id: 'invalid-id',
      };

      const error = new Error('Invalid id, please review.');
      mockMerchantService.merchantDetails.mockRejectedValue(error);

      await expect(controller.getMerchantDetailsHandler(data)).rejects.toThrow(error);
      expect(service.merchantDetails).toHaveBeenCalledWith(data.id);
    });
  });

  describe('updateMerchantDetalis', () => {
    it('should update merchant details successfully', async () => {
      const data = {
        id: '507f1f77bcf86cd799439012',
      };

      const newMerchantData = {
        name: 'Updated Merchant',
        balance: 2000,
      };

      const updateObject = { ...data, ...newMerchantData };

      const expectedResponse = {
        _id: '507f1f77bcf86cd799439012',
        name: 'Updated Merchant',
        userId: '507f1f77bcf86cd799439011',
        currency: 'USD',
        balance: 2000,
      };

      mockMerchantService.updateMerchnat.mockResolvedValue(expectedResponse);

      const result = await controller.updateMerchantDetalis(data, newMerchantData);

      expect(service.updateMerchnat).toHaveBeenCalledWith(updateObject);
      expect(service.updateMerchnat).toHaveBeenCalledTimes(1);
      expect(result).toEqual({
        data: expectedResponse,
        message: 'Merchant details updated seccessfully!',
      });
    });

    it('should throw an error if service throws', async () => {
      const data = {
        id: 'invalid-id',
      };

      const newMerchantData = {
        name: 'Updated Merchant',
        balance: 2000,
      };

      const error = new Error('Invalid id, please review.');
      mockMerchantService.updateMerchnat.mockRejectedValue(error);

      await expect(controller.updateMerchantDetalis(data, newMerchantData)).rejects.toThrow(error);
    });

    it('should only update name field when only name is provided', async () => {
      const data = {
        id: '507f1f77bcf86cd799439012',
      };

      const newMerchantData = {
        name: 'Updated Merchant Name',
      };

      const updateObject = { ...data, ...newMerchantData };

      const expectedResponse = {
        _id: '507f1f77bcf86cd799439012',
        name: 'Updated Merchant Name',
        userId: '507f1f77bcf86cd799439011',
        currency: 'USD',
        balance: 1000,
      };

      mockMerchantService.updateMerchnat.mockResolvedValue(expectedResponse);

      const result = await controller.updateMerchantDetalis(data, newMerchantData);

      expect(service.updateMerchnat).toHaveBeenCalledWith(updateObject);
      expect(result.data).toEqual(expectedResponse);
    });
  });
});
