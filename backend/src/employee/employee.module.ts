import { Module } from '@nestjs/common';
import { EmployeeService } from './service/employee.service';
import { EmployeeController } from './controller/employee.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Employee])],
  providers: [EmployeeService],
  controllers: [EmployeeController]
})
export class EmployeeModule {}
