import { IsInt, IsPositive, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateAssignmentDto {
  @ApiProperty({ example: 1, description: 'ID of the patient' })
  @IsInt()
  @IsPositive()
  patientId: number;

  @ApiProperty({ example: 2, description: 'ID of the medication' })
  @IsInt()
  @IsPositive()
  medicationId: number;

  @ApiProperty({
    example: '2025-07-15',
    description: 'Start date of the treatment (YYYY-MM-DD)',
  })
  @IsDate()
  @Type(() => Date)
  startDate: Date;

  @ApiProperty({
    example: 10,
    description: 'Number of days the treatment lasts',
  })
  @IsInt()
  @IsPositive()
  numberOfDays: number;
}
