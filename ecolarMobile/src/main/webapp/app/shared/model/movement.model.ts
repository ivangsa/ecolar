import { Moment } from 'moment';
import { IMovementLine } from 'app/shared/model//movement-line.model';

export interface IMovement {
  id?: string;
  eventTime?: Moment;
  registrationTime?: Moment;
  amount?: number;
  location?: string;
  eventLines?: IMovementLine[];
}

export const defaultValue: Readonly<IMovement> = {};
