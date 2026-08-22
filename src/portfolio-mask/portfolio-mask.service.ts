import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreatePortfolioMaskDto } from './dto/create-portfolio-mask.dto';
import { InjectRepository, } from '@nestjs/typeorm';
import { PortfolioMask } from './entities/portfolio-mask.entity';
import { Repository } from 'typeorm';
import { Resend } from 'resend';
import { getProfessionalEmailTemplate } from 'src/common/emailTemplates';
import { APP_CONFIG } from 'src/common/config';

@Injectable()
export class PortfolioMaskService {
 constructor(
    @InjectRepository(PortfolioMask)
    private readonly contactRepository: Repository<PortfolioMask>,
  ) {}

    private getResendClient(): Resend {
    return new Resend(APP_CONFIG.resendApiKey);
  }

  async sendEmail(createPortfolioMaskDto: CreatePortfolioMaskDto) {
    try {
      const dbRecord = await this.contactRepository.save(createPortfolioMaskDto);

      const resend = this.getResendClient();
      const emailData = await resend.emails.send({
        from: 'Portfolio Contact <onboarding@resend.dev>',
        to: "arsamsaeedkhan@gmail.com",
       
        subject: `Portfolio Message from ${createPortfolioMaskDto.sender_email} - ${Date.now()}`,
        html: getProfessionalEmailTemplate({
          senderEmail: createPortfolioMaskDto.sender_email,
          message: createPortfolioMaskDto.message,
        }),
      });

      if (emailData.error) {
        console.error('Resend Error:', emailData.error);
        return {
          success: false,
          message: `Email failed: ${emailData.error.message}`,
          data: dbRecord,
        };
      }

      return {
        success: true,
        message: 'Message sent and saved successfully!',
        data: dbRecord,
      };
    } catch (error) {
      const err = error as Error;
      throw new InternalServerErrorException({
        success: false,
        message: err.message || 'Something went wrong',
        error: err.name || 'InternalServerError',
      });
    }
  }



}
