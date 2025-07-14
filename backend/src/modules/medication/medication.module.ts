import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Medication } from './entity/medication.entity';
import { MedicationService } from './service/medication.service';
import { MedicationController } from './controller/medication.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Medication])],
  controllers: [MedicationController],
  providers: [MedicationService],
})
export class MedicationModule {}
