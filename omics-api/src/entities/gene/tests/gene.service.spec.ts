import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GeneService } from '../gene.service';
import Gene from '../gene.entity';

describe('GeneService', () => {
  let service: GeneService;
  let mockRepository: Partial<Record<keyof Repository<Gene>, jest.Mock>>;

  beforeEach(async () => {
    mockRepository = {
      findOne: jest.fn(),
      find: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GeneService,
        {
          provide: getRepositoryToken(Gene),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<GeneService>(GeneService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getById', () => {
    it('should return a gene if it exists', async () => {
      const gene = new Gene();
      mockRepository.findOne.mockResolvedValue(gene);

      expect(await service.getById(1)).toEqual(gene);
    });

    it('should throw an exception if no gene is found', async () => {
      mockRepository.findOne.mockResolvedValue(undefined);

      await expect(service.getById(1)).rejects.toThrow();
    });
  });

  describe('getGeneStatistics', () => {
    it('should calculate and return gene statistics', async () => {
      const gene = {
        name: 'genexx',
        expressionValues: [
          { sampleName: 's1', value: 12 },
          { sampleName: 's2', value: 13 },
          { sampleName: 's3', value: 14 },
        ],
      } as Gene;

      mockRepository.findOne.mockResolvedValue(gene);

      const result = await service.getGeneStatistics(1);
      expect(result).toEqual({
        id: gene.id,
        name: gene.name,
        mean: 13,
        median: 13,
        variance: 1,
      });
    });
  });

  describe('createGene', () => {
    it('should create and save genes', async () => {
      const experimentId = 1;
      const geneData = [
        { name: 'Gene1', transcript: 'ts1', expressionValues: [] },
        { name: 'Gene2', transcript: 'ts2', expressionValues: [] },
      ];

      const createdGenes = geneData.map((data) => ({
        ...data,
        experimentId,
      })) as Gene[];

      mockRepository.create.mockReturnValue(createdGenes);
      mockRepository.save.mockResolvedValue(createdGenes);

      const result = await service.createGene(experimentId, geneData);

      expect(mockRepository.create).toHaveBeenCalledWith(createdGenes);
      expect(mockRepository.save).toHaveBeenCalledWith(createdGenes);

      expect(result).toEqual(createdGenes);
    });
  });
});
