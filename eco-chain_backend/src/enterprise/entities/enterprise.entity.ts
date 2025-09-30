import { AuthLogin } from "src/auth-login/entities/auth-login.entity";
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

    @Column({ nullable: true })
    currentHashedRefreshToken?: string;
}
