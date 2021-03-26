import moment from 'moment';

export type Moment = (date?: any) => moment.Moment;
export type MomentTz = (date?: any, tz?: string) => moment.Moment;
