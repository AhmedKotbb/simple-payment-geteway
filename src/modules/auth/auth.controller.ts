import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { JoiValidationPipe } from 'src/pipes/joi-validation/joi-validation.pipe';
import * as authInterfaces from './DOTs/auth.interfaces';
import { AuthService } from './auth.service';
import { authSchemas } from './DOTs/auth.schema';

@Controller('auth')
export class AuthController {

    constructor(
        private _service: AuthService,
    ){}

    @Post('login')
    @UsePipes(new JoiValidationPipe(authSchemas.login))
    async login(@Body() loginData: authInterfaces.loginInterface){
        const response = await this._service.login(loginData)
        return { data: response, message: 'User logged in successfully!.' };
    }
    
}
