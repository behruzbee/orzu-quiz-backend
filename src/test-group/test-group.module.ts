import { Module } from '@nestjs/common';
import { TestGroupController } from './test-group.controller';
import { TestGroupService } from './test-group.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestGroupEntity } from './entities/test-group.entity';
import { TestSheetEntity } from '@/test-sheet/entities/test-sheet.entity';

@Module({
        imports: [TypeOrmModule.forFeature([TestGroupEntity, TestSheetEntity])],
        controllers: [TestGroupController],
        providers: [TestGroupService]
})
export class TestGroupModule {}
