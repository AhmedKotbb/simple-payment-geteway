import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { JoiValidationPipe } from 'src/pipes/joi-validation/joi-validation.pipe';
import * as authInterfaces from './DOTs/auth.interfaces';
import { AuthService } from './auth.service';
import { authSchemas } from './DOTs/auth.schema';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {

    constructor(
        private _service: AuthService,
    ){}

    @Post('login')
    @UsePipes(new JoiValidationPipe(authSchemas.login))
    @ApiOperation({ summary: 'User login', description: 'Authenticate user with email and password' })
    @ApiBody({
        description: 'Login credentials',
        schema: {
            type: 'object',
            properties: {
                email: { type: 'string', format: 'email', example: 'user@example.com' },
                password: { type: 'string', example: 'password123' }
            },
            required: ['email', 'password']
        }
    })
    @ApiResponse({ 
        status: 200, 
        description: 'User logged in successfully',
        schema: {
            type: 'object',
            properties: {
                data: {
                    type: 'object',
                    properties: {
                        token: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' },
                        user: {
                            type: 'object',
                            properties: {
                                id: { type: 'string', example: '507f1f77bcf86cd799439011' },
                                email: { type: 'string', example: 'user@example.com' },
                                role: { type: 'string', example: 'admin' }
                            }
                        }
                    }
                },
                message: { type: 'string', example: 'User logged in successfully!.' }
            }
        }
    })
    @ApiResponse({ status: 401, description: 'Invalid credentials' })
    async login(@Body() loginData: authInterfaces.loginInterface){
        const response = await this._service.login(loginData)
        return { data: response, message: 'User logged in successfully!.' };
    }
    
}
