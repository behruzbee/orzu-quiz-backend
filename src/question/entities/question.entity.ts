import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Answer } from '@/answer/entities/answer.entity';
import { TestGroupEntity } from '@/test-group/entities/test-group.entity';

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @ManyToOne(() => TestGroupEntity, (group) => group.questions, {
    onDelete: 'CASCADE',
  })
  group: TestGroupEntity;

  @OneToMany(() => Answer, (answer) => answer.question, {
    cascade: true,
  })
  answers: Answer[];
}
