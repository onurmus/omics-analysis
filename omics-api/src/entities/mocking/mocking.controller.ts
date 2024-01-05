import { Body, Controller, Post } from '@nestjs/common';
import { MockingService } from './mocking.service';
import { CreateMockDataDto } from './dto/create-mock-data.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@Controller('mocking')
@ApiTags('Mocking')
export class MockingController {
  constructor(private readonly mockingService: MockingService) {}

  //@UseGuards(AuthGuard('jwt')) // TODO: implement M2M implemantation with FE.
  @ApiOkResponse({
    description: 'Created Mock Data',
  })
  @Post('')
  async create(@Body() createMockData: CreateMockDataDto) {
    return await this.mockingService.createMockData(createMockData);
  }
}
