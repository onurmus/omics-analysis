import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, In, Repository } from 'typeorm';
import Gene from './gene.entity';
import { IdNotFoundException } from 'src/common/exceptions/id-not-found.exception';
import { CreateGeneDataDto } from './dto/create-gene.dto';
import {
  calcMean,
  calcMedian,
  calcVariance,
} from 'src/common/utils/math-utils';
import { GeneStatisticsDto } from './dto/gene-statistics.dto';

@Injectable()
export class GeneService {
  private readonly logger = new Logger(GeneService.name);

  constructor(
    @InjectRepository(Gene)
    private readonly geneRepository: Repository<Gene>,
  ) {}

  async getById(id: number, relations: string[] = []) {
    const gene = await this.geneRepository.findOne({
      where: { id },
      relations,
    });
    if (gene) return gene;

    throw new IdNotFoundException(Gene.name);
  }

  async searchGeneNameForExperiment(experimentId, search) {
    return await this.geneRepository.find({
      select: ['id', 'name'],
      where: { experimentId, name: ILike(`%${search}%`) },
      take: 10,
    });
  }

  async getGenesForExperiment(experimentId) {
    return await this.geneRepository.find({
      where: { experimentId },
    });
  }

  async getGenesByName(experimentId, nameList: string[]): Promise<Gene[]> {
    return await this.geneRepository.find({
      where: { experimentId, name: In(nameList) },
    });
  }

  async getGenesById(idList: number[]): Promise<Gene[]> {
    return await this.geneRepository.find({
      where: { id: In(idList) },
    });
  }

  async getGeneStatistics(id: number): Promise<GeneStatisticsDto> {
    const gene = await this.getById(id);
    const expressionValues = gene.expressionValues.map((t) => t.value);
    if (!expressionValues)
      throw new HttpException(
        'Cannot find expression values for the gene',
        HttpStatus.NOT_FOUND,
      );
    const mean = calcMean(expressionValues);
    const median = calcMedian(expressionValues);
    const variance = calcVariance(expressionValues, mean);
    return {
      id: gene.id,
      name: gene.name,
      mean: +mean.toFixed(2),
      median: +median.toFixed(2),
      variance: +variance.toFixed(2),
    };
  }

  async createGene(experimentId: number, experimentData: CreateGeneDataDto[]) {
    const now = new Date();
    const toBeCreated = experimentData.map((geneData) => {
      return {
        ...geneData,
        experimentId,
      } as Gene;
    });

    const createdGenes = await this.geneRepository.create(toBeCreated);
    return await this.geneRepository.save(createdGenes);
  }
}
