import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EditEmployeeDto } from '../dto/edit-employee.dto';
import { CreateEmployeeDto, GetEmployeesDto } from '../dto/employee.dto';
import { EmployeeService } from '../service/employee.service';

@ApiTags('Employee APIs')
@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post('create')
  async create(@Body() createEmployeeDto: CreateEmployeeDto) {
    const data = await this.employeeService.create(createEmployeeDto);
    return { success: true, data };
  }

  @Get('list')
  async getMany(@Query() query: GetEmployeesDto) {
    const data = await this.employeeService.getMany(query);
    return { success: true, data };
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    const data = await this.employeeService.getOne(+id);
    return { success: true, data };
  }

  @Put('update/:id')
  async update(
    @Param('id') id: string,
    @Body() updateEmployeeDto: EditEmployeeDto,
  ) {
    const data = await this.employeeService.update(+id, updateEmployeeDto);
    return { success: true, data };
  }

  @Delete('delete/:id')
  async delete(@Param('id') id: string) {
    const data = await this.employeeService.delete(+id);
    return { success: true, data };
  }
}
