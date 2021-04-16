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
import {Todoautenticacao} from '../models';
import {TodoautenticacaoRepository} from '../repositories';

// ---------- ADD IMPORTS -------------
import {authenticate} from '@loopback/authentication';
// ------------------------------------

@authenticate('jwt') // <---- Apply the @authenticate decorator at the class level
export class TodoController {
  constructor(
    @repository(TodoautenticacaoRepository)
    public todoautenticacaoRepository : TodoautenticacaoRepository,
  ) {}

  @post('/todoautenticacaos')
  @response(200, {
    description: 'Todoautenticacao model instance',
    content: {'application/json': {schema: getModelSchemaRef(Todoautenticacao)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Todoautenticacao, {
            title: 'NewTodoautenticacao',
            exclude: ['id'],
          }),
        },
      },
    })
    todoautenticacao: Todoautenticacao,
  ): Promise<Todoautenticacao> {
	  
	  let todoId = await this.todoautenticacaoRepository.findOne({order:['id DESC']});
		
		//se o ultimo registo da bd não for null
		if(todoId != null){
			//console.log(todoId.id);
			
			var aux = parseInt( '' + todoId.id, 10);
			aux = aux + 1;
			//console.log(aux1 + ' a ' + typeof aux1 + ' '+ aux +' aux ' + typeof aux + ' ' + todoId.id + ' todoId.id ' + typeof todoId.id + ' ');
			todoautenticacao.id = aux;
		}
	  
    return this.todoautenticacaoRepository.create(todoautenticacao);
  }
//para  nao precisar autenticacao para executar a funcao count
  @authenticate.skip()
  @get('/todoautenticacaos/count')
  @response(200, {
    description: 'Todoautenticacao model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Todoautenticacao) where?: Where<Todoautenticacao>,
  ): Promise<Count> {
    return this.todoautenticacaoRepository.count(where);
  }

  @get('/todoautenticacaos')
  @response(200, {
    description: 'Array of Todoautenticacao model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Todoautenticacao, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Todoautenticacao) filter?: Filter<Todoautenticacao>,
  ): Promise<Todoautenticacao[]> {
    return this.todoautenticacaoRepository.find(filter);
  }

  @patch('/todoautenticacaos')
  @response(200, {
    description: 'Todoautenticacao PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Todoautenticacao, {partial: true}),
        },
      },
    })
    todoautenticacao: Todoautenticacao,
    @param.where(Todoautenticacao) where?: Where<Todoautenticacao>,
  ): Promise<Count> {
    return this.todoautenticacaoRepository.updateAll(todoautenticacao, where);
  }

  @get('/todoautenticacaos/{id}')
  @response(200, {
    description: 'Todoautenticacao model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Todoautenticacao, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Todoautenticacao, {exclude: 'where'}) filter?: FilterExcludingWhere<Todoautenticacao>
  ): Promise<Todoautenticacao> {
    return this.todoautenticacaoRepository.findById(id, filter);
  }

  @patch('/todoautenticacaos/{id}')
  @response(204, {
    description: 'Todoautenticacao PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Todoautenticacao, {partial: true}),
        },
      },
    })
    todoautenticacao: Todoautenticacao,
  ): Promise<void> {
    await this.todoautenticacaoRepository.updateById(id, todoautenticacao);
  }

  @put('/todoautenticacaos/{id}')
  @response(204, {
    description: 'Todoautenticacao PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() todoautenticacao: Todoautenticacao,
  ): Promise<void> {
    await this.todoautenticacaoRepository.replaceById(id, todoautenticacao);
  }

  @del('/todoautenticacaos/{id}')
  @response(204, {
    description: 'Todoautenticacao DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.todoautenticacaoRepository.deleteById(id);
  }
}
