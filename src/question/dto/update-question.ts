import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsArray,
  ArrayMinSize,
  ValidateNested,
  IsBoolean,
} from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateAnswerDto {
  @ApiProperty({ example: 'Ташкент', description: 'Текст ответа' })
  @IsString({ message: 'Ответ должен быть строкой' })
  @IsNotEmpty({ message: 'Ответ не должен быть пустым' })
  text: string;

  @ApiProperty({ example: true, description: 'Правильный ли это ответ' })
  @IsBoolean({ message: 'Поле isCorrect должно быть булевым значением' })
  isCorrect: boolean;
}

export class UpdateQuestionDto {
  @ApiProperty({ example: 'Какой город является столицей Узбекистана?', description: 'Текст вопроса' })
  @IsString({ message: 'Вопрос должен быть строкой' })
  @IsNotEmpty({ message: 'Вопрос не должен быть пустым' })
  text: string;

  @ApiProperty({
    type: [UpdateAnswerDto],
    description: 'Список возможных ответов (не менее 2)',
  })
  @IsArray({ message: 'answers должно быть массивом' })
  @ArrayMinSize(2, { message: 'Минимум два варианта ответа обязательно' })
  @ValidateNested({ each: true })
  @Type(() => UpdateAnswerDto)
  answers: UpdateAnswerDto[];
}