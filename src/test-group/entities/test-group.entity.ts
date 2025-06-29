import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Question } from '@/question/entities/question.entity';
import { TestSheet } from '@/test-sheet/entities/test-sheet.entity';

@Entity()
export class TestGroup {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string; // Например: "1С Саралаш", "2С Сарамжлаш"

  @ManyToOne(() => TestSheet, (sheet) => sheet.groups, {
    onDelete: 'CASCADE',
  })
  sheet: TestSheet;

  @OneToMany(() => Question, (question) => question.group, {
    cascade: true,
  })
  questions: Question[];
}
