import * as fs from 'fs';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateMockDataDto } from './dto/create-mock-data.dto';
import { unparse } from 'papaparse';
import { ExperimentService } from '../experiment/experiment.service';
import { CreateGeneDataDto } from '../gene/dto/create-gene.dto';
import { GeneService } from '../gene/gene.service';

@Injectable()
export class MockingService {
  private readonly logger = new Logger(MockingService.name);

  constructor(
    private readonly experimentService: ExperimentService,
    private readonly geneService: GeneService,
  ) {}

  async createMockData(createMockDataDto: CreateMockDataDto) {
    const geneData = this.getGeneData(createMockDataDto);
    await this.saveGeneDataToDb(createMockDataDto, geneData);
    this.saveGeneDataToFile(createMockDataDto, geneData);
  }

  private getGeneData(
    createMockDataDto: CreateMockDataDto,
  ): CreateGeneDataDto[] {
    try {
      const geneCount = createMockDataDto.numberOfGenes;
      const uniqueGeneNames = this.generateUniqueGeneNames(geneCount);
      const transcriptIds = this.generateTranscriptIds(geneCount);
      const expressionValues = this.generateExpressionValues(createMockDataDto);

      const geneData = uniqueGeneNames.map((gene, index) => {
        const rowData = {
          name: gene,
          transcript: transcriptIds[index],
          expressionValues: [],
        } as CreateGeneDataDto;

        expressionValues[index].map((expressionValue, expIndex) => {
          rowData.expressionValues.push({
            sampleName: `sample${expIndex + 1}`,
            value: expressionValue,
          });
        });
        return rowData;
      });
      return geneData;
    } catch (e) {
      this.logger.error('An error occurred when creating mock data', e);
      throw new HttpException(
        'An error occurred when creating mock data',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private async saveGeneDataToDb(
    createMockDataDto: CreateMockDataDto,
    geneData: CreateGeneDataDto[],
  ) {
    try {
      const experiment = await this.experimentService.createExperiment(
        createMockDataDto.experimentName,
      );
      await this.geneService.createGene(experiment.id, geneData);
    } catch (e) {
      this.logger.error('An error occurred when saving mock data to DB', e);
      throw new HttpException(
        'An error occurred when saving mock data to DB',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private saveGeneDataToFile(
    createMockDataDto: CreateMockDataDto,
    geneData: CreateGeneDataDto[],
  ) {
    try {
      const csvData = geneData.map((gene) => {
        const rowData = {
          name: gene.name,
          transcript: gene.transcript,
        };
        gene.expressionValues.map((expressionValue) => {
          return (rowData[expressionValue.sampleName] = expressionValue.value);
        });
        return rowData;
      });
      const csv = unparse(csvData);
      //creata dummyData folder
      if (!fs.existsSync('dummyData')) {
        fs.mkdirSync('dummyData');
      }

      // Write to a file
      fs.writeFileSync(
        `dummyData/${createMockDataDto.experimentName.replace(
          /\s/g,
          '',
        )}_${+new Date()}.csv`,
        csv,
      );
    } catch (e) {
      this.logger.error('An error occurred when saving mock data to file', e);
      throw new HttpException(
        'An error occurred when saving mock data to file',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private generateUniqueGeneNames(count: number): string[] {
    const geneNames = new Set<string>();
    while (geneNames.size < count) {
      const geneName = `Gene${
        Math.floor(Math.random() * (51000 - 1000 + 1)) + 1000
      }`;
      geneNames.add(geneName);
    }
    return Array.from(geneNames);
  }

  private generateTranscriptIds(count: number): string[] {
    return Array.from({ length: count }, () => {
      const transcriptId = `uc${
        Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000
      }.${Math.floor(Math.random() * 3) + 1}`;
      if (Math.random() < 0.3) {
        const additionalTranscriptId = `uc${
          Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000
        }.${Math.floor(Math.random() * 3) + 1}`;
        return transcriptId + ';' + additionalTranscriptId;
      }
      return transcriptId;
    });
  }

  private generateExpressionValues(
    createMockDataDto: CreateMockDataDto,
  ): number[][] {
    return Array.from({ length: createMockDataDto.numberOfGenes }, () =>
      Array.from({ length: createMockDataDto.numberOfSamples }, () => {
        return Math.random() < createMockDataDto.wideRangeExpressionRatio
          ? parseFloat((Math.random() * (190 - 1) + 1).toFixed(2))
          : parseFloat((Math.random() * (150 - 120) + 120).toFixed(2));
      }),
    );
  }
}
