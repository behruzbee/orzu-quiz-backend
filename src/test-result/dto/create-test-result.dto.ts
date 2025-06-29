import { IsString, IsNotEmpty, IsNumber, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class AnswerDto {
  @ApiProperty({ example: 12 })
  @IsNumber()
  questionId: number;

  @ApiProperty({ example: 45 })
  @IsNumber()
  selectedAnswerId: number;
}

export class CreateTestResultDto {
  @ApiProperty({ example: 'Ахмедов Жахонгир' })
  @IsString()
  @IsNotEmpty()
  userName: string;

  @ApiProperty({ example: 'Филиал №1' })
  @IsString()
  @IsNotEmpty()
  department: string;

  @ApiProperty({ example: 5 })
  @IsNumber()
  sheetId: number;

  @ApiProperty({ type: [AnswerDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AnswerDto)
  answers: AnswerDto[];
}
