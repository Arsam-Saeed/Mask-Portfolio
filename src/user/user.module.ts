import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { PortfolioMaskModule } from 'src/portfolio-mask/portfolio-mask.module';

@Module({
  imports:[TypeOrmModule.forFeature([User]),PortfolioMaskModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
