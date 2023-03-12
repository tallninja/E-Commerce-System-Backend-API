// import { expect, describe, test, it } from '@jest/globals';
// import { AddressService } from '../address.service';
// import { User, UserService } from '../../user';

// describe('AddressService', () => {
//   const testUser = new User();
//   testUser.id = 'test';

//   let addressService: AddressService;

//   let userService: UserService = {
//     find: jest.fn().mockResolvedValue([testUser]),
//     findOne: jest.fn().mockResolvedValue(testUser),
//     create: jest.fn().mockResolvedValue(testUser),
//     update: jest.fn().mockResolvedValue(testUser),
//     delete: jest.fn().mockResolvedValue(testUser),
//   };

//   beforeEach(() => {
//     addressService = new AddressService(userService);
//   });

//   it('should be initialized', () => {
//     expect(addressService).toBeDefined();
//   });

//   test('find', () => {
//     expect(1 + 1).toBe(2);
//   });
// });
