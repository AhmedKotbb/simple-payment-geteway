import { ApiProperty } from '@nestjs/swagger';

export class MerchantCreateDto {
  @ApiProperty({
    description: 'Merchant company name',
    example: 'Acme Corp'
  })
  name: string;

  @ApiProperty({
    description: 'Merchant email address',
    example: 'merchant@acme.com',
    format: 'email'
  })
  email: string;

  @ApiProperty({
    description: 'Type of business',
    example: 'E-commerce'
  })
  businessType: string;

  @ApiProperty({
    description: 'Business address',
    example: '123 Business St, City, Country'
  })
  address: string;

  @ApiProperty({
    description: 'Contact phone number',
    example: '+1234567890'
  })
  phone: string;
}

export class MerchantUpdateDto {
  @ApiProperty({
    description: 'Merchant company name',
    example: 'Updated Corp Name',
    required: false
  })
  name?: string;

  @ApiProperty({
    description: 'Type of business',
    example: 'Updated Business Type',
    required: false
  })
  businessType?: string;

  @ApiProperty({
    description: 'Business address',
    example: 'Updated Address',
    required: false
  })
  address?: string;

  @ApiProperty({
    description: 'Contact phone number',
    example: '+9876543210',
    required: false
  })
  phone?: string;

  @ApiProperty({
    description: 'Merchant status',
    enum: ['active', 'inactive', 'suspended'],
    example: 'active',
    required: false
  })
  status?: 'active' | 'inactive' | 'suspended';
}

export class MerchantResponseDto {
  @ApiProperty({
    description: 'Merchant ID',
    example: '507f1f77bcf86cd799439011'
  })
  id: string;

  @ApiProperty({
    description: 'Merchant company name',
    example: 'Acme Corp'
  })
  name: string;

  @ApiProperty({
    description: 'Merchant email address',
    example: 'merchant@acme.com'
  })
  email: string;

  @ApiProperty({
    description: 'Type of business',
    example: 'E-commerce'
  })
  businessType: string;

  @ApiProperty({
    description: 'Business address',
    example: '123 Business St, City, Country'
  })
  address: string;

  @ApiProperty({
    description: 'Contact phone number',
    example: '+1234567890'
  })
  phone: string;

  @ApiProperty({
    description: 'Merchant status',
    example: 'active'
  })
  status: string;

  @ApiProperty({
    description: 'Creation date',
    example: '2024-01-15T10:30:00Z'
  })
  createdAt: string;
}
