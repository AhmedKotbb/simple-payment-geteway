import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import * as userInterfaces from './DOTs/user.interfaces';
import { UserRepository } from 'src/db-config/repositories/user.repository';
import { UserRole } from 'src/db-config/schemas/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {

    constructor(private repo: UserRepository) {}

    public async createUser(userData: userInterfaces.UserCreateDto){
        const {name, email, role, password, confiremPassword} = userData;

        const oldUser = await this.repo.findByEmail(email);
        if(oldUser) throw new BadRequestException('This email already have an account, please review');

        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = await this.repo.create({
            name,
            email,
            role: role as UserRole,
            hashedPassword
        });

        return true;
    }

    public async listAllUsers(options: userInterfaces.listAllUsers) {
        const list = await this.repo.findAll(options)
        return list
    }
}
