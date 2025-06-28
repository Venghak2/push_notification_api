import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateRegisterDto } from './dto/create-register.dto';
import { PrismaService } from 'libs/common/src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class RegisterService {

    private readonly logger = new Logger(RegisterService.name);
    constructor(
        private readonly prismaService: PrismaService
    ) {}

    async register(createRegisterDto: CreateRegisterDto) {
        const { fist_name, last_name, username, email, password } = createRegisterDto;
        try {
            await this.existUsers(username, email);
            const setPassword = await bcrypt.hash(password, 10);
            const user = await this.prismaService.users.create({
                data: {
                    first_name: fist_name,
                    last_name: last_name,
                    username,
                    email,
                    password: setPassword,
                }
            });
            this.logger.log(`Create user successfully: ${user}`);
            return user;
        }
        catch (error) {
            this.logger.error(`Failed to register user: ${error.message}`);
            throw new BadRequestException('Registration failed, please try again');
        }
    }

    async existUsers(username: string, email: string) {
        const user = await this.prismaService.users.findFirst({
            where: {
                OR: [
                    { username },
                    { email },
                ]
            }
        });
        if(user?.username === username) {
            throw new BadRequestException(`Username is already registered`);
        }
        else if(user?.email === email) {
            throw new BadRequestException(`Email is already registered`);
        }  
    }
}
