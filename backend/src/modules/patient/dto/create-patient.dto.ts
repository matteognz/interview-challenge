import { IsDateString, IsNotEmpty, IsString } from '@nestjs/class-validator';

export class CreatePatientDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsDateString()
  @IsNotEmpty()
  dateOfBirth: string;
}
