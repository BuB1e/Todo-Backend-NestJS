import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
    constructor(
        private userService : UsersService,
        private jwtService : JwtService
    ) {}

    async signUp(
        email: string,
        pwInput: string,
        fullName: string,
    ) : Promise<User> {
        const salt = await bcrypt.genSalt();
        const password = await bcrypt.hash(pwInput, salt);
        return await this.userService.create({
            fullName,
            email,
            password,
        }); 
    }

    async signIn(
        email: string, 
        pwInput : string
    ) : Promise<{ access_token: string }> {
        const user = await this.userService.findByEmail(email);

        if(!user)
            throw new NotFoundException();

        const password = pwInput+user.salt;
        const isMatch = await bcrypt.compare(user?.password, password)

        if(!isMatch) {
            throw new UnauthorizedException();
        }

        const payload = { sub: user.id, email: user.email };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}
