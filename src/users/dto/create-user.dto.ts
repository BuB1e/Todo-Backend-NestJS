import { IsNotEmpty, IsEmail, IsStrongPassword } from "class-validator";

export class CreateUserDto {

    @IsNotEmpty()
    fullName: string;
    
    @IsNotEmpty() @IsEmail()
    email: string;

    @IsStrongPassword({
        minLength: 6,
        minNumbers: 1,
        minUppercase: 1,
        minLowercase: 1,
        minSymbols: 1,
    }, { message: "Password must be at least 6 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character." })
    password: string;

}
