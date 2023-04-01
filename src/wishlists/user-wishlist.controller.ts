import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Query,
} from '@nestjs/common';
import { WishlistsService } from './wishlists.service';
import { Product } from '../products/entities/product.entity';
import { CurrentUser, RequireAuth } from '../common';
import { User } from '../users/entities/user.entity';
import { Wishlist } from './entities/wishlist.entity';

@Controller('my-wishlist')
@RequireAuth()
export class UserWishlistController {
  constructor(private readonly wishlistsService: WishlistsService) {}

  @Get()
  async getProducts(@CurrentUser() currentUser: User): Promise<Product[]> {
    const wishlist: Wishlist = await this.wishlistsService.findOneBy(
      { user: currentUser },
      { products: true },
    );
    return wishlist.products;
  }

  @Patch(':id')
  async addToWishlist(
    @Param('id', ParseUUIDPipe) id: string,
    @Query('product') productId: string,
    @CurrentUser() currentUser: User,
  ) {
    return this.wishlistsService.addProductToWishlist(
      id,
      productId,
      currentUser,
    );
  }

  @Patch(':id/remove')
  async removeFromWishlist(
    @Param('id', ParseUUIDPipe) id: string,
    @Query('product') productId: string,
    @CurrentUser() currentUser: User,
  ) {
    return this.wishlistsService.removeProductFromWishlist(
      id,
      productId,
      currentUser,
    );
  }
}
