import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { isEmpty } from 'rxjs';

export class ChangePasswordDto {
    @ApiProperty({
        type: String,
        example: '123456',
        nullable: true,
    })
    @IsString()
    @IsNotEmpty()
    oldPassword: string;

    @ApiProperty({
        type: String,
        example: '12345678',
        nullable: true,
    })
    @IsString()
    @IsNotEmpty()
    newPassword: string;
}
