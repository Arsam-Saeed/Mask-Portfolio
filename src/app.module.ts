import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PortfolioMaskModule } from './portfolio-mask/portfolio-mask.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {TypeOrmModule} from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',

        url: configService.getOrThrow<string>('DATABASE_URL'),

        autoLoadEntities: true,
        synchronize: true,

        ssl: {
          rejectUnauthorized: false,
        },
      }),
    }),
    
    
    
    
    PortfolioMaskModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
