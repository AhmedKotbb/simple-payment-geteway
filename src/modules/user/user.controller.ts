import { Body, Controller, Get, Param, Post, Query, UseGuards, UsePipes } from '@nestjs/common';
import * as userInterfaces from './DOTs/user.interfaces';
import { JoiValidationPipe } from 'src/pipes/joi-validation/joi-validation.pipe';
import { UserSchemas } from './DOTs/user.schema';
import { UserService } from './user.service';
import { JwtGuard } from 'src/guards/varify-token/varify-token.guard';

@Controller('user')
export class UserController {

    constructor(
        private _service: UserService,
    ){}

    @UseGuards(JwtGuard)
    @Post()
    @UsePipes(new JoiValidationPipe(UserSchemas.createUserSchema))
    async createUserHandler(@Body() userData: userInterfaces.UserCreateDto){
        const response = await this._service.createUser(userData);
        return { data: response, message: 'User created successfully!.' };
    }


    @UseGuards(JwtGuard)
    @Get()
    @UsePipes(new JoiValidationPipe(UserSchemas.listUsers))
    async usersListHandler(@Query() options: userInterfaces.listAllUsers){
        const response = await this._service.listAllUsers(options)
        return { data: response, message: 'Users list fetched successfully!.' };
    }

}
 