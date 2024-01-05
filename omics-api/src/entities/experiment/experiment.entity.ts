import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Gene from '../gene/gene.entity';

@Entity({ name: 'experiment' })
class Experiment {
  public constructor(obj?: Partial<Experiment>) {
    Object.assign(this, obj);
  }

  @PrimaryGeneratedColumn()
  public id?: number;

  @Column({ name: 'name', type: 'text', nullable: false })
  public name: string;

  @Column({ name: 'created_at', type: 'timestamp', nullable: false })
  public createdAt: Date;

  @OneToMany(() => Gene, (gene) => gene.experiment)
  genes?: Gene[];
}

export default Experiment;
