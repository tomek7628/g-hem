export interface IPosition {
  id?: number;
  position?: number;
  scheduleId?: number;
  exerciseId?: number;
}

export class Position implements IPosition {
  constructor(public id?: number, public position?: number, public scheduleId?: number, public exerciseId?: number) {}
}
