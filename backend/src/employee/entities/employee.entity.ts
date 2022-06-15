import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tb_employees')
export class Employee {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id: number;

  @Column({
    type: 'varchar',
    collation: 'utf8_unicode_ci',
    length: 100,
  })
  first_name: string;

  @Column({
    type: 'varchar',
    collation: 'utf8_unicode_ci',
    length: 100,
  })
  last_name: string;

  @Column({
    type: 'varchar',
    collation: 'utf8_unicode_ci',
    length: 100,
  })
  email: string;

  @Column({
    type: 'varchar',
    collation: 'utf8_unicode_ci',
    length: 100,
  })
  phone: string;

  @Column({
    type: 'int',
    width: 1,
  })
  gender: number;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updated_at: string;
}
