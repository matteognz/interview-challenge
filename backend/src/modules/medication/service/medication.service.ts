import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Medication } from '../entity/medication.entity';
import { CreateMedicationDto } from '../dto/create-medication.dto';

@Injectable()
export class MedicationService {
  constructor(
    @InjectRepository(Medication)
    private readonly medicationRepository: Repository<Medication>,
  ) {}

  async create(dto: CreateMedicationDto): Promise<Medication> {
    const medication = this.medicationRepository.create(dto);
    return this.medicationRepository.save(medication);
  }

  async findAll(): Promise<Medication[]> {
    return this.medicationRepository.find();
  }

  async findOne(id: number): Promise<Medication> {
    const medication = await this.medicationRepository.findOneBy({ id });
    if (!medication) {
      throw new NotFoundException(`Medication with id ${id} not found`);
    }
    return medication;
  }

  async update(
    id: number,
    dto: Partial<CreateMedicationDto>,
  ): Promise<Medication> {
    const medication = await this.medicationRepository.findOneBy({ id });
    if (!medication) {
      throw new NotFoundException(`Medication with id ${id} not found`);
    }
    Object.assign(medication, dto);
    return this.medicationRepository.save(medication);
  }

  async remove(id: number): Promise<void> {
    const result = await this.medicationRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Medication with id ${id} not found`);
    }
  }
}
