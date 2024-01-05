import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Experiment from './experiment.entity';
import { IdNotFoundException } from 'src/common/exceptions/id-not-found.exception';

@Injectable()
export class ExperimentService {
  private readonly logger = new Logger(ExperimentService.name);

  constructor(
    @InjectRepository(Experiment)
    private readonly experimentRepository: Repository<Experiment>,
  ) {}

  async getById(id: number, relations: string[] = []) {
    const experiment = await this.experimentRepository.findOne({
      where: { id },
      relations,
    });
    if (experiment) return experiment;

    throw new IdNotFoundException(Experiment.name);
  }

  async getAll() {
    const experiment = await this.experimentRepository.find({
      order: { createdAt: 'DESC' },
    });
    if (experiment.length) return experiment;

    throw new HttpException('No Experiments Found', HttpStatus.NOT_FOUND);
  }

  async createExperiment(experimentName: string) {
    const now = new Date();
    const newExperiment = {
      name: experimentName,
      createdAt: now,
    } as Experiment;

    const createdExperiment =
      await this.experimentRepository.create(newExperiment);
    return await this.experimentRepository.save(createdExperiment);
  }
}
