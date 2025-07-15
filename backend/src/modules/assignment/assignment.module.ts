import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Assignment } from './entity/assignment.entity';
import { Patient } from '../patient/entity/patient.entity';
import { Medication } from '../medication/entity/medication.entity';
import { AssignmentService } from './service/assignment.service';
import { AssignmentController } from './controller/assignment.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Assignment, Patient, Medication])],
  providers: [AssignmentService],
  controllers: [AssignmentController],
})
export class AssignmentModule {}
