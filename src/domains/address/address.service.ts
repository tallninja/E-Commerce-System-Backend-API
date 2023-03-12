import { Address } from './address.entity';
import { UserService } from '../user/user.service';
import { BadRequestException, NotFoundException } from '../../exceptions';
import { User } from '../user';
import { AddressRepository } from './address.repository';

export class AddressService {
  public static instance: AddressService;

  private readonly repository: AddressRepository;
  private readonly userService: UserService;

  constructor() {
    this.repository = AddressRepository.getInstance();
    this.userService = new UserService();
  }

  async findAll(): Promise<Address[]> {
    return this.repository.findAll();
  }

  async findById(id: string): Promise<Address> {
    const address = await this.repository.findById(id);
    if (!address) throw new NotFoundException('Address Not Found');
    return address;
  }

  async create(userId: string, address: Partial<Address>) {
    const user: User = await this.userService.findOne({ id: userId });
    address.user = user;
    return this.repository.save(address);
  }

  async update(id: string, data: Partial<Address>) {
    const address = await this.findById(id);
    Object.assign(address, data);
    return this.repository.update(address);
  }

  async delete(id: string) {
    const address = await this.findById(id);
    return this.repository.delete(address);
  }

  public static getInstance(): AddressService {
    if (!AddressService.instance) {
      AddressService.instance = new AddressService();
    }

    return AddressService.instance;
  }
}
