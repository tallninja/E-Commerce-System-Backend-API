import { DbDataSource, PgDataSource } from 'db';
import { Address } from './address.entity';
import { DataSource, Repository } from 'typeorm';

export interface FindOptionsWhere {
  id?: string;
  city?: string;
  country?: string;
  postalCode?: string;
  user?: {
    id: string;
  };
  createdAt: Date;
}

export interface FindOptionsRelations {
  user?: boolean;
}

export class AddressRepository {
  public static instance: AddressRepository;

  private dataSource: DataSource;

  private repository: Repository<Address>;

  constructor() {
    this.dataSource = DbDataSource.getInstance();
    this.repository = this.dataSource.getRepository(Address);
  }

  async findAll(): Promise<Address[]> {
    return this.repository.find();
  }

  async findBy(where: FindOptionsWhere): Promise<Address[]> {
    return this.repository.findBy(where);
  }

  async findById(
    id: string,
    relations?: FindOptionsRelations
  ): Promise<Address | null> {
    return this.repository.findOne({ where: { id }, relations });
  }

  async findOneBy(
    where: FindOptionsWhere,
    relations?: FindOptionsRelations
  ): Promise<Address | null> {
    return await this.repository.findOne({ where, relations });
  }

  async save(data: Partial<Address>): Promise<Address> {
    const address = this.repository.create(data);
    return this.repository.save(address);
  }

  async update(address: Address): Promise<Address> {
    return this.repository.save(address);
  }

  async delete(address: Address): Promise<Address> {
    return this.repository.remove(address);
  }

  // get an instance of address repository
  public static getInstance(): AddressRepository {
    if (!AddressRepository.instance) {
      AddressRepository.instance = new AddressRepository();
    }
    return AddressRepository.instance;
  }
}
