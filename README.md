# @ccmos/nest-moment

[moment](https://momentjs.com/) module for [NestJS](https://github.com/nestjs/nest).

[moment-timezone](https://momentjs.com/timezone/) included

## Install

```bash
npm i @ccmos/nestjs-moment
```

## Usage

```typescript
// module
@Module({
  imports: [
    MomentModule.forRoot({
      tz: 'Asia/Taipei',
    }),
  ],
  providers: [TimeService],
})
export class AppModule {}

// service or provider
@Injectable()
export class TimeService {
  constructor(
    @Inject(MOMENT) moment: Moment,
    @Inject(MOMENT_TZ) mtz: MomentTz
  ) {}

  fn() {
    moment().format('YYYYMMDD'); // ...

    mtz().format('YYYYMMDD');
    // or
    mtz('2021-03-26T08:00:00.000Z').format('YYYYMMDD');
    // or
    mtz(new Date(), 'Asia/Tokyo').format('YYYYMMDD');
  }
}
```
