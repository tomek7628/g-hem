import { Moment } from 'moment';
import { IPosition } from 'app/shared/model/position.model';

export interface ISchedule {
  id?: number;
  name?: string;
  dayOfWeek?: number;
  created?: Moment;
  modified?: Moment;
  archival?: boolean;
  positions?: IPosition[];
}

export class Schedule implements ISchedule {
  constructor(
    public id?: number,
    public name?: string,
    public dayOfWeek?: number,
    public created?: Moment,
    public modified?: Moment,
    public archival?: boolean,
    public positions?: IPosition[]
  ) {
    this.archival = this.archival || false;
  }
}
