import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Experiment from '../experiment/experiment.entity';
import { SampleExpressionValues } from './interfaces/sample-expressions';

@Entity({ name: 'gene' })
class Gene {
  public constructor(obj?: Partial<Gene>) {
    Object.assign(this, obj);
  }

  @PrimaryGeneratedColumn()
  public id?: number;

  @ManyToOne(() => Experiment, (experiment) => experiment.genes)
  @JoinColumn({ name: 'experiment_id' })
  experiment?: Experiment;

  @Column({ name: 'experiment_id', type: 'integer', nullable: false })
  experimentId: number;

  @Column({ name: 'name', type: 'text', nullable: false })
  public name: string;

  @Column({ name: 'transcript', type: 'text', nullable: false })
  public transcript: string;

  @Column({
    name: 'expression_values',
    type: 'jsonb',
    nullable: false,
    default: {},
  })
  public expressionValues: SampleExpressionValues[];
}

export default Gene;
