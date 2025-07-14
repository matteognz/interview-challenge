import { IsDateString, IsNotEmpty, IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePatientDto {
  @ApiProperty({
    example: 'Matteo Gonzi',
    description: 'Patient name',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: '1999-06-01',
    description: 'Date of Birth',
    type: String,
    format: 'date',
  })
  @IsDateString()
  @IsNotEmpty()
  dateOfBirth: string;
}
