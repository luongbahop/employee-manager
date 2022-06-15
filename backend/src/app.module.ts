import { Module } from '@nestjs/common';
import { EmployeeModule } from './employee/employee.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { join } from 'path';

@Module({
  imports: [
    EmployeeModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '103.74.119.10',
      port: 3306,
      username: 'nest_user',
      password: 'hophop01',
      database: 'nest_employee',
      entities: [join(__dirname, '**/**/*entity{.ts,.js}')],
      synchronize: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
