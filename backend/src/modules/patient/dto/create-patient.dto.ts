import { IsNotEmpty, IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate } from 'class-validator';

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
  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  dateOfBirth: Date;
}
