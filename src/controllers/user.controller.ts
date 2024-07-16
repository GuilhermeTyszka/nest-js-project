import { Param, Body, Controller, Delete, Get, Post, Put, Query, ParseIntPipe } from '@nestjs/common';
import { UserService } from 'src/services/user.service';
import { randomUUID } from 'node:crypto';
import { User } from 'src/dtos/user';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) { }

    @Get()
  @ApiOperation({
    summary: 'Coletar todos os usuários',
    description: 'Retorna todos os usuários cadastrados com base nos filtros opcionais de nome, email e idade.',
  })
  @ApiQuery({ name: 'name', type: String, required: false, description: 'Nome do usuário' })
  @ApiQuery({ name: 'email', type: String, required: false, description: 'Email do usuário' })
  @ApiQuery({ name: 'age', type: Number, required: false, description: 'Idade do usuário' })
  async getUsers(
    @Query('name') name?: string,
    @Query('email') email?: string,
    @Query('age') age?: number,
  ): Promise<User[]> {
    // Cria o objeto de filtro
    const filter = {
      name: name || undefined,
      email: email || undefined,
      age: Number(age) || undefined,
    };

    // Chama o serviço para obter os usuários com base no filtro
    return this.userService.users({ where: filter });
  }

    @Post()
    @ApiOperation({
        summary: 'Cria um usuário',
        description: 'Cadastra um novo usuário.'
    })
    async postUser(@Body() body: User): Promise<User> {
        const { name, email, age } = body;

        return this.userService.createUser({
            id: randomUUID(),
            name,
            email,
            age
        });
    }

    @Put('/:id')
    @ApiOperation({
        summary: 'Atualiza um usuário',
        description: 'Atualiza um usuário pelo seu id.'
    })
    async putUser(@Param('id') id: string, @Body() body: User): Promise<User> {
        const { name, email, age } = body;

        return this.userService.updateUser({
            where: {
                id
            },
            data: {
                name,
                email,
                age
            }
        });
    }

    @Delete('/:id')
    @ApiOperation({
        summary: 'Remove um usuário',
        description: 'Remove um usuário pelo seu id.'
    })
    async deleteUser(@Param('id') id: string): Promise<User> {
        return this.userService.deleteUser({
            id
        });
    }
}


