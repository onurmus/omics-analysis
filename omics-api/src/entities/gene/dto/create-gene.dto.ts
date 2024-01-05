import { SampleExpressionValues } from '../interfaces/sample-expressions';

export class CreateGeneDataDto {
  name: string;
  transcript: string;
  expressionValues: SampleExpressionValues[] = [];
}
