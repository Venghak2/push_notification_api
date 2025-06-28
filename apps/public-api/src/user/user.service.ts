import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'libs/common/src/prisma/prisma.service';
import { comparePassword } from 'libs/common/src/decorator/comparePassword.decorator';
import * as bcrypt from 'bcrypt';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

@Injectable()
export class UserService {
    
    private readonly logger = new Logger(UserService.name);
    constructor(
        private readonly prismaService: PrismaService,
    ){}
  
    async getUserById(id: number) {
        try {
            const user = await this.prismaService.users.findUnique({
                where: { id: id },
            });
            if (!user) {
                throw new NotFoundException('User not found');
            }
            return user;
        }
        catch (error) {
            this.logger.error(`Failed to get user by id: ${error.message}`);
            throw error;
        }
    }

    async changePassword(id: number, changePasswordDto: ChangePasswordDto) {
        const { oldPassword, newPassword } = changePasswordDto;

        try {
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            const user = await this.getUserById(id)
    
            const isValidPassword = await comparePassword(oldPassword, user.password);
            if (!isValidPassword) {
                throw new BadRequestException('The password confirm does not match!');
            }
    
            await this.prismaService.users.update({
                where: { id: id },
                data: { password: hashedPassword },
            });
    
            return {
                isSuccess: true,
                message: 'Password changed successfully',
            }
        }
        catch (error) {
            this.logger.error(`Failed to change password: ${error.message}`);
            throw error;
        }
    }

    async resetPasswordByEmail(resetPasswordDto: ResetPasswordDto){
        const { email, newPassword } = resetPasswordDto;

        try{
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            const user = await this.prismaService.users.findFirst({
                where: { email: email },
            });
            if (!user) {
                throw new NotFoundException(`This email ${email} does not exist!`);
            }
    
            await this.prismaService.users.update({
                where: { id: user.id },
                data: { password: hashedPassword },
            })
    
            return {
                isSuccess: true,
                message: 'Password reset successfully',
            }
        }
        catch (error) {
            this.logger.error(`Failed to reset password: ${error.message}`);
            throw error;
        }

    }

}
