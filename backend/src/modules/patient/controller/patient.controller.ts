import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
  Put,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { PatientService } from '../service/patient.service';
import { CreatePatientDto } from '../dto/create-patient.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('patients')
@Controller('patients')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @ApiOperation({ summary: 'Create new patient' })
  @ApiResponse({ status: 201, description: 'New patient created successfully' })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreatePatientDto) {
    return this.patientService.create(dto);
  }

  @ApiOperation({ summary: 'Retrieve all patients' })
  @ApiResponse({ status: 200, description: 'List of all patients' })
  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.patientService.findAll();
  }

  @ApiOperation({ summary: 'Retrieve patient by id' })
  @ApiResponse({ status: 200, description: 'Patient found' })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.patientService.findOne(id);
  }

  @ApiOperation({ summary: 'Update patient by id' })
  @ApiResponse({
    status: 200,
    description: 'Patient updated successfully',
  })
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: Partial<CreatePatientDto>,
  ) {
    return this.patientService.update(id, dto);
  }

  @ApiOperation({ summary: 'Delete patient by id' })
  @ApiResponse({
    status: 204,
    description: 'Patient deleted successfully',
  })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.patientService.remove(id);
  }
}
