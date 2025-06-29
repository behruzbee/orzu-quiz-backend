import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { TestSheetEntity } from '@/test-sheet/entities/test-sheet.entity';

type AnswerStat = {
  questionId: number;
  selectedAnswerId: number;
  isCorrect: boolean;
  groupName: string;
};

@Entity()
export class TestResult {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => TestSheetEntity, {
    onDelete: 'CASCADE',
  })
  sheet: TestSheetEntity;

  @Column()
  userName: string;

  @Column()
  department: string;

  @Column({ type: 'float' })
  score: number;

  @Column({ default: 0 })
  correctAnswers: number;

  @Column({ default: 0 })
  totalQuestions: number;

  @Column('json')
  answerStats: AnswerStat[];

  @CreateDateColumn()
  takenAt: Date;
}
