import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EditEmployeeDto } from '../dto/edit-employee.dto';
import {
  CreateEmployeeDto,
  EmployeesDto,
  GetEmployeesDto,
} from '../dto/employee.dto';
import { Employee } from '../entities/employee.entity';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
  ) {}

  async getMany({
    text = '',
    limit = 10,
    page = 1,
  }: GetEmployeesDto): Promise<EmployeesDto> {
    const [items, totalItems] = await this.employeeRepository.findAndCount({
      take: +limit,
      skip: +limit * (+page - 1),
    });

    return {
      items,
      totalItems,
      currentPage: Number(page),
      totalPages: Math.ceil(totalItems / limit),
      pageSize: Number(limit),
    };
  }

  async getOne(id: number) {
    const data = await this.employeeRepository.findOne({ where: { id } });
    return data;
  }

  async create(dto: CreateEmployeeDto) {
    return await this.employeeRepository.save(dto);
  }

  async update(id: number, dto: EditEmployeeDto) {
    const employee = await this.getOne(id);
    const editedEmployee = { ...employee, ...dto };
    return await this.employeeRepository.save(editedEmployee);
  }

  async delete(id: number) {
    const employee = await this.getOne(id);
    return await this.employeeRepository.remove(employee);
  }
}
