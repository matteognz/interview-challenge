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
import { MedicationService } from '../service/medication.service';
import { CreateMedicationDto } from '../dto/create-medication.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('medications')
@Controller('medications')
export class MedicationController {
  constructor(private readonly medicationService: MedicationService) {}

  @ApiOperation({ summary: 'Create new medication' })
  @ApiResponse({
    status: 201,
    description: 'New medication created successfully',
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateMedicationDto) {
    return this.medicationService.create(dto);
  }

  @ApiOperation({ summary: 'Retrieve all medications' })
  @ApiResponse({ status: 200, description: 'List of all medications' })
  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.medicationService.findAll();
  }

  @ApiOperation({ summary: 'Retrieve medication by id' })
  @ApiResponse({ status: 200, description: 'Medication found' })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.medicationService.findOne(id);
  }

  @ApiOperation({ summary: 'Update medication by id' })
  @ApiResponse({ status: 200, description: 'Medication updated successfully' })
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: Partial<CreateMedicationDto>,
  ) {
    return this.medicationService.update(id, dto);
  }

  @ApiOperation({ summary: 'Delete medication by id' })
  @ApiResponse({ status: 204, description: 'Medication deleted successfully' })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.medicationService.remove(id);
  }
}
