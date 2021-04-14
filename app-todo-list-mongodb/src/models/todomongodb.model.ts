import {Entity, model, property} from '@loopback/repository';

@model()
export class Todomongodb extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

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
    type: 'string',
  })
  isComplete?: string;

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
