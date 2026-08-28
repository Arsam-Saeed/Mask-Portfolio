import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PortfolioMaskService } from './portfolio-mask.service';
import { CreatePortfolioMaskDto } from './dto/create-portfolio-mask.dto';
import { UpdatePortfolioMaskDto } from './dto/update-portfolio-mask.dto';

@Controller('portfolio-mask')//Controller is a route handler
export class PortfolioMaskController {
  constructor(private readonly portfolioMaskService: PortfolioMaskService) {}

  @Post()
  create(@Body() createPortfolioMaskDto: CreatePortfolioMaskDto) {
    return this.portfolioMaskService.sendEmail(createPortfolioMaskDto);//here this is an object of the class-(PortfolioMaskController)
  }
}