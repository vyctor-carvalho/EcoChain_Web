import { AuthLogin } from 'src/auth-login/entities/auth-login.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { SystemRoles } from '../../auth-login/enums/role.enum';

@Entity('employees') 
export class Employee {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column({ unique: true, length: 14 }) 
  cpf: string;

  @Column()
  idade: number;

  @Column({ nullable: true })
  phone?: string;

  @Column({
    type: 'enum',
    enum: SystemRoles,
    default: SystemRoles.OPERATIONAL,
    name: 'employee_role',
  })
  role: SystemRoles;

  @Column(() => AuthLogin, { prefix: false })
  authLogin: AuthLogin;

  @Column({ nullable: true })
  currentHashedRefreshToken?: string;
}