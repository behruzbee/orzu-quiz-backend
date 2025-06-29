import { Module } from '@nestjs/common';
import { TestResultController } from './test-result.controller';
import { TestResultService } from './test-result.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestResult } from './entities/test-result.entity';
import { TestSheetEntity } from '@/test-sheet/entities/test-sheet.entity';

@Module({
        imports: [TypeOrmModule.forFeature([TestResult, TestSheetEntity, ])],
        controllers: [TestResultController],
        providers: [TestResultService]
})
export class TestResultModule {}
