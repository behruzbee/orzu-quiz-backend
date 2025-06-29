import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateTestSheetDto {
  @ApiProperty({ example: 'Тест по продажам', description: 'Название теста' })
  @IsString()
  @IsNotEmpty()
  title: string;
}
