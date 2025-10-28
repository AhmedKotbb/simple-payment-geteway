import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    description: 'User email address',
    example: 'user@example.com',
    format: 'email'
  })
  email: string;

  @ApiProperty({
    description: 'User password',
    example: 'password123',
    minLength: 6
  })
  password: string;
}

export class UserCreateDto {
  @ApiProperty({
    description: 'User full name',
    example: 'John Doe'
  })
  name: string;

  @ApiProperty({
    description: 'User email address',
    example: 'john@example.com',
    format: 'email'
  })
  email: string;

  @ApiProperty({
    description: 'User role',
    enum: ['admin', 'partner', 'merchant'],
    example: 'admin'
  })
  role: 'admin' | 'partner' | 'merchant';

  @ApiProperty({
    description: 'User password',
    example: 'password123',
    minLength: 6
  })
  password: string;

  @ApiProperty({
    description: 'Password confirmation',
    example: 'password123',
    minLength: 6
  })
  confiremPassword: string;
}

export class PaginationDto {
  @ApiProperty({
    description: 'Page number',
    example: 1,
    minimum: 1,
    default: 1
  })
  page: number;

  @ApiProperty({
    description: 'Items per page',
    example: 10,
    minimum: 1,
    maximum: 100,
    default: 10
  })
  limit: number;
}

export class UserResponseDto {
  @ApiProperty({
    description: 'User ID',
    example: '507f1f77bcf86cd799439011'
  })
  id: string;

  @ApiProperty({
    description: 'User full name',
    example: 'John Doe'
  })
  name: string;

  @ApiProperty({
    description: 'User email address',
    example: 'john@example.com'
  })
  email: string;

  @ApiProperty({
    description: 'User role',
    example: 'admin'
  })
  role: string;
}

export class LoginResponseDto {
  @ApiProperty({
    description: 'JWT access token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
  })
  token: string;

  @ApiProperty({
    description: 'User information',
    type: UserResponseDto
  })
  user: UserResponseDto;
}
