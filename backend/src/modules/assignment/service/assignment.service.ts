import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Assignment } from '../entity/assignment.entity';
import { Repository } from 'typeorm';
import { CreateAssignmentDto } from '../dto/create-assignment.dto';
import { Medication } from '../../medication/entity/medication.entity';
import { Patient } from '../../patient/entity/patient.entity';

@Injectable()
export class AssignmentService {
  constructor(
    @InjectRepository(Assignment)
    private readonly assignmentRepository: Repository<Assignment>,

    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,

    @InjectRepository(Medication)
    private readonly medicationRepository: Repository<Medication>,
  ) {}

  async create(dto: CreateAssignmentDto): Promise<Assignment> {
    const patient = await this.patientRepository.findOne({
      where: { id: dto.patientId },
    });
    if (!patient) throw new NotFoundException('Patient not found');

    const medication = await this.medicationRepository.findOne({
      where: { id: dto.medicationId },
    });
    if (!medication) throw new NotFoundException('Medication not found');

    const assignment = this.assignmentRepository.create({
      startDate: dto.startDate,
      numberOfDays: dto.numberOfDays,
      patient,
      medication,
    });

    return this.assignmentRepository.save(assignment);
  }

  findAll(): Promise<Assignment[]> {
    return this.assignmentRepository.find({
      relations: ['patient', 'medication'],
    });
  }

  async findOne(id: number): Promise<Assignment> {
    const assignment = await this.assignmentRepository.findOne({
      where: { id },
      relations: ['patient', 'medication'],
    });
    if (!assignment) throw new NotFoundException('Assignment not found');
    return assignment;
  }

  async update(id: number, dto: CreateAssignmentDto): Promise<Assignment> {
    const assignment = await this.assignmentRepository.findOne({
      where: { id },
      relations: ['patient', 'medication'],
    });
    if (!assignment) throw new NotFoundException('Assignment not found');

    const patient = await this.patientRepository.findOne({
      where: { id: dto.patientId },
    });
    if (!patient) throw new NotFoundException('Patient not found');

    const medication = await this.medicationRepository.findOne({
      where: { id: dto.medicationId },
    });
    if (!medication) throw new NotFoundException('Medication not found');

    assignment.startDate = dto.startDate;
    assignment.numberOfDays = dto.numberOfDays;
    assignment.patient = patient;
    assignment.medication = medication;

    return this.assignmentRepository.save(assignment);
  }

  async remove(id: number): Promise<void> {
    const assignment = await this.findOne(id);
    await this.assignmentRepository.remove(assignment);
  }

  async calculateRemainingDays(id: number): Promise<number> {
    const assignment = await this.findOne(id);
    return this.calculateRemainingDaysFromAssignment(assignment);
  }

  async findByPatientWithRemainingDays(
    patientId: number,
  ): Promise<Assignment[]> {
    const patient = await this.patientRepository.findOne({
      where: { id: patientId },
    });
    if (!patient) {
      throw new NotFoundException(`Patient with id ${patientId} not found`);
    }
    const assignments = await this.assignmentRepository.find({
      where: { patient: { id: patientId } },
      relations: ['patient', 'medication'],
    });
    return assignments.map((assignment) => {
      return {
        ...assignment,
        remainingDays: this.calculateRemainingDaysFromAssignment(assignment),
      };
    });
  }

  private calculateRemainingDaysFromAssignment(assignment: Assignment): number {
    const today = new Date();
    const startDate = new Date(assignment.startDate);
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + assignment.numberOfDays);
    const remaining = Math.ceil(
      (endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
    );
    return Math.max(remaining, 0);
  }
}
