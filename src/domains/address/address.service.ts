import { Service } from 'typedi';
import { Address } from './address.entity';
import { UserService } from '../user/user.service';
import { BadRequestException, NotFoundException } from '../../exceptions';
import { User } from '../user';

interface FindOptionsFilters {
  id: string;
  city: string;
  postalCode: string;
  country: string;
  createdAt: Date;
  updatedAt: Date;
}

interface FindOptionsRelations {
  user: boolean;
}

@Service()
export class AddressService {
  constructor(private userService: UserService) {}

  async find(
    filters?: Partial<FindOptionsFilters>,
    relations?: FindOptionsRelations
  ) {
    try {
      const addresses: Address[] = await Address.find({
        where: filters,
        relations,
      });
      return addresses;
    } catch (error) {
      throw error;
    }
  }

  async findOne(
    filters?: Partial<FindOptionsFilters>,
    relations?: FindOptionsRelations
  ) {
    try {
      const address: Address | null = await Address.findOne({
        where: filters,
        relations,
      });
      if (!address) throw new NotFoundException('Address not found');
      return address;
    } catch (error) {
      throw error;
    }
  }

  async create(address: Partial<Address>) {
    try {
      const _address: Address = Address.create(address as Address);

      // check if user exists
      const user: User = await this.userService.findOne({
        id: _address.user.id,
      });
      if (!user) throw new BadRequestException('User Not Found');

      _address.user = user;
      return await _address.save();
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, address: Partial<Address>) {
    try {
      const _address: Address = await this.findOne({ id: address.id });
      Object.assign(_address, address);
      return await _address.save();
    } catch (error) {
      throw error;
    }
  }

  async delete(id: string) {
    try {
      const _address: Address = await this.findOne({ id });
      return await _address.remove();
    } catch (error) {
      throw error;
    }
  }
}
