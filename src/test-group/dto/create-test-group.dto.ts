import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateTestGroupDto {
  @ApiProperty({ example: '1С Саралаш', description: 'Название группы' })
  @IsString({ message: 'Название должно быть строкой' })
  @IsNotEmpty({ message: 'Название не должно быть пустым' })
  name: string;

  @ApiProperty({ example: 1, description: 'ID тестового листа' })
  @IsNumber({}, { message: 'ID листа должен быть числом' })
  sheetId: number;
}
