import { NextFunction, Request, Response } from 'express';
import { StatusCodes as SC } from 'http-status-codes';
import { Service } from 'typedi';
import { AddressService } from './address.service';
import { Address } from './address.entity';

@Service()
export class AddressController {
  constructor(private service: AddressService) {}

  createAddress = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const address: Address = await this.service.create(req.body);
      res.setHeader('Location', `${req.path}/${address.id}`);
      return res.status(SC.CREATED).json(address);
    } catch (error) {
      return next(error);
    }
  };

  getAddresses = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const addresses: Address[] = await this.service.find();
      return res.status(SC.OK).json(addresses);
    } catch (error) {
      return next(error);
    }
  };

  getAddress = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const address: Address = await this.service.findOne({
        id: req.params.id,
      });
      return res.status(SC.OK).json(address);
    } catch (error) {
      return next(error);
    }
  };

  updateAddress = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const address: Address = await this.service.update(
        req.params.id,
        req.body
      );
      return res.status(SC.OK).json(address);
    } catch (error) {
      return next(error);
    }
  };

  deleteAddress = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.service.delete(req.params.id);
      return res.status(SC.OK).json({ info: 'Address deleted successfully' });
    } catch (error) {
      return next(error);
    }
  };
}
