import { Controller, Get, Param, Body, Post } from '@nestjs/common';
import { AppService, Coffee } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/create-coffee')
  createCoffee(@Body() coffee: Coffee) {
    return this.appService.createCoffee(coffee);
  }

  @Get('/coffees')
  getCoffees(): Coffee[] {
    return this.appService.getCoffees();
  }

  @Get('/coffees/:id/detalhes')
  getAlunoDetalhes(@Param('id') id: string): Coffee | undefined {
    return this.appService.getCoffeesDetalhes(id);
  }
}
