import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GeneService } from './gene.service';
import Gene from './gene.entity';
import { GeneController } from './gene.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Gene])],
  controllers: [GeneController],
  exports: [GeneService],
  providers: [GeneService],
})
export class GeneModule {}
