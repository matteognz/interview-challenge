import { Test, TestingModule } from '@nestjs/testing';
import { AssignmentService } from './assignment.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Assignment } from '../entity/assignment.entity';
import { Patient } from '../../patient/entity/patient.entity';
import { Medication } from '../../medication/entity/medication.entity';
import { Repository } from 'typeorm';

describe('AssignmentService', () => {
  let service: AssignmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AssignmentService,
        {
          provide: getRepositoryToken(Assignment),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Patient),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Medication),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<AssignmentService>(AssignmentService);
  });

  describe('calculateRemainingDays', () => {
    it('should calculate correct remaining days', async () => {
      const today = new Date();
      const startDate = new Date(today);
      startDate.setDate(today.getDate() - 2);

      const mockAssignment: Assignment = {
        id: 1,
        startDate,
        numberOfDays: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
        patient: {} as Patient,
        medication: {} as Medication,
      };

      jest.spyOn(service, 'findOne').mockResolvedValue(mockAssignment);

      const remaining = await service.calculateRemainingDays(1);
      expect(remaining).toBe(3);
    });

    it('should return 0 if treatment is finished', async () => {
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - 10);

      const mockAssignment: Assignment = {
        id: 2,
        startDate,
        numberOfDays: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
        patient: {} as Patient,
        medication: {} as Medication,
      };

      jest.spyOn(service, 'findOne').mockResolvedValue(mockAssignment);

      const remaining = await service.calculateRemainingDays(2);
      expect(remaining).toBe(0);
    });
  });
});
