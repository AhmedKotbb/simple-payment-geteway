import { Body, Controller, Get, Param, Post, Query, UseGuards, UsePipes } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import * as userInterfaces from './DOTs/user.interfaces';
import { JoiValidationPipe } from 'src/pipes/joi-validation/joi-validation.pipe';
import { UserSchemas } from './DOTs/user.schema';
import { UserService } from './user.service';
import { JwtGuard } from 'src/guards/varify-token/varify-token.guard';

@ApiTags('Users')
@ApiBearerAuth('JWT-auth')
@Controller('user')
export class UserController {

    constructor(
        private _service: UserService,
    ){}

    @UseGuards(JwtGuard)
    @Post()
    @UsePipes(new JoiValidationPipe(UserSchemas.createUserSchema))
    @ApiOperation({ summary: 'Create user', description: 'Create a new user account' })
    @ApiBody({
        description: 'User creation data',
        schema: {
            type: 'object',
            properties: {
                name: { type: 'string', example: 'John Doe' },
                email: { type: 'string', format: 'email', example: 'john@example.com' },
                role: { type: 'string', enum: ['admin', 'partner', 'merchant'], example: 'admin' },
                password: { type: 'string', example: 'password123' },
                confiremPassword: { type: 'string', example: 'password123' }
            },
            required: ['name', 'email', 'role', 'password', 'confiremPassword']
        }
    })
    @ApiResponse({ 
        status: 201, 
        description: 'User created successfully',
        schema: {
            type: 'object',
            properties: {
                data: {
                    type: 'object',
                    properties: {
                        id: { type: 'string', example: '507f1f77bcf86cd799439011' },
                        name: { type: 'string', example: 'John Doe' },
                        email: { type: 'string', example: 'john@example.com' },
                        role: { type: 'string', example: 'admin' }
                    }
                },
                message: { type: 'string', example: 'User created successfully!.' }
            }
        }
    })
    @ApiResponse({ status: 400, description: 'Bad request - validation failed' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    async createUserHandler(@Body() userData: userInterfaces.UserCreateDto){
        const response = await this._service.createUser(userData);
        return { data: response, message: 'User created successfully!.' };
    }

    @UseGuards(JwtGuard)
    @Get()
    @UsePipes(new JoiValidationPipe(UserSchemas.listUsers))
    @ApiOperation({ summary: 'List users', description: 'Get paginated list of all users' })
    @ApiQuery({ name: 'page', type: 'number', example: 1, description: 'Page number' })
    @ApiQuery({ name: 'limit', type: 'number', example: 10, description: 'Items per page' })
    @ApiResponse({ 
        status: 200, 
        description: 'Users list fetched successfully',
        schema: {
            type: 'object',
            properties: {
                data: {
                    type: 'object',
                    properties: {
                        documents: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    id: { type: 'string', example: '507f1f77bcf86cd799439011' },
                                    name: { type: 'string', example: 'John Doe' },
                                    email: { type: 'string', example: 'john@example.com' },
                                    role: { type: 'string', example: 'admin' }
                                }
                            }
                        },
                        totalItems: { type: 'number', example: 25 },
                        page: { type: 'number', example: 1 },
                        totalPages: { type: 'number', example: 3 }
                    }
                },
                message: { type: 'string', example: 'Users list fetched successfully!.' }
            }
        }
    })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    async usersListHandler(@Query() options: userInterfaces.listAllUsers){
        const response = await this._service.listAllUsers(options)
        return { data: response, message: 'Users list fetched successfully!.' };
    }

}
 