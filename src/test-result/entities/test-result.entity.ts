import { TestSheet } from '@/test-sheet/entities/test-sheet.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class TestResult {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => TestSheet, {
    onDelete: 'CASCADE',
  })
  sheet: TestSheet;

  @Column()
  userName: string;

  @Column({ type: 'float' })
  score: number;

  @Column({ default: 0 })
  correctAnswers: number;

  @Column({ default: 0 })
  totalQuestions: number;

  @CreateDateColumn()
  takenAt: Date;
}
