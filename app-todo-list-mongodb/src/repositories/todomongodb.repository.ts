import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Todomongodb, TodomongodbRelations} from '../models';

export class TodomongodbRepository extends DefaultCrudRepository<
  Todomongodb,
  typeof Todomongodb.prototype.id,
  TodomongodbRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Todomongodb, dataSource);
  }
}
