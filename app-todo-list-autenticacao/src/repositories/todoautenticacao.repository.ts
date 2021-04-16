import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Todoautenticacao, TodoautenticacaoRelations} from '../models';

export class TodoautenticacaoRepository extends DefaultCrudRepository<
  Todoautenticacao,
  typeof Todoautenticacao.prototype.id,
  TodoautenticacaoRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Todoautenticacao, dataSource);
  }
}
