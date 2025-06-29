import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { Answer } from '@/answer/entities/answer.entity';
import { TestGroup } from '@/test-group/entities/test-group.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Question, Answer, TestGroup])],
})
export class QuestionModule {}
