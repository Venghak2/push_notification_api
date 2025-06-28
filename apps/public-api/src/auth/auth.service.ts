import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { PrismaService } from 'libs/common/src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { comparePassword } from 'libs/common/src/decorator/comparePassword.decorator';

@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name);
    constructor( 
        private readonly prismaService: PrismaService,
        private readonly jwtService: JwtService,
    ){}
  
  async login(createAuthDto: CreateAuthDto) {
    const { username, password } = createAuthDto;

    try {
      const checkuser = await this.validateUser(username, password);
      if(checkuser != null){
        const payload = {email: username, sub: checkuser.id, id: checkuser.id};
        this.logger.log(`username : ${username} - login success - ${new Date()}`);

        return {
          data: checkuser,
          access_token: this.jwtService.sign(payload),
        }
      }

      this.logger.warn(`username : ${username} - login failed - ${new Date()}`);
      throw new HttpException(
        'The login is not correct',
        HttpStatus.UNAUTHORIZED,
      )
    }
    catch (error) {
      this.logger.error(`Error during login: ${error.message}`);
      throw error;
    }
  }

  async validateUser(username: string, password: string) {
    const user = await this.prismaService.users.findFirst({
      where: { 
        OR: [
          { email: username }, 
          { username: username }] 
        } 
    });
    
    if(user && await comparePassword(password, user.password)){
       return user;
    }
    return null;
  }

  async getUserById(id: number) {
    const user = await this.prismaService.users.findUnique({
      where: { id: id },
    });
    return user;
  }
}
