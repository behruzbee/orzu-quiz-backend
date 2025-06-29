import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TestGroupEntity } from './entities/test-group.entity';
import { TestSheetEntity } from '@/test-sheet/entities/test-sheet.entity';
import { CreateTestGroupDto } from './dto/create-test-group.dto';
import { UpdateTestGroupDto } from './dto/update-test-group.dto';

@Injectable()
export class TestGroupService {
  constructor(
    @InjectRepository(TestGroupEntity)
    private readonly groupRepo: Repository<TestGroupEntity>,
    @InjectRepository(TestSheetEntity)
    private readonly sheetRepo: Repository<TestSheetEntity>,
  ) {}

  async create(dto: CreateTestGroupDto): Promise<TestGroupEntity> {
    const sheet = await this.sheetRepo.findOne({ where: { id: dto.sheetId } });
    if (!sheet) {
      throw new NotFoundException(`Тестовый лист с ID ${dto.sheetId} не найден`);
    }

    const group = this.groupRepo.create({
      name: dto.name,
      sheet,
    });

    return this.groupRepo.save(group);
  }

  async findAll(): Promise<TestGroupEntity[]> {
    return this.groupRepo.find({ relations: ['sheet', 'questions'] });
  }

  async findOne(id: number): Promise<TestGroupEntity> {
    const group = await this.groupRepo.findOne({
      where: { id },
      relations: ['sheet', 'questions'],
    });

    if (!group) {
      throw new NotFoundException(`Группа с ID ${id} не найдена`);
    }

    return group;
  }

  async update(id: number, dto: UpdateTestGroupDto): Promise<TestGroupEntity> {
    const group = await this.findOne(id);

    if (dto.name) group.name = dto.name;
    if (dto.sheetId) {
      const sheet = await this.sheetRepo.findOne({ where: { id: dto.sheetId } });
      if (!sheet) {
        throw new NotFoundException(`Тестовый лист с ID ${dto.sheetId} не найден`);
      }
      group.sheet = sheet;
    }

    return this.groupRepo.save(group);
  }

  async remove(id: number): Promise<void> {
    const group = await this.findOne(id);
    await this.groupRepo.remove(group);
  }
}
