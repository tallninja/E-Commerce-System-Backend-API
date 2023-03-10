import { Router } from 'express';
import { userRoutes } from '@domains/user';
import { productRoutes } from '@domains/product';
import { categoryRoutes } from '@domains/category';
import { inventoryRoutes } from '@domains/inventory';
import { discountRoutes } from '@domains/discount';
import { orderItemsRoutes } from '@domains/order_items';
import { orderRoutes } from '@domains/order';
import { addressRoutes } from '@domains/address';
import { shoppingSessionRoutes } from '@domains/shopping-session';
import { paymentRoutes } from '@domains/payment';
import { cartRoutes } from '@domains/carts';
import { cartItemRoutes } from '@domains/cart-items/cart-item.routes';

const router = Router();

router.use('/users', userRoutes);
router.use('/products', productRoutes);
router.use('/categories', categoryRoutes);
router.use('/inventories', inventoryRoutes);
router.use('/discounts', discountRoutes);
router.use('/order-items', orderItemsRoutes);
router.use('/orders', orderRoutes);
router.use('/addresses', addressRoutes);
router.use('/shopping-session', shoppingSessionRoutes);
router.use('/payments', paymentRoutes);
router.use('/carts', cartRoutes);
router.use('/cart-items', cartItemRoutes);

export default router;
