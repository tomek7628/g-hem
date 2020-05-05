import { Moment } from 'moment';
import { IPosition } from 'app/shared/model/position.model';
import { BodyPart } from 'app/shared/model/enumerations/body-part.model';

export interface IExercise {
  id?: number;
  bodyPart?: BodyPart;
  name?: string;
  series?: number;
  weight?: number;
  modified?: Moment;
  positions?: IPosition[];
}

export class Exercise implements IExercise {
  constructor(
    public id?: number,
    public bodyPart?: BodyPart,
    public name?: string,
    public series?: number,
    public weight?: number,
    public modified?: Moment,
    public positions?: IPosition[]
  ) {}
}
