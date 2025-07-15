import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
  Put,
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
  create(@Body() dto: CreateAssignmentDto) {
    return this.assignmentService.create(dto);
  }

  @ApiOperation({ summary: 'Get all assignments' })
  @ApiResponse({ status: 200, description: 'List of assignments' })
  @Get()
  findAll() {
    return this.assignmentService.findAll();
  }

  @ApiOperation({ summary: 'Get assignment by id' })
  @ApiResponse({ status: 200, description: 'Assignment found' })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.assignmentService.findOne(id);
  }

  @ApiOperation({ summary: 'Update assignment by id' })
  @ApiResponse({ status: 200, description: 'Assignment updated successfully' })
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CreateAssignmentDto,
  ) {
    return this.assignmentService.update(id, dto);
  }

  @ApiOperation({ summary: 'Delete assignment by id' })
  @ApiResponse({ status: 204, description: 'Assignment deleted' })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.assignmentService.remove(id);
  }

  @ApiOperation({ summary: 'Get remaining days of treatment' })
  @ApiResponse({ status: 200, description: 'Remaining days returned' })
  @Get(':id/remainingDays')
  remainingDays(@Param('id', ParseIntPipe) id: number) {
    return this.assignmentService.calculateRemainingDays(id);
  }
}
