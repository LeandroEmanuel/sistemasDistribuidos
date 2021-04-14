import {Entity, model, property} from '@loopback/repository';

@model()
export class Todomongodb extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  title: string;

  @property({
    type: 'string',
  })
  desc?: string;

  @property({
    type: 'boolean',
  })
  isComplete?: boolean;

  @property({
    type: 'string',
  })
  remindAtAddress?: string;

  @property({
    type: 'string',
  })
  remindAtGeo?: string;

  @property({
    type: 'any',
  })
  tag?: any;


  constructor(data?: Partial<Todomongodb>) {
    super(data);
  }
}

export interface TodomongodbRelations {
  // describe navigational properties here
}

export type TodomongodbWithRelations = Todomongodb & TodomongodbRelations;
