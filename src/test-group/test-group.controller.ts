import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Put,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger';
import { TestGroupService } from './test-group.service';
import { CreateTestGroupDto } from './dto/create-test-group.dto';
import { UpdateTestGroupDto } from './dto/update-test-group.dto';

@ApiTags('Test Groups')
@Controller('test-groups')
export class TestGroupController {
  constructor(private readonly service: TestGroupService) {}

  @Post()
  @ApiOperation({ summary: 'Создать группу' })
  @ApiResponse({ status: 201, description: 'Группа успешно создана' })
  async create(@Body() dto: CreateTestGroupDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Получить все группы' })
  async findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить группу по ID' })
  @ApiParam({ name: 'id', type: Number })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Обновить группу' })
  @ApiParam({ name: 'id', type: Number })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateTestGroupDto,
  ) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить группу' })
  @ApiParam({ name: 'id', type: Number })
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.service.remove(id);
    return { message: `Группа ${id} успешно удалена` };
  }
}
