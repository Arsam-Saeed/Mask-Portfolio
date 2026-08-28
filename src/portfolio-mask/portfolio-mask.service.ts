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

    private getResendClient(email): Resend {
      if(email = 'arsamsaeedkhan@gmail.com'){
        return new Resend(APP_CONFIG.resendApiKeyArsam);
      } else {
        return new Resend(APP_CONFIG.resendApiKeyUmar);
      }
      
  }

  async sendEmail(createPortfolioMaskDto: CreatePortfolioMaskDto) {
    try {
      const dbRecord = await this.contactRepository.save(createPortfolioMaskDto);

      const resend = this.getResendClient(createPortfolioMaskDto.receiverEmail);
      const emailData = await resend.emails.send({
        from: 'Portfolio Contact <onboarding@resend.dev>',
        to: "arsamsaeedkhan@gmail.com",
       
        subject: `Portfolio Message from ${createPortfolioMaskDto.senderEmail} - ${Date.now()}`,
        html: getProfessionalEmailTemplate({
          senderEmail: createPortfolioMaskDto.senderEmail,
          message: createPortfolioMaskDto.message,
          senderName:createPortfolioMaskDto.senderName,
          dateTime:createPortfolioMaskDto.dateTime
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

  async sendOTP(email){

    let digits = '0123456789';
    let OTP = '';
    let len = digits.length
    for (let i = 0; i < 6; i++) {
        OTP += digits[Math.floor(Math.random() * len)];
    }

     const resend = this.getResendClient(email);
      const emailData = await resend.emails.send({
        from: 'User varifications <onboarding@resend.dev>',
        to: email,
       
        subject: `Your OPT Varifications Code - ${Date.now()}`,
        html:  `Your OPT Varifications Code ${OTP}`
  });

      if (emailData.error) {
        console.error('Resend Error:', emailData.error);
      }

      return {
        success: true,
        otp:OTP,
        message: 'Message sent and saved successfully!',
      };
    } 

}
