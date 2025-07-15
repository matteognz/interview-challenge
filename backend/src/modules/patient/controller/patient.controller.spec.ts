import { Test, TestingModule } from '@nestjs/testing';
import { PatientController } from './patient.controller';
import { PatientService } from '../service/patient.service';
import { CreatePatientDto } from '../dto/create-patient.dto';

describe('PatientController', () => {
  let controller: PatientController;

  const mockService: Partial<jest.Mocked<PatientService>> = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PatientController],
      providers: [
        {
          provide: PatientService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<PatientController>(PatientController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call service.create with correct data', async () => {
    const dto: CreatePatientDto = {
      name: 'Matteo Gonzi',
      dateOfBirth: new Date('1999-06-01'),
    };

    await controller.create(dto);

    expect(mockService.create).toHaveBeenCalledTimes(1);
    expect(mockService.create).toHaveBeenCalledWith(dto);
  });

  it('should return patients from service.findAll', async () => {
    const mockPatients = [
      {
        id: 1,
        name: 'Matteo Gonzi',
        dateOfBirth: new Date('1999-06-01'),
        createdAt: new Date(),
        updatedAt: new Date(),
        assignments: [],
      },
    ];
    mockService.findAll!.mockResolvedValue(mockPatients);

    const result = await controller.findAll();

    expect(mockService.findAll).toHaveBeenCalled();
    expect(result).toEqual(mockPatients);
  });

  it('should call service.findOne with id', async () => {
    const id = 1;
    await controller.findOne(id);

    expect(mockService.findOne).toHaveBeenCalledWith(id);
  });

  it('should call service.update with id and dto', async () => {
    const id = 1;
    const dto: Partial<CreatePatientDto> = {
      name: 'Matteo Gonzi Updated',
    };
    const updatedPatient = {
      id,
      name: 'Matteo Gonzi Updated',
      dateOfBirth: new Date('1999-06-01'),
      createdAt: new Date(),
      updatedAt: new Date(),
      assignments: [],
    };
    mockService.update!.mockResolvedValue(updatedPatient);

    const result = await controller.update(id, dto);

    expect(mockService.update).toHaveBeenCalledTimes(1);
    expect(mockService.update).toHaveBeenCalledWith(id, dto);
    expect(result).toEqual(updatedPatient);
  });

  it('should call service.remove with id', async () => {
    const id = 1;
    await controller.remove(id);

    expect(mockService.remove).toHaveBeenCalledWith(id);
  });
});
