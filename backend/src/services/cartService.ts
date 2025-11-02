import prisma from "../lib/prisma";

export const findCart = async (userId: string) => {
  const cart = await prisma.cart.findFirst({
    where: {
      userId: Number(userId),
    },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });

  if (!cart) {
    return createCart(userId);
  }

  return cart || null;
};

export const createCart = async (userId: string) => {
  console.log(userId);
  try {
    const isCartExist = await prisma.cart.findUnique({
      where: {
        userId: Number(userId),
      },
    });
    if (isCartExist) {
      return null;
    }
    const cart = await prisma.cart.create({
      data: {
        amount: 0,
        userId: Number(userId),
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
