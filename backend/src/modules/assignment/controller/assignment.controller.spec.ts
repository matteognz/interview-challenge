import { Test, TestingModule } from '@nestjs/testing';
import { AssignmentController } from './assignment.controller';
import { AssignmentService } from '../service/assignment.service';
import { CreateAssignmentDto } from '../dto/create-assignment.dto';

describe('AssignmentController', () => {
  let controller: AssignmentController;

  const mockService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
    calculateRemainingDays: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssignmentController],
      providers: [
        {
          provide: AssignmentService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<AssignmentController>(AssignmentController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call service.create with correct dto', async () => {
    const dto: CreateAssignmentDto = {
      patientId: 1,
      medicationId: 2,
      startDate: new Date('2025-07-15'),
      numberOfDays: 10,
    };

    await controller.create(dto);

    expect(mockService.create).toHaveBeenCalledTimes(1);
    expect(mockService.create).toHaveBeenCalledWith(dto);
  });

  it('should return all assignments from service.findAll', async () => {
    const assignments = [{ id: 1 }, { id: 2 }];
    mockService.findAll.mockResolvedValue(assignments);

    const result = await controller.findAll();

    expect(mockService.findAll).toHaveBeenCalled();
    expect(result).toEqual(assignments);
  });

  it('should call service.findOne with id', async () => {
    const id = 1;
    await controller.findOne(id);

    expect(mockService.findOne).toHaveBeenCalledWith(id);
  });

  it('should call service.update with id and partial dto', async () => {
    const id = 1;
    const dto = {
      numberOfDays: 15,
      patientId: 1,
      medicationId: 1,
    } as CreateAssignmentDto;
    const updatedAssignment = {
      id,
      numberOfDays: 30,
      patientId: 1,
      medicationId: 1,
    };
    mockService.update.mockResolvedValue(updatedAssignment);

    const result = await controller.update(id, dto);

    expect(mockService.update).toHaveBeenCalledTimes(1);
    expect(mockService.update).toHaveBeenCalledWith(id, dto);
    expect(result).toEqual(updatedAssignment);
  });

  it('should call service.remove with id', async () => {
    const id = 1;
    await controller.remove(id);

    expect(mockService.remove).toHaveBeenCalledWith(id);
  });

  it('should call service.calculateRemainingDays with id and return the result', async () => {
    const id = 1;
    const remainingDays = 5;
    mockService.calculateRemainingDays.mockResolvedValue(remainingDays);

    const result = await controller.remainingDays(id);

    expect(mockService.calculateRemainingDays).toHaveBeenCalledWith(id);
    expect(result).toEqual(remainingDays);
  });
});
