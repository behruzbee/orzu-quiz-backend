import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Delete,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger';
import { CreateTestSheetDto } from './dto/create-test-sheet.dto';
import { TestSheetService } from './test-sheet-service';

@ApiTags('Test Sheets')
@Controller('test-sheets')
export class TestSheetController {
  constructor(private readonly service: TestSheetService) {}

  @Post()
  @ApiOperation({ summary: 'Создать тестовый лист (с ссылкой)' })
  @ApiResponse({ status: 201, description: 'Тест создан, ссылка сгенерирована' })
  async create(@Body() dto: CreateTestSheetDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Получить все тесты' })
  async findAll() {
    return this.service.findAll();
  }

  @Get('access/:code')
  @ApiOperation({ summary: 'Получить тест по ссылке' })
  @ApiParam({ name: 'code', description: 'Уникальный код доступа (ссылка)' })
  async findByAccessCode(@Param('code') code: string) {
    return this.service.findByAccessCode(code);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить тест' })
  async remove(@Param('id') id: string) {
    return this.service.remove(Number(id));
  }
}
