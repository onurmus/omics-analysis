export interface SampleExpressionValues {
  sampleName: string;
  value: number;
}

export interface Experiment {
  id: number;
  name: string;
  createdAt: Date;
}

export interface Gene {
  id: number;
  experimentId: number;
  name: string;
  expressionValues: SampleExpressionValues[];
}

export interface GeneStatisticsDto {
  id: number;
  name: string;
  mean: number;
  median: number;
  variance: number;
}

export interface IOmicsVisualizationState {
  loading: boolean;
  updating: boolean;
  errors: any;
  experiments: Experiment[];
  filteredGenes: Partial<Gene>[];
  selectedExperiment?: number;
  selectedGenes: number[];
  geneData: Gene[];
  selectedGene?: Gene;
  selectedGeneStats?: GeneStatisticsDto;
}
