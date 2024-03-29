import { Controller, Get, Param, ParseArrayPipe, Query } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { GeneService } from './gene.service';
import { GeneOutlierService } from './gene-outlier.service';

@Controller('gene')
@ApiTags('Gene')
export class GeneController {
  constructor(
    private readonly geneService: GeneService,
    private readonly geneOutlierService: GeneOutlierService,
  ) {}

  @ApiOkResponse({
    description: 'Search genes by name in an experiment',
  })
  @Get('search/:experimentId/:search')
  async getGeneNames(
    @Param('experimentId') experimentId: number,
    @Param('search') search: string,
  ) {
    return await this.geneService.searchGeneNameForExperiment(
      experimentId,
      search,
    );
  }

  @ApiOkResponse({
    description: 'Get genes by their names for an experiment',
  })
  @Get('by-name/:experimentId')
  async searchGenes(
    @Param('experimentId') experimentId: number,
    @Query('names', new ParseArrayPipe({ items: String, separator: ',' }))
    geneNames: string[],
  ) {
    return await this.geneService.getGenesByName(experimentId, geneNames);
  }

  @ApiOkResponse({
    description: 'Get genes by their ids for an experiment',
  })
  @Get('by-id')
  async searchGenesById(
    @Query('ids', new ParseArrayPipe({ items: Number, separator: ',' }))
    geneIds: number[],
  ) {
    return await this.geneService.getGenesById(geneIds);
  }

  @ApiOkResponse({
    description: 'Calculates statistics for Gene',
  })
  @Get('/stats/:geneId')
  async getGeneStatistics(@Param('geneId') geneId: number) {
    return await this.geneService.getGeneStatistics(geneId);
  }

  @ApiOkResponse({
    description: 'Get outliers for experiment for given Z-score threshold',
  })
  @Get('/outliers/:experimentId/:zthreshold')
  async getOutliers(
    @Param('experimentId') experimentId: number,
    @Param('zthreshold') zThreshold: number,
  ) {
    return await this.geneOutlierService.findOutliersUsingStatistics(
      experimentId,
      zThreshold,
    );
  }
}
