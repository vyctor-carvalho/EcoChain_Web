import { AuthLogin } from "src/auth-login/entities/auth-login.entity";
import { SystemRoles } from "src/auth-login/enums/role.enum";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Enterprise {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ length: 100 })
    name: string;

    @Column({ unique: true, length: 14 })
    cnpj: string;

    @Column(() => AuthLogin, { prefix: false })
    authLogin: AuthLogin;

    @Column({
      type: 'enum',
      enum: SystemRoles,
      default: SystemRoles.ENTERPRISE 
    })
    role: SystemRoles;

    @Column({ nullable: true })
    currentHashedRefreshToken?: string;
}
