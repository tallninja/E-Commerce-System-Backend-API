import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WishlistsService } from './wishlists.service';
import { WishlistsController } from './wishlists.controller';
import { Wishlist } from './entities/wishlist.entity';
import { ProductsModule } from '../products/products.module';
import { UserWishlistController } from './user-wishlist.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Wishlist]),
    forwardRef(() => ProductsModule),
  ],
  controllers: [UserWishlistController, WishlistsController],
  providers: [WishlistsService],
})
export class WishlistsModule {}
