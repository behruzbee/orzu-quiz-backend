import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TestGroup } from '@/test-group/entities/test-group.entity';

@Entity()
export class TestSheet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string; 

  @Column({ type: 'float', default: 0 })
  score: number;

  @OneToMany(() => TestGroup, (group) => group.sheet, {
    cascade: true,
  })
  groups: TestGroup[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
