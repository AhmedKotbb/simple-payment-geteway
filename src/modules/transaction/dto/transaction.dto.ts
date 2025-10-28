import { ApiProperty } from '@nestjs/swagger';

export class TransactionCreateDto {
  @ApiProperty({
    description: 'Merchant ID',
    example: '507f1f77bcf86cd799439011'
  })
  merchantId: string;

  @ApiProperty({
    description: 'Transaction amount',
    example: 100.50,
    minimum: 0.01
  })
  amount: number;

  @ApiProperty({
    description: 'Currency code',
    example: 'USD',
    enum: ['USD', 'EUR', 'GBP', 'CAD']
  })
  currency: string;

  @ApiProperty({
    description: 'Transaction description',
    example: 'Payment for services'
  })
  description: string;

  @ApiProperty({
    description: 'Customer email address',
    example: 'customer@example.com',
    format: 'email'
  })
  customerEmail: string;

  @ApiProperty({
    description: 'Payment method',
    example: 'credit_card',
    enum: ['credit_card', 'debit_card', 'bank_transfer', 'digital_wallet'],
    required: false
  })
  paymentMethod?: string;
}

export class TransactionDetailsDto {
  @ApiProperty({
    description: 'Transaction ID',
    example: '507f1f77bcf86cd799439011'
  })
  id: string;
}

export class TransactionListDto {
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

  @ApiProperty({
    description: 'Filter by transaction status',
    example: 'pending',
    enum: ['pending', 'approved', 'declined', 'cancelled'],
    required: false
  })
  status?: string;

  @ApiProperty({
    description: 'Filter by merchant ID',
    example: '507f1f77bcf86cd799439011',
    required: false
  })
  merchantId?: string;
}

export class TransactionResponseDto {
  @ApiProperty({
    description: 'Transaction ID',
    example: '507f1f77bcf86cd799439011'
  })
  id: string;

  @ApiProperty({
    description: 'Unique transaction identifier',
    example: 'TXN-123456789'
  })
  transactionId: string;

  @ApiProperty({
    description: 'Transaction status',
    example: 'pending',
    enum: ['pending', 'approved', 'declined', 'cancelled']
  })
  status: string;

  @ApiProperty({
    description: 'Transaction amount',
    example: 100.50
  })
  amount: number;

  @ApiProperty({
    description: 'Currency code',
    example: 'USD'
  })
  currency: string;

  @ApiProperty({
    description: 'Merchant ID',
    example: '507f1f77bcf86cd799439011'
  })
  merchantId: string;

  @ApiProperty({
    description: 'Customer email',
    example: 'customer@example.com'
  })
  customerEmail: string;

  @ApiProperty({
    description: 'Transaction description',
    example: 'Payment for services'
  })
  description: string;

  @ApiProperty({
    description: 'Creation date',
    example: '2024-01-15T10:30:00Z'
  })
  createdAt: string;

  @ApiProperty({
    description: 'Last update date',
    example: '2024-01-15T10:30:00Z'
  })
  updatedAt: string;
}

export class TransactionApprovalResponseDto {
  @ApiProperty({
    description: 'Transaction ID',
    example: '507f1f77bcf86cd799439011'
  })
  id: string;

  @ApiProperty({
    description: 'Transaction status',
    example: 'approved'
  })
  status: string;

  @ApiProperty({
    description: 'Approval date',
    example: '2024-01-15T10:30:00Z'
  })
  approvedAt: string;
}

export class TransactionDeclineResponseDto {
  @ApiProperty({
    description: 'Transaction ID',
    example: '507f1f77bcf86cd799439011'
  })
  id: string;

  @ApiProperty({
    description: 'Transaction status',
    example: 'declined'
  })
  status: string;

  @ApiProperty({
    description: 'Decline date',
    example: '2024-01-15T10:30:00Z'
  })
  declinedAt: string;
}
