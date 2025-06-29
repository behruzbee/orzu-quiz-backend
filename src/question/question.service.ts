import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from './entities/question.entity';
import { Answer } from '@/answer/entities/answer.entity';
import { TestGroup } from '@/test-group/entities/test-group.entity';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepo: Repository<Question>,

    @InjectRepository(Answer)
    private readonly answerRepo: Repository<Answer>,

    @InjectRepository(TestGroup)
    private readonly groupRepo: Repository<TestGroup>,
  ) {}

  async create(createDto: CreateQuestionDto): Promise<Question> {
    const { text, groupId, answers } = createDto;

    const group = await this.groupRepo.findOne({ where: { id: groupId } });
    if (!group) {
      throw new NotFoundException(`Group with ID ${groupId} not found`);
    }

    const correctCount = answers.filter(a => a.isCorrect).length;
    if (correctCount !== 1) {
      throw new BadRequestException('Exactly one answer must be marked as correct');
    }

    const question = this.questionRepo.create({
      text,
      group,
      answers: answers.map(a => this.answerRepo.create(a)),
    });

    return this.questionRepo.save(question);
  }

  async findAll(): Promise<Question[]> {
    return this.questionRepo.find({ relations: ['answers', 'group'] });
  }

  async findOne(id: number): Promise<Question> {
    const question = await this.questionRepo.findOne({
      where: { id },
      relations: ['answers', 'group'],
    });

    if (!question) throw new NotFoundException(`Question ${id} not found`);
    return question;
  }

  async update(id: number, updateDto: UpdateQuestionDto): Promise<Question> {
    const question = await this.findOne(id);

    const correctCount = updateDto.answers.filter(a => a.isCorrect).length;
    if (correctCount !== 1) {
      throw new BadRequestException('Exactly one answer must be marked as correct');
    }

    question.text = updateDto.text;

    // Удалить старые ответы
    await this.answerRepo.delete({ question: { id } });

    // Добавить новые ответы
    question.answers = updateDto.answers.map(a => this.answerRepo.create(a));

    return this.questionRepo.save(question);
  }

  async remove(id: number): Promise<void> {
    const question = await this.findOne(id);
    await this.questionRepo.remove(question);
  }
}
