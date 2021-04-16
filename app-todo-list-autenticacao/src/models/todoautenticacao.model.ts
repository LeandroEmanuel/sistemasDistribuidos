import {Entity, model, property} from '@loopback/repository';

@model()
export class Todoautenticacao extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: false,
    default: 1,
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


  constructor(data?: Partial<Todoautenticacao>) {
    super(data);
  }
}

export interface TodoautenticacaoRelations {
  // describe navigational properties here
}

export type TodoautenticacaoWithRelations = Todoautenticacao & TodoautenticacaoRelations;
