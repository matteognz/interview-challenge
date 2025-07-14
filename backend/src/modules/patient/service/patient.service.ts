import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Patient } from '../entity/patient.entity';
import { CreatePatientDto } from '../dto/create-patient.dto';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(Patient)
    private patientRepository: Repository<Patient>,
  ) {}

  create(dto: CreatePatientDto): Promise<Patient> {
    const patient = this.patientRepository.create(dto);
    return this.patientRepository.save(patient);
  }

  findAll(): Promise<Patient[]> {
    return this.patientRepository.find();
  }

  findOne(id: number): Promise<Patient | null> {
    return this.patientRepository.findOneBy({ id });
  }

  async update(id: number, dto: Partial<CreatePatientDto>): Promise<Patient> {
    const patient = await this.patientRepository.findOneBy({ id });
    if (!patient) {
      throw new NotFoundException(`Patient with id ${id} not found`);
    }
    Object.assign(patient, dto);
    return this.patientRepository.save(patient);
  }

  async remove(id: number): Promise<void> {
    await this.patientRepository.delete(id);
  }
}
