import { Controller, Post, Body, Res, HttpStatus, Header } from '@nestjs/common';
import { UserService } from '../service/app.service';
import { JwtService } from '../strategy/jwt'; 

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService, 
  ) {}

  @Post('registration')
  async registration(@Body() body: { email: string; pwd: string }, @Res() res) {
    try {
      const { email, pwd } = body;
      const data = await this.userService.createUser(email, pwd);
      res.status(HttpStatus.OK).send(data);
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).send(error.message);
    }
  }

  @Post('authorisation')
  async authorisation(@Body() body: { email: string; pwd: string }, @Res() res) {
    try {
      const { email, pwd } = body;
      const data = await this.userService.authorisationUser(email, pwd);
      const token = this.jwtService.createToken(data); // Использовать метод createToken из JwtService

      res.setHeader('Authorization', this.jwtService.createCookie(token)); // Использовать метод createCookie из JwtService

      res.status(HttpStatus.OK).send(data);
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).send(error.message);
    }
  }
}
