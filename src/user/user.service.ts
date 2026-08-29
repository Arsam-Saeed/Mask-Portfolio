import { HttpCode, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { LoginDto } from './dto/login.dto';
import bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { PortfolioMaskService } from 'src/portfolio-mask/portfolio-mask.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)private  readonly userRepository:Repository<User>,
    private readonly portfolioMaskService: PortfolioMaskService
  ){}
    async registerUser(userData: CreateUserDto) {

    const userExist = await this.userRepository.findOne({
      where:{
        userEmail:userData.userEmail
      }
    })

    if(userExist){
      throw new HttpException('User email already exist',HttpStatus.CONFLICT)
    }

    const passwordHash = await bcrypt.hash(userData.password, 10);
    const user = await this.userRepository.save({ ...userData, passwordHash })
   const otpData = await this.portfolioMaskService.sendOTP(user.userEmail)
    await this.userRepository.save({ ...userData,passwordHash ,otp:otpData.otp })
    return user
  }


  async login(loginData:LoginDto){

    const user = await this.userRepository.findOne({
      where:{
        userEmail:loginData.userEmail
      }
    })

    if(!user){
        throw new HttpException('User not exist',HttpStatus.NOT_FOUND)
    }

    const isValidPassword = await bcrypt.compare(loginData.password, user.passwordHash);

    if(isValidPassword){
      return {statusCode:200, data:user , message:'success'}
    }    else{
      return {status : 403, message:'invalid user password'}
    }
   }


   async varifyOtp(data){
     const userExist = await this.userRepository.findOne({
      where:{
        userEmail:data.userEmail
      }
    })

    if(!userExist){
      throw new HttpException('User not exist',HttpStatus.CONFLICT)
    }
    if(data.opt === userExist.otp){
      return {statusCode:200, data:userExist,message:"Verification Successfully"}
    }
    return {statusCode:200, data:userExist,message:"Verification Successfully"}
  }
}
