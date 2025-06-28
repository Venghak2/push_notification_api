import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class  ResetPasswordDto{
    
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({
        type:String,
        example: 'venghak@gmail.com',
        nullable: true,
    })
    email: string;
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        type:String,
        example: '12345',
        nullable: true,
    })
    newPassword: string;
}
