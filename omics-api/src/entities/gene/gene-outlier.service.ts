import { Injectable, Logger } from '@nestjs/common';
import Gene from './gene.entity';
import { calcMean, calcVariance } from 'src/common/utils/math-utils';
import { GeneService } from './gene.service';

@Injectable()
export class GeneOutlierService {
  private readonly logger = new Logger(GeneOutlierService.name);

  constructor(private readonly geneService: GeneService) {}

  private findOutliers(genes: Gene[], threshold: number = 3): Gene[] {
    return genes
      .map((gene) => {
        const mean = calcMean(gene.expressionValues.map((t) => t.value));
        const stdDeviation = Math.sqrt(
          calcVariance(
            gene.expressionValues.map((t) => t.value),
            mean,
          ),
        );

        const outliers = gene.expressionValues.filter((expressionVal) => {
          const zScore = (expressionVal.value - mean) / stdDeviation;
          return Math.abs(zScore) > threshold;
        });

        if (!outliers.length) return;
        return { ...gene, outliers };
      })
      .filter((t) => !!t);
  }

  async findOutliersUsingStatistics(experimentId: number, zThreshold: number) {
    const genes = await this.geneService.getGenesForExperiment(experimentId);

    const genesWithOutliers = this.findOutliers(genes, zThreshold);
    return genesWithOutliers;
  }
}
