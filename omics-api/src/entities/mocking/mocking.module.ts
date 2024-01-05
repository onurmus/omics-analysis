import { Module } from '@nestjs/common';
import { MockingService } from './mocking.service';
import { MockingController } from './mocking.controller';
import { ExperimentModule } from '../experiment/experiment.module';
import { GeneModule } from '../gene/gene.module';

@Module({
  imports: [GeneModule, ExperimentModule],
  controllers: [MockingController],
  providers: [MockingService],
})
export class MockingModule {}
