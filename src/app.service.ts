import {
  BadGatewayException,
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

export type Coffee = {
  nome: string; // obrigatório
  tipo: string; // obrigatório
  quantidade?: number;
  preco?: number;
  id: string; // obrigatório
  descricao?: string;
  tags?: string[];
};

@Injectable()
export class AppService {
  private coffees: Coffee[] = [
    {
      nome: 'Paraíso',
      tipo: 'Forte',
      quantidade: 2,
      preco: 25.6,
      id: '22',
      descricao: 'Café encorpado com notas intensas de cacau e aroma marcante.',
      tags: ['intenso', 'cacau', 'tradicional'],
    },
    {
      nome: 'Encanto',
      tipo: 'Suave',
      quantidade: 2,
      preco: 22.0,
      id: '30',
      descricao:
        'Bebida delicada com notas florais e toque de frutas vermelhas.',
      tags: ['floral', 'frutas vermelhas', 'suave'],
    },
  ];

  getHello(): string {
    return 'Hello World!';
  }

  getCoffees(): Coffee[] {
    return this.coffees;
  }

  createCoffee(coffee: Coffee): {
    message: string;
    codigo: string;
    cafe: Coffee;
  } {
    const existCoffee = this.coffees.find((c) => c.id === coffee.id);
    if (existCoffee) {
      throw new BadRequestException('Café já cadastrado');
    }

    this.coffees.push(coffee);

    return {
      message: 'Café criado com sucesso',
      codigo: '201',
      cafe: coffee,
    };
  }

  getCoffeesDetalhes(id: string): Coffee | undefined {
    const coffee = this.coffees.find((coffee) => coffee.id === id);
    if (!coffee) {
      throw new NotFoundException('Não existe este cafe');
    }
    return coffee;
  }
}
