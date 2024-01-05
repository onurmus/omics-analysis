import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExperimentService } from './experiment.service';
import Experiment from './experiment.entity';
import { ExperimentController } from './experiment.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Experiment])],
  controllers: [ExperimentController],
  exports: [ExperimentService],
  providers: [ExperimentService],
})
export class ExperimentModule {}
