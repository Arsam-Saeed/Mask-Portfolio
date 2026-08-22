import { PartialType } from '@nestjs/mapped-types';
import { CreatePortfolioMaskDto } from './create-portfolio-mask.dto';

export class UpdatePortfolioMaskDto extends PartialType(CreatePortfolioMaskDto) {
        id!:number;
        senderEmail!:string;
        receiverEmail!:string;
        message!:string;
}
