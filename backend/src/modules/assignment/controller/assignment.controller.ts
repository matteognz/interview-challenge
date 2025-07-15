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
import { AssignmentService } from '../service/assignment.service';
import { CreateAssignmentDto } from '../dto/create-assignment.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('assignments')
@Controller('assignments')
export class AssignmentController {
  constructor(private readonly assignmentService: AssignmentService) {}

  @ApiOperation({ summary: 'Create a new assignment' })
  @ApiResponse({ status: 201, description: 'Assignment created' })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateAssignmentDto) {
    return this.assignmentService.create(dto);
  }

  @ApiOperation({ summary: 'Get all assignments' })
  @ApiResponse({ status: 200, description: 'List of assignments' })
  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.assignmentService.findAll();
  }

  @ApiOperation({ summary: 'Get assignment by id' })
  @ApiResponse({ status: 200, description: 'Assignment found' })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.assignmentService.findOne(id);
  }

  @ApiOperation({ summary: 'Update assignment by id' })
  @ApiResponse({ status: 200, description: 'Assignment updated successfully' })
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CreateAssignmentDto,
  ) {
    return this.assignmentService.update(id, dto);
  }

  @ApiOperation({ summary: 'Delete assignment by id' })
  @ApiResponse({ status: 204, description: 'Assignment deleted' })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.assignmentService.remove(id);
  }

  @ApiOperation({ summary: 'Get remaining days of treatment' })
  @ApiResponse({ status: 200, description: 'Remaining days returned' })
  @Get(':id/remainingDays')
  @HttpCode(HttpStatus.OK)
  remainingDays(@Param('id', ParseIntPipe) id: number) {
    return this.assignmentService.calculateRemainingDays(id);
  }

  @ApiOperation({ summary: 'Get all patient assignments by patientId' })
  @ApiResponse({ status: 200, description: 'List of patient assignments' })
  @Get('patient/:patientId')
  @HttpCode(HttpStatus.OK)
  async getAssignmentsByPatient(
    @Param('patientId', ParseIntPipe) patientId: number,
  ) {
    return this.assignmentService.findByPatientWithRemainingDays(patientId);
  }
}
