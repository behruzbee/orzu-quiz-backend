import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger';
import { TestResultService } from './test-result.service';
import { CreateTestResultDto } from './dto/create-test-result.dto';

@ApiTags('Test Results')
@Controller('test-results')
export class TestResultController {
  constructor(private readonly service: TestResultService) {}

  @Post()
  @ApiOperation({ summary: 'Сохранить результат теста' })
  @ApiResponse({ status: 201, description: 'Результат успешно сохранён' })
  async create(@Body() dto: CreateTestResultDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Получить все результаты' })
  async findAll() {
    return this.service.findAll();
  }

  @Get('sheet/:sheetId')
  @ApiOperation({ summary: 'Получить результаты по ID теста' })
  @ApiParam({ name: 'sheetId', type: Number })
  async findBySheet(@Param('sheetId', ParseIntPipe) sheetId: number) {
    return this.service.findBySheet(sheetId);
  }

  @Get(':resultId/stats')
  @ApiOperation({ summary: 'Статистика по группам для пользователя' })
  @ApiParam({ name: 'resultId', type: Number })
  async getUserStats(@Param('resultId', ParseIntPipe) resultId: number) {
    return this.service.getUserGroupStats(resultId);
  }

  @Get('global/stats')
  @ApiOperation({ summary: 'Глобальная статистика по группам' })
  async getGlobalStats() {
    return this.service.getGlobalGroupStats();
  }
}
