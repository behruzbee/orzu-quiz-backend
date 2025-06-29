import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { TestGroupEntity } from '@/test-group/entities/test-group.entity';

@Entity()
export class TestSheetEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;


  @Column({ unique: true })
  accessCode: string; // Код ссылки, например UUID или slug

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => TestGroupEntity, (group) => group.sheet)
  groups: TestGroupEntity[];
}
