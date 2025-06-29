import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TestSheetEntity } from './entities/test-sheet.entity';
import { CreateTestSheetDto } from './dto/create-test-sheet.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class TestSheetService {
  constructor(
    @InjectRepository(TestSheetEntity)
    private readonly sheetRepo: Repository<TestSheetEntity>,
  ) {}

  async create(dto: CreateTestSheetDto): Promise<TestSheetEntity> {
    const sheet = this.sheetRepo.create({
      ...dto,
      accessCode: uuid(),
    });

    return this.sheetRepo.save(sheet);
  }

  async findAll(): Promise<TestSheetEntity[]> {
    return this.sheetRepo.find({ relations: ['groups'] });
  }

  async findByAccessCode(code: string): Promise<TestSheetEntity> {
    const sheet = await this.sheetRepo.findOne({
      where: { accessCode: code },
      relations: ['groups', 'groups.questions', 'groups.questions.answers'],
    });

    if (!sheet) {
      throw new NotFoundException('Тест по ссылке не найден');
    }

    return sheet;
  }

  async remove(id: number): Promise<void> {
    const sheet = await this.sheetRepo.findOne({ where: { id } });
    if (!sheet) throw new NotFoundException('Тест не найден');
    await this.sheetRepo.remove(sheet);
  }
}
