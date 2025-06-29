import { Module } from '@nestjs/common';
import { TestSheetController } from './test-sheet-controller';
import { TestSheetService } from './test-sheet-service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestSheetEntity } from './entities/test-sheet.entity';

@Module({
        imports: [TypeOrmModule.forFeature([TestSheetEntity])],
        controllers: [TestSheetController],
        providers: [TestSheetService],
})
export class TestSheetModule {}
