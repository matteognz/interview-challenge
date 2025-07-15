import { Medication } from '../../medication/entity/medication.entity';
import { Patient } from '../../patient/entity/patient.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Assignment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Patient, (patient) => patient.assignments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'patientId' })
  patient: Patient;

  @ManyToOne(() => Medication, (medication) => medication.assignments)
  @JoinColumn({ name: 'medicationId' })
  medication: Medication;

  @Column()
  startDate: Date;

  @Column('int')
  numberOfDays: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
