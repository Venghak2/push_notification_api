import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from 'libs/common/src/prisma/prisma.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true 
    }), 
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
