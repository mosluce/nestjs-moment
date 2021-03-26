import { Test, TestingModule } from '@nestjs/testing';
import { MomentModule } from '../src';
import { MOMENT, MOMENT_TZ } from '../src/moment/constants';
import { Moment, MomentTz } from '../src/moment/interfaces';

describe('Moment Service', () => {
  let moment: Moment;
  let mtz: MomentTz;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MomentModule.forRoot({
          isGlobal: true,
          tz: 'Asia/Tokyo',
        }),
      ],
    }).compile();

    moment = await module.resolve<Moment>(MOMENT);
    mtz = await module.resolve<MomentTz>(MOMENT_TZ);
  });

  it('service without timezone', () => {
    expect(moment).toBeDefined();

    const date = new Date(`2021-03-26T00:00:00.000Z`);

    expect(moment(date).get('year')).toEqual(2021);
    expect(moment(date).format('YYYYMMDDHHmm')).toEqual('202103260800');
  });

  it('service with timezone', () => {
    expect(mtz).toBeDefined();

    const date = new Date(`2021-03-26T00:00:00.000Z`);

    expect(mtz(date).get('year')).toEqual(2021);
    expect(mtz(date).format('YYYYMMDDHHmm')).toEqual('202103260900');
  });
});
