import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, Min } from 'class-validator';

export class CreateMedicationDto {
  @ApiProperty({
    example: 'Paracetamol',
    description: 'Medication name',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 1,
    description: 'Medication dosage',
  })
  @IsNumber()
  @Min(1)
  dosage: number;

  @ApiProperty({
    example: 1,
    description: 'Medication frequency',
  })
  @IsNumber()
  @Min(1)
  frequency: number;
}
