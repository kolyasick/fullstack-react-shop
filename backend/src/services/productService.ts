import prisma from "../lib/prisma";

export const findAll = async () => {
  const products = await prisma.product.findMany({
    include: {
      brand: true,
      category: true,
      _count: {
        select: {
          reviews: true,
        },
      },
    },
  });

  return (
    products.map((p) => ({
      ...p,
      reviewsCount: p._count.reviews,
      _count: undefined,
    })) || []
  );
};

export const search = async (q: string) => {
  const products = await prisma.product.findMany({
    where: {
      OR: [
        {
          title: {
            contains: q,
            mode: "insensitive",
          },
        },
        {
          features: {
            contains: q,
            mode: "insensitive",
          },
        },
        {
          description: {
            contains: q,
            mode: "insensitive",
          },
        },
      ],
    },
  });

  return products;
};

export const findBrands = async () => {
  const brands = await prisma.brand.findMany();

  return brands || [];
};
