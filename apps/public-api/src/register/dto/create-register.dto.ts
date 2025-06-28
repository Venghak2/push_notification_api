import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateRegisterDto {
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        type: String,
        example: "veng",
        nullable: true,
    })
    fist_name: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        type: String,
        example: "hak",
        nullable: true,
    })
    last_name: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        type: String,
        example: "venghak",
        nullable: true,
    })
    username: string;
    

    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({
        type: String,
        example: "venghak@gmail.com",
        nullable: true,
    })
    email: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        type: String,
        example: "12345",
        nullable: true,
    })
    password: string;

}
