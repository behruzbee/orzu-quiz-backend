import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SentryModule } from '@sentry/nestjs/setup';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from '@/config/typeorm.config';
import { AnswerModule } from './answer/answer.module';
import { QuestionModule } from './question/question.module';
import { TestGroupModule } from './test-group/test-group.module';
import { TestSheetModule } from './test-sheet/test-sheet.module';
import { TestResultModule } from './test-result/test-result.module';
import configuration from '@/config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: typeOrmConfig,
    }),
    SentryModule.forRoot(),
    AnswerModule,
    QuestionModule,
    TestGroupModule,
    TestSheetModule,
    TestResultModule,
  ],
})
export class AppModule {}
