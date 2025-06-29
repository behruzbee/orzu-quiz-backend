import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Question } from '@/question/entities/question.entity';
import { TestSheetEntity } from '@/test-sheet/entities/test-sheet.entity';

@Entity()
export class TestGroupEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => TestSheetEntity, (sheet) => sheet.groups, {
    onDelete: 'CASCADE',
  })
  sheet: TestSheetEntity;

  @OneToMany(() => Question, (question) => question.group, {
    cascade: true,
  })
  questions: Question[];
}
