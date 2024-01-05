import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MockingModule } from './entities/mocking/mocking.module';
import { ExperimentModule } from './entities/experiment/experiment.module';
import { DatabaseModule } from './common/database/database.module';
import { GeneModule } from './entities/gene/gene.module';

@Module({
  imports: [DatabaseModule, GeneModule, ExperimentModule, MockingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
