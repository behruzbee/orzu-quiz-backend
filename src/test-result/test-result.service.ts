import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TestResult } from './entities/test-result.entity';
import { TestSheetEntity } from '@/test-sheet/entities/test-sheet.entity';
import { CreateTestResultDto } from './dto/create-test-result.dto';

// Полный ответ (для сохранения результата)
type FullAnswerStat = {
  questionId: number;
  questionText: string;
  selectedAnswerId: number;
  selectedAnswerText: string;
  correctAnswerText: string;
  isCorrect: boolean;
  groupName: string;
};

// Упрощённый ответ (только для статистики)
type GroupStatInput = {
  groupName: string;
  isCorrect: boolean;
};

@Injectable()
export class TestResultService {
  constructor(
    @InjectRepository(TestResult)
    private readonly resultRepo: Repository<TestResult>,

    @InjectRepository(TestSheetEntity)
    private readonly sheetRepo: Repository<TestSheetEntity>,
  ) {}

  async create(dto: CreateTestResultDto): Promise<TestResult> {
    const sheet = await this.getSheetWithQuestions(dto.sheetId);

    const { score, answerStats } = this.evaluateAnswers(dto.answers, sheet);

    const result = this.resultRepo.create({
      userName: dto.userName,
      department: dto.department,
      sheet,
      score,
      correctAnswers: score,
      totalQuestions: dto.answers.length,
      answerStats,
    });

    return this.resultRepo.save(result);
  }

  async findAll(): Promise<TestResult[]> {
    return this.resultRepo.find({
      relations: ['sheet'],
      order: { takenAt: 'DESC' },
    });
  }

  async findBySheet(sheetId: number): Promise<TestResult[]> {
    return this.resultRepo.find({
      where: { sheet: { id: sheetId } },
      relations: ['sheet'],
      order: { takenAt: 'DESC' },
    });
  }

  async getUserGroupStats(resultId: number) {
    const result = await this.resultRepo.findOne({ where: { id: resultId } });
    if (!result) throw new NotFoundException('Результат не найден');

    const minimalStats: GroupStatInput[] = result.answerStats.map((stat) => ({
      groupName: stat.groupName,
      isCorrect: stat.isCorrect,
    }));

    return this.groupStatsFromAnswers(minimalStats);
  }

  async getGlobalGroupStats() {
    const results = await this.resultRepo.find();

    const allMinimalStats: GroupStatInput[] = results.flatMap((r) =>
      r.answerStats.map((stat) => ({
        groupName: stat.groupName,
        isCorrect: stat.isCorrect,
      })),
    );

    return this.groupStatsFromAnswers(allMinimalStats);
  }

  // ========== PRIVATE HELPERS ==========

  private async getSheetWithQuestions(sheetId: number) {
    const sheet = await this.sheetRepo.findOne({
      where: { id: sheetId },
      relations: [
        'groups',
        'groups.questions',
        'groups.questions.answers',
        'groups.questions.group',
      ],
    });

    if (!sheet) {
      throw new NotFoundException(`Тест с ID ${sheetId} не найден`);
    }

    return sheet;
  }

  private evaluateAnswers(
    answers: { questionId: number; selectedAnswerId: number }[],
    sheet: TestSheetEntity,
  ): { score: number; answerStats: FullAnswerStat[] } {
    const allQuestions = sheet.groups.flatMap((group) => group.questions);

    let score = 0;
    const stats: FullAnswerStat[] = [];

    for (const { questionId, selectedAnswerId } of answers) {
      const question = allQuestions.find((q) => q.id === questionId);
      if (!question) continue;

      const selected = question.answers.find((a) => a.id === selectedAnswerId);
      const correct = question.answers.find((a) => a.isCorrect);

      const isCorrect = selected?.id === correct?.id;
      if (isCorrect) score++;

      stats.push({
        questionId: question.id,
        questionText: question.text,
        selectedAnswerId: selected?.id ?? -1,
        selectedAnswerText: selected?.text ?? 'Не выбран',
        correctAnswerText: correct?.text ?? 'Нет правильного ответа',
        isCorrect,
        groupName: question.group?.name ?? 'Без группы',
      });
    }

    return { score, answerStats: stats };
  }

  private groupStatsFromAnswers(
    answers: GroupStatInput[],
  ): { group: string; total: number; correct: number; average: number }[] {
    const grouped: Record<string, { total: number; correct: number }> = {};

    for (const { groupName, isCorrect } of answers) {
      grouped[groupName] ||= { total: 0, correct: 0 };
      grouped[groupName].total += 1;
      if (isCorrect) grouped[groupName].correct += 1;
    }

    return Object.entries(grouped).map(([group, { total, correct }]) => ({
      group,
      total,
      correct,
      average: +(correct / total).toFixed(2),
    }));
  }
}
