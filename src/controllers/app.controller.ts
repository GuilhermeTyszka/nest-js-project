import { Controller, Get } from '@nestjs/common';
import { AppService } from '../services/app.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('status')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ 
    summary: 'Status da aplicação', 
    description: 'Retorna o status da aplicação' 
  })
  getStatus(): string {
    return this.appService.getStatus();
  }
}
