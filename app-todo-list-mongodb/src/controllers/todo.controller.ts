import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Todomongodb} from '../models';
import {TodomongodbRepository} from '../repositories';

export class TodoController {
  constructor(
    @repository(TodomongodbRepository)
    public todomongodbRepository : TodomongodbRepository,
  ) {}

  @post('/todomongodbs')
  @response(200, {
    description: 'Todomongodb model instance',
    content: {'application/json': {schema: getModelSchemaRef(Todomongodb)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Todomongodb, {
            title: 'NewTodomongodb',
            exclude: ['id'],
          }),
        },
      },
    })
    todomongodb: Omit<Todomongodb, 'id'>,
  ): Promise<Todomongodb> {
    return this.todomongodbRepository.create(todomongodb);
  }

  @get('/todomongodbs/count')
  @response(200, {
    description: 'Todomongodb model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Todomongodb) where?: Where<Todomongodb>,
  ): Promise<Count> {
    return this.todomongodbRepository.count(where);
  }

  @get('/todomongodbs')
  @response(200, {
    description: 'Array of Todomongodb model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Todomongodb, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Todomongodb) filter?: Filter<Todomongodb>,
  ): Promise<Todomongodb[]> {
    return this.todomongodbRepository.find(filter);
  }

  @patch('/todomongodbs')
  @response(200, {
    description: 'Todomongodb PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Todomongodb, {partial: true}),
        },
      },
    })
    todomongodb: Todomongodb,
    @param.where(Todomongodb) where?: Where<Todomongodb>,
  ): Promise<Count> {
    return this.todomongodbRepository.updateAll(todomongodb, where);
  }

  @get('/todomongodbs/{id}')
  @response(200, {
    description: 'Todomongodb model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Todomongodb, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Todomongodb, {exclude: 'where'}) filter?: FilterExcludingWhere<Todomongodb>
  ): Promise<Todomongodb> {
    return this.todomongodbRepository.findById(id, filter);
  }

  @patch('/todomongodbs/{id}')
  @response(204, {
    description: 'Todomongodb PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Todomongodb, {partial: true}),
        },
      },
    })
    todomongodb: Todomongodb,
  ): Promise<void> {
    await this.todomongodbRepository.updateById(id, todomongodb);
  }

  @put('/todomongodbs/{id}')
  @response(204, {
    description: 'Todomongodb PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() todomongodb: Todomongodb,
  ): Promise<void> {
    await this.todomongodbRepository.replaceById(id, todomongodb);
  }

  @del('/todomongodbs/{id}')
  @response(204, {
    description: 'Todomongodb DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.todomongodbRepository.deleteById(id);
  }
}
