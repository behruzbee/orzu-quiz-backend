import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { Answer } from '@/answer/entities/answer.entity';
import { TestGroupEntity } from '@/test-group/entities/test-group.entity';
import { QuestionController } from './question.controller';
import { QuestionService } from './question.service';

@Module({
  imports: [TypeOrmModule.forFeature([Question, Answer, TestGroupEntity])],
  controllers: [QuestionController],
  providers: [QuestionService]
})
export class QuestionModule {}
