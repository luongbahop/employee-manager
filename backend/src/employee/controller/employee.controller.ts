import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetEmployeesDto } from '../dto/employee.dto';
import { Employee } from '../entities/employee.entity';
import { EmployeeService } from '../service/employee.service';

@ApiTags('Employee APIs')
@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}
  
  @Post('create')
  create(@Body() createEmployeeDto: Employee) {
    return this.employeeService.create(createEmployeeDto);
  }

  @Get('list')
  getMany(@Query() query: GetEmployeesDto) {
    return this.employeeService.getMany(query);
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.employeeService.getOne(+id);
  }

  @Put('update/:id')
  update(@Param('id') id: string, @Body() updateEmployeeDto: Employee) {
    return this.employeeService.update(+id, updateEmployeeDto);
  }

  @Delete('delete/:id')
  delete(@Param('id') id: string) {
    return this.employeeService.delete(+id);
  }
}
