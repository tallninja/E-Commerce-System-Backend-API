import { couponGenerator } from '../coupon-generator.util';

describe('tesing coupon generator', () => {
  test('coupon generation', () => {
    const coupon = couponGenerator(8);
    expect(1).toEqual(1);
    console.log(coupon);
  });
});
