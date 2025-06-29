import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsBoolean,
  IsNumber,
  Min,
  IsArray,
  ArrayMinSize,
  ValidateNested,
} from 'class-validator';

export class CreateAnswerDto {
  @ApiProperty({ example: 'Ташкент', description: 'Текст ответа' })
  @IsString({ message: 'Ответ должен быть строкой' })
  @IsNotEmpty({ message: 'Ответ не должен быть пустым' })
  text: string;

  @ApiProperty({ example: true, description: 'Правильный ли это ответ' })
  @IsBoolean({ message: 'Поле isCorrect должно быть булевым значением' })
  isCorrect: boolean;
}

export class CreateQuestionDto {
  @ApiProperty({ example: 'Столица Узбекистана?', description: 'Текст вопроса' })
  @IsString({ message: 'Вопрос должен быть строкой' })
  @IsNotEmpty({ message: 'Вопрос не должен быть пустым' })
  text: string;

  @ApiProperty({ example: 1, description: 'ID группы тестов, к которой относится вопрос' })
  @IsNumber({}, { message: 'groupId должен быть числом' })
  @Min(1, { message: 'groupId должен быть больше 0' })
  groupId: number;

  @ApiProperty({
    type: [CreateAnswerDto],
    description: 'Список возможных ответов (не менее 2)',
  })
  @IsArray({ message: 'answers должно быть массивом' })
  @ArrayMinSize(2, { message: 'Должно быть минимум 2 ответа' })
  @ValidateNested({ each: true })
  @Type(() => CreateAnswerDto)
  answers: CreateAnswerDto[];
}