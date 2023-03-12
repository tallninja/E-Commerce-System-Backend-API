import { NextFunction, Request, Response } from 'express';
import { StatusCodes as SC } from 'http-status-codes';
import { AddressService } from './address.service';
import { Address } from './address.entity';

export class AddressController {
  private service: AddressService = AddressService.getInstance();

  constructor() {}

  async getAddresses(req: Request, res: Response, next: NextFunction) {
    try {
      const addresses: Address[] = await this.service.findAll();
      return res.status(SC.OK).json(addresses);
    } catch (error) {
      return next(error);
    }
  }

  async getAddress(req: Request, res: Response, next: NextFunction) {
    try {
      const address: Address = await this.service.findById(req.params.id);
      return res.status(SC.OK).json(address);
    } catch (error) {
      return next(error);
    }
  }

  async createAddress(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.query;
      const address: Address = await this.service.create(
        userId as string,
        req.body
      );
      res.setHeader('Location', `${req.path}/${address.id}`);
      return res.status(SC.CREATED).json(address);
    } catch (error) {
      return next(error);
    }
  }

  async updateAddress(req: Request, res: Response, next: NextFunction) {
    try {
      const address: Address = await this.service.update(
        req.params.id,
        req.body
      );
      return res.status(SC.OK).json(address);
    } catch (error) {
      return next(error);
    }
  }

  async deleteAddress(req: Request, res: Response, next: NextFunction) {
    try {
      const address = await this.service.delete(req.params.id);
      return res.status(SC.OK).json(address);
    } catch (error) {
      return next(error);
    }
  }
}
