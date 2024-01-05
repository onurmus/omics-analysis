import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ExperimentService } from './experiment.service';

@Controller('experiment')
@ApiTags('experiment')
export class ExperimentController {
  constructor(private readonly experimentService: ExperimentService) {}

  @ApiOkResponse({
    description: 'Returns all experiments',
  })
  @Get('')
  async getGeneNames() {
    return await this.experimentService.getAll();
  }
}
