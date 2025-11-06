import prisma from "../lib/prisma";

export const createCart = async (userId: string) => {
  try {
    const isCartExist = await prisma.cart.findFirst({
      where: {
        user: {
          uuid: userId,
        },
      },
    });
    if (isCartExist) {
      return null;
    }
    const cart = await prisma.cart.create({
      data: {
        amount: 0,
        user: {
          connect: {
            uuid: userId,
          },
        },
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    return cart;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const findCart = async (userId: string, initial?: string) => {
  const cart = await prisma.cart.findFirst({
    where: {
      user: {
        uuid: userId,
      },
    },
    include: {
      items:
        initial && Number(initial) === 0
          ? {
              include: {
                product: true,
              },
            }
          : undefined,
    },
  });

  if (!cart) {
    return createCart(userId);
  }

  const aggregation = await prisma.cartItem.aggregate({
    where: {
      cartId: cart.id,
    },
    _sum: {
      qty: true,
    },
    _count: {
      id: true,
    },
  });

  return {
    ...cart,
    length: aggregation._sum.qty || 0,
  };
};

export const add = async (cartId: string, productId: number) => {
  const isItemExist = await prisma.cartItem.findUnique({
    where: {
      cartId_productId: {
        cartId: Number(cartId),
        productId: productId,
      },
    },
  });

  let cartItem = null;

  if (isItemExist) {
    cartItem = await prisma.cartItem.update({
      where: {
        id: isItemExist.id,
      },
      data: {
        qty: {
          increment: 1,
        },
      },
      include: {
        product: true,
      },
    });
  } else {
    cartItem = await prisma.cartItem.create({
      data: {
        productId: productId,
        cartId: Number(cartId),
      },
      include: {
        product: true,
      },
    });
  }

  await prisma.cart.update({
    where: {
      id: Number(cartId),
    },
    data: {
      amount: {
        increment: cartItem.product.price,
      },
    },
  });

  return cartItem;
};

export const remove = async (
  cartId: string,
  productId: string,
  completely: boolean
) => {
  const cartIdNum = Number(cartId);
  const productIdNum = Number(productId);

  const cart = await prisma.cart.findUnique({
    where: { id: cartIdNum },
    include: {
      items: {
        include: {
          product: {
            select: {
              price: true,
            },
          },
        },
      },
    },
  });

  if (!cart) return null;

  const itemToRemove = cart.items.find(
    (item) => item.productId === productIdNum
  );

  if (!itemToRemove) return null;

  let updatedCart;
  let deletedItem = null;
  if (itemToRemove.qty <= 1 || completely) {
    deletedItem = await prisma.cartItem.delete({
      where: {
        cartId_productId: {
          cartId: cartIdNum,
          productId: productIdNum,
        },
      },
      include: {
        product: true,
      },
    });
    deletedItem.qty = 0;
    console.log(deletedItem);
  } else {
    deletedItem = await prisma.cartItem.update({
      where: {
        cartId_productId: {
          cartId: cartIdNum,
          productId: productIdNum,
        },
      },
      data: {
        qty: {
          decrement: 1,
        },
      },
      include: {
        product: true,
      },
    });
  }

  const updatedCartWithItems = await prisma.cart.findUnique({
    where: { id: cartIdNum },
    include: {
      items: {
        include: {
          product: {
            select: {
              price: true,
            },
          },
        },
      },
    },
  });

  if (updatedCartWithItems) {
    const totalAmount = updatedCartWithItems.items.reduce((sum, item) => {
      return sum + item.qty * Number(item.product.price);
    }, 0);

    const roundedAmount = Number(totalAmount.toFixed(2));

    updatedCart = await prisma.cart.update({
      where: { id: cartIdNum },
      data: {
        amount: roundedAmount,
      },
    });
  }

  return deletedItem;
};
