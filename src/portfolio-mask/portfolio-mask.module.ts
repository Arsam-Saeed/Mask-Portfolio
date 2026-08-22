import { Module } from '@nestjs/common';
import { PortfolioMaskService } from './portfolio-mask.service';
import { PortfolioMaskController } from './portfolio-mask.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PortfolioMask } from './entities/portfolio-mask.entity';

@Module({
  imports:[TypeOrmModule.forFeature([PortfolioMask])],
  controllers: [PortfolioMaskController],
  providers: [PortfolioMaskService],
})
export class PortfolioMaskModule {}
