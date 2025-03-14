import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
    constructor(
        private userService : UsersService,
        private jwtService : JwtService
    ) {}

    async signUp(
        fullName: string,
        email: string,
        pwInput: string,
    ) : Promise<User> {
        const password = await bcrypt.hash(pwInput, 10);
        return await this.userService.create({
            fullName,
            email,
            password
        }); 
    }

    async signIn(
        email: string, 
        pwInput : string
    ) : Promise<{ access_token: string }> {
        const user = await this.userService.findByEmail(email);

        if(!user)
            throw new NotFoundException();

        const isMatch = await bcrypt.compare(pwInput, user.password)

        if(!isMatch) {
            throw new UnauthorizedException();
        }

        const payload = { id: user.id, email: user.email };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}
