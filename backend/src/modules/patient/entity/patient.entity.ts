import { Type } from 'class-transformer';
import { IsDate } from 'class-validator';
import { Assignment } from '../../assignment/entity/assignment.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Patient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @IsDate()
  @Type(() => Date)
  dateOfBirth: Date;

  @OneToMany(() => Assignment, (assignment) => assignment.patient)
  assignments: Assignment[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
