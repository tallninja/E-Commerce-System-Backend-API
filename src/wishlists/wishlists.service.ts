import {
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { Wishlist } from './entities/wishlist.entity';
import { User } from '../users/entities/user.entity';
import { ProductsService } from '../products/products.service';
import { Product } from '../products/entities/product.entity';

interface FindOptionsWhere {
  id?: string;
  user?: {
    id: string;
  };
  createdAt?: Date;
}

interface FindOptionsRelations {
  user?: boolean;
  products?: boolean;
}

@Injectable()
export class WishlistsService {
  constructor(
    @InjectRepository(Wishlist)
    private readonly wishlistsRepository: Repository<Wishlist>,
    private readonly productsService: ProductsService,
  ) {}

  async create(
    createWishlistDto: CreateWishlistDto,
    currentUser?: User,
  ): Promise<Wishlist> {
    const wishlist: Wishlist =
      this.wishlistsRepository.create(createWishlistDto);
    wishlist.user = currentUser;
    return this.wishlistsRepository.save(wishlist);
  }

  async findAll(): Promise<Wishlist[]> {
    return this.wishlistsRepository.find();
  }

  async findOne(
    id: string,
    relations?: FindOptionsRelations,
  ): Promise<Wishlist> {
    const wishlist: Wishlist = await this.wishlistsRepository.findOne({
      where: { id },
      relations,
    });
    if (!wishlist) throw new NotFoundException('Wishlist Not Found');
    return wishlist;
  }

  async update(
    id: string,
    updateWishlistDto: UpdateWishlistDto,
  ): Promise<Wishlist> {
    const wishlist: Wishlist = await this.findOne(id);
    Object.assign(wishlist, updateWishlistDto);
    return this.wishlistsRepository.save(wishlist);
  }

  async remove(id: string): Promise<Wishlist> {
    const wishlist: Wishlist = await this.findOne(id);
    return this.wishlistsRepository.remove(wishlist);
  }

  async findOneBy(
    where: FindOptionsWhere,
    relations?: FindOptionsRelations,
  ): Promise<Wishlist | null> {
    return this.wishlistsRepository.findOne({ where, relations });
  }

  async findBy(
    where: FindOptionsWhere,
    relations?: FindOptionsRelations,
  ): Promise<Wishlist[]> {
    return this.wishlistsRepository.find({ where, relations });
  }

  async addProductToWishlist(
    wishlistId: string,
    productId: string,
    currentUser: User,
  ): Promise<Wishlist> {
    const product: Product = await this.productsService.findOne(productId);
    const wishlist: Wishlist | null = await this.findOneBy(
      { id: wishlistId, user: { id: currentUser.id } },
      { products: true },
    );
    if (!wishlist) throw new NotFoundException('Wishlist Not Found');
    wishlist.products.push(product);
    return this.wishlistsRepository.save(wishlist);
  }

  async removeProductFromWishlist(
    wishlistId: string,
    productId: string,
    currentUser: User,
  ): Promise<Wishlist> {
    const product: Product = await this.productsService.findOne(productId);
    const wishlist: Wishlist | null = await this.findOneBy(
      { id: wishlistId, user: { id: currentUser.id } },
      { products: true },
    );
    if (!wishlist) throw new NotFoundException('Wishlist Not Found');
    wishlist.products = wishlist.products.filter(
      (wishlistProduct) => wishlistProduct.id !== product.id,
    );
    return this.wishlistsRepository.save(wishlist);
  }
}
