import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExperimentService } from '../experiment.service';
import Experiment from '../experiment.entity';

describe('ExperimentService', () => {
  let service: ExperimentService;
  let mockRepository: Partial<Record<keyof Repository<Experiment>, jest.Mock>>;

  beforeEach(async () => {
    mockRepository = {
      findOne: jest.fn(),
      find: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExperimentService,
        {
          provide: getRepositoryToken(Experiment),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<ExperimentService>(ExperimentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getById', () => {
    it('should return an experiment if it exists', async () => {
      const experiment = new Experiment();
      mockRepository.findOne.mockResolvedValue(experiment);

      expect(await service.getById(1)).toEqual(experiment);
    });

    it('should throw an exception if no experiment is found', async () => {
      mockRepository.findOne.mockResolvedValue(undefined);

      await expect(service.getById(1)).rejects.toThrow();
    });
  });

  describe('getAll', () => {
    it('should return an array of experiments', async () => {
      const experiments = [new Experiment(), new Experiment()];
      mockRepository.find.mockResolvedValue(experiments);

      expect(await service.getAll()).toEqual(experiments);
    });

    it('should throw an exception if no experiments are found', async () => {
      mockRepository.find.mockResolvedValue([]);

      await expect(service.getAll()).rejects.toThrow();
    });
  });

  describe('createExperiment', () => {
    it('should create and return a new experiment', async () => {
      const experimentName = 'Test Experiment';
      const newExperiment = new Experiment();
      newExperiment.name = experimentName;

      mockRepository.create.mockReturnValue(newExperiment);
      mockRepository.save.mockResolvedValue(newExperiment);

      expect(await service.createExperiment(experimentName)).toEqual(
        newExperiment,
      );
    });
  });
});
