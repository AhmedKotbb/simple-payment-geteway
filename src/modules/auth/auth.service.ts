import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from 'src/db-config/repositories/user.repository';
import { loginInterface } from './DOTs/auth.interfaces';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { v4 as uuidv4 } from 'uuid';



@Injectable()
export class AuthService {
    constructor(
        private config: ConfigService,
        private repo: UserRepository
    ) { }

    public async login(loginData: loginInterface) {
        const { email, password } = loginData;

        const user = await this.repo.findByEmail(email);
        if (!user) throw new NotFoundException('User not found, please review.');

        const isMatch = await bcrypt.compare(password, user.hashedPassword);
        if (!isMatch) throw new BadRequestException('Wrong password, please review.')

        const tokenID = uuidv4()
        const payload = { tokenID, id: user['_id'], email: user.email, role: user.role };


        const token = jwt.sign(payload, this.config.get<string>('JWT_SECRET_KEY')!, {
            expiresIn: this.config.get('JWT_EXPIRES_IN') || '1h',
        });

        await this.repo.update(user['_id'], { activeTokenID: tokenID } )

        return { token }

    }

}

