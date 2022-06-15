import { PickType } from '@nestjs/swagger';
import { Employee } from '../entities/employee.entity';

export class PaginationArgs {
  limit?: number = 15;
  page?: number = 1;
}

export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}

export class GetEmployeesDto extends PaginationArgs {
  text?: string;
}

export class CreateEmployeeDto extends PickType(Employee, []) {}

export class Paginator<T> {
  items: T[];
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

export class EmployeesDto extends Paginator<Employee> {
   items: Employee[];
}
