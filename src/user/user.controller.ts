import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("register")
  async registerUser(@Body() createUserDto: CreateUserDto) {

    const result = await this.userService.registerUser(createUserDto);

    if(!result){
      throw new HttpException('User not registered',HttpStatus.INTERNAL_SERVER_ERROR)
    } 
    return { statusCode:200, data:result, message:'User registration success and OTP send to your email for varification'}
  }

   @Post("login")
  login(@Body() loginDto:LoginDto) {
    return this.userService.login(loginDto);
  }

     @Post("varifyOtp")
  varifyOtp(@Body() loginDto) {
    return this.userService.varifyOtp(loginDto);
  }
}