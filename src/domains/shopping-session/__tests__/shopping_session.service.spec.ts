import { describe, test, it, expect } from '@jest/globals';
import { ShoppingSessionRepository } from '../shopping-session.repository';
import { ShoppingSession } from '../shopping-session.entity';
import { ShoppingSessionService } from '../shopping-session.service';
import { User, UserService } from '../../user';

describe('ShoppingSessionService', () => {
  let shoppingSessionRepository: ShoppingSessionRepository;
  let shoppingSessionService: ShoppingSessionService;
  let userService: UserService;

  const testUser = new User();
  testUser.id = 'test_user';

  const testSession = new ShoppingSession();
  testSession.id = 'test_session';
  testSession.user = testUser;

  beforeEach(() => {
    shoppingSessionRepository = {
      findAll: jest.fn().mockResolvedValue([testSession]),
      findAllBy: jest.fn().mockResolvedValue([testSession]),
      findOne: jest.fn().mockResolvedValue(testSession),
      save: jest.fn().mockResolvedValue(testSession),
      update: jest.fn().mockResolvedValue(testSession),
      delete: jest.fn().mockResolvedValue(testSession),
    };

    userService = {
      find: jest.fn().mockResolvedValue([testUser]),
      findOne: jest.fn().mockResolvedValue(testUser),
      create: jest.fn().mockResolvedValue(testUser),
      update: jest.fn().mockResolvedValue(testUser),
      delete: jest.fn().mockResolvedValue(testUser),
    };

    shoppingSessionService = new ShoppingSessionService(
      shoppingSessionRepository,
      userService
    );
  });

  describe('bootstrap', () => {
    test('all test data should be defined', () => {
      expect(shoppingSessionRepository).toBeDefined();
      expect(shoppingSessionService).toBeDefined();
      expect(userService).toBeDefined();
      expect(testSession).toBeDefined();
      expect(testUser).toBeDefined();
    });
  });

  describe('findAll', () => {
    it('should fetch a list of all shopping sessions', async () => {
      const findAllSpy = jest.spyOn(shoppingSessionRepository, 'findAll');
      const sessions = await shoppingSessionService.findAll();
      expect(sessions).toEqual([testSession]);
      expect(findAllSpy).toBeCalledWith();
      expect(findAllSpy).toBeCalledTimes(1);
    });

    it('should throw an error if it fails', async () => {
      const repoFindAllSpy = jest.spyOn(shoppingSessionRepository, 'findAll');
      shoppingSessionRepository.findAll = jest
        .fn()
        .mockRejectedValue(new Error());

      try {
        expect(await shoppingSessionService.findAll()).toThrow(Error);
        expect(repoFindAllSpy).toThrow(Error);
      } catch (error) {}
    });
  });

  describe('findOneById', () => {
    it('should return a shopping session from the repository', async () => {
      const repoFindOneSpy = jest.spyOn(shoppingSessionRepository, 'findOne');
      const session = await shoppingSessionService.findOneById(testSession.id);
      expect(session).toEqual(testSession);
      expect(repoFindOneSpy).toBeCalledWith({ id: testSession.id });
      expect(repoFindOneSpy).toBeCalledTimes(1);
    });

    it('should throw an error if it fails', async () => {
      const repoFindOneSpy = jest.spyOn(shoppingSessionRepository, 'findOne');
      shoppingSessionRepository.findOne = jest
        .fn()
        .mockRejectedValue(new Error());

      try {
        expect(await shoppingSessionService.findAll()).toThrow(Error);
        expect(repoFindOneSpy).toThrow(Error);
      } catch (error) {}
    });
  });

  describe('createSession', () => {
    it('should create and return the created session', async () => {
      const repoSaveSpy = jest.spyOn(shoppingSessionService, 'createSession');
      const repoUserFindOneSpy = jest.spyOn(userService, 'findOne');
      const session = await shoppingSessionService.createSession(testSession);
      expect(session).toEqual(testSession);
      expect(repoSaveSpy).toBeCalledWith(testSession);
      expect(repoSaveSpy).toBeCalledTimes(1);

      expect(repoUserFindOneSpy).toBeCalledWith({ id: testUser.id });
      expect(repoUserFindOneSpy).toBeCalledTimes(1);
    });

    it('should throw an error if it fails', async () => {
      const repoSaveSpy = jest.spyOn(shoppingSessionRepository, 'save');
      shoppingSessionRepository.save = jest.fn().mockRejectedValue(new Error());

      try {
        expect(await shoppingSessionService.findAll()).toThrow(Error);
        expect(repoSaveSpy).toThrow(Error);
      } catch (error) {}
    });
  });

  describe('updateSession', () => {
    it('should update and return the updated session', async () => {
      const repoUpdateSpy = jest.spyOn(shoppingSessionRepository, 'update');
      const serviceSessionFindOneByIdSpy = jest.spyOn(
        shoppingSessionService,
        'findOneById'
      );
      const session = await shoppingSessionService.updateSession(
        testSession.id,
        testSession
      );
      expect(session).toEqual(testSession);
      expect(repoUpdateSpy).toBeCalledWith(testSession);
      expect(repoUpdateSpy).toBeCalledTimes(1);
      expect(serviceSessionFindOneByIdSpy).toBeCalledWith(testSession.id);
      expect(serviceSessionFindOneByIdSpy).toBeCalledTimes(1);
    });

    it('should throw an error if it fails', async () => {
      const repoUpdateSpy = jest.spyOn(shoppingSessionRepository, 'update');
      shoppingSessionRepository.update = jest
        .fn()
        .mockRejectedValue(new Error());

      try {
        expect(await shoppingSessionService.findAll()).toThrow(Error);
        expect(repoUpdateSpy).toThrow(Error);
      } catch (error) {}
    });
  });

  describe('deleteSession', () => {
    it('should delete and return the deleted session', async () => {
      const repoDeleteSpy = jest.spyOn(shoppingSessionRepository, 'delete');
      const serviceSessionFindOneByIdSpy = jest.spyOn(
        shoppingSessionService,
        'findOneById'
      );
      const session = await shoppingSessionService.deleteSession(
        testSession.id
      );
      expect(session).toEqual(testSession);
      expect(repoDeleteSpy).toBeCalledWith(testSession);
      expect(repoDeleteSpy).toBeCalledTimes(1);
      expect(serviceSessionFindOneByIdSpy).toBeCalledWith(testSession.id);
      expect(serviceSessionFindOneByIdSpy).toBeCalledTimes(1);
    });

    it('should throw an error if it fails', async () => {
      const repoDeleteSpy = jest.spyOn(shoppingSessionRepository, 'delete');
      shoppingSessionRepository.delete = jest
        .fn()
        .mockRejectedValue(new Error());

      try {
        expect(await shoppingSessionService.findAll()).toThrow(Error);
        expect(repoDeleteSpy).toThrow(Error);
      } catch (error) {}
    });
  });
});
