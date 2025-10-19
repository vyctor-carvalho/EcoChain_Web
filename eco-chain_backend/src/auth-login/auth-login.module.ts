import { Module } from '@nestjs/common';
import { AuthLoginService } from './auth-login.service';
import { AuthLoginController } from './auth-login.controller';
import { EnterpriseModule } from 'src/enterprise/enterprise.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
import { EmployeeModule } from 'src/employee/employee.module';

@Module({
  imports: [
    EnterpriseModule,
    PassportModule,
    EmployeeModule,
    JwtModule.register({}),
  ], 
  controllers: [AuthLoginController],
  providers: [
    AuthLoginService,
    LocalStrategy,
    JwtStrategy,
    JwtRefreshStrategy
  ],
  exports: [AuthLoginService], 
})
export class AuthLoginModule {}
