import { Service } from 'typedi';
import { CartItem } from './cart-item.entity';

@Service()
export class CartItemRepository {
  findAll: () => Promise<CartItem[]> = async () => {
    return await CartItem.find();
  };

  findById = async (id: string) => {
    return await CartItem.findOne({ where: { id } });
  };
}
