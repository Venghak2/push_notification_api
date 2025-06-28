import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from 'libs/common/src/prisma/prisma.module';
import { RegisterModule } from './register/register.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true 
    }),
    PrismaModule,
    RegisterModule, 
    AuthModule,
    UserModule,
  ],
  providers: [AppService],
})
export class AppModule {}
