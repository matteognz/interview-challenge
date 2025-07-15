import { Test, TestingModule } from '@nestjs/testing';
import { MedicationController } from './medication.controller';
import { MedicationService } from '../service/medication.service';
import { CreateMedicationDto } from '../dto/create-medication.dto';

describe('MedicationController', () => {
  let controller: MedicationController;

  const mockService: Partial<jest.Mocked<MedicationService>> = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MedicationController],
      providers: [
        {
          provide: MedicationService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<MedicationController>(MedicationController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call service.create with correct data', async () => {
    const dto: CreateMedicationDto = {
      name: 'Paracetamol',
      dosage: 1,
      frequency: 1,
    };

    await controller.create(dto);

    expect(mockService.create).toHaveBeenCalledTimes(1);
    expect(mockService.create).toHaveBeenCalledWith(dto);
  });

  it('should return medications from service.findAll', async () => {
    const mockMedications = [
      {
        id: 1,
        name: 'Paracetamol',
        dosage: 1,
        frequency: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        assignments: [],
      },
    ];
    mockService.findAll!.mockResolvedValue(mockMedications);

    const result = await controller.findAll();

    expect(mockService.findAll).toHaveBeenCalled();
    expect(result).toEqual(mockMedications);
  });

  it('should call service.findOne with id', async () => {
    const id = 1;
    await controller.findOne(id);

    expect(mockService.findOne).toHaveBeenCalledWith(id);
  });

  it('should call service.update with id and dto', async () => {
    const id = 1;
    const dto: Partial<CreateMedicationDto> = {
      name: 'Paracetamol Updated',
    };
    const updatedMedication = {
      id,
      name: 'Paracetamol Updated',
      dosage: 1,
      frequency: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      assignments: [],
    };
    mockService.update!.mockResolvedValue(updatedMedication);

    const result = await controller.update(id, dto);

    expect(mockService.update).toHaveBeenCalledTimes(1);
    expect(mockService.update).toHaveBeenCalledWith(id, dto);
    expect(result).toEqual(updatedMedication);
  });

  it('should call service.remove with id', async () => {
    const id = 1;
    await controller.remove(id);

    expect(mockService.remove).toHaveBeenCalledWith(id);
  });
});
