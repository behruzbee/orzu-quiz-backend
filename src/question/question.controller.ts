import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { QuestionService } from './question.service';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question';

@ApiTags('Questions')
@Controller('questions')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post()
  @ApiOperation({ summary: 'Создать вопрос с ответами' })
  @ApiResponse({ status: 201, description: 'Вопрос создан' })
  async create(@Body() createDto: CreateQuestionDto) {
    return this.questionService.create(createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Получить все вопросы' })
  async findAll() {
    return this.questionService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить один вопрос по ID' })
  @ApiParam({ name: 'id', type: Number })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.questionService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Обновить вопрос' })
  @ApiParam({ name: 'id', type: Number })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateQuestionDto,
  ) {
    return this.questionService.update(id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить вопрос' })
  @ApiParam({ name: 'id', type: Number })
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.questionService.remove(id);
    return { message: `Question ${id} deleted successfully` };
  }
}
