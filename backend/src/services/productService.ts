import prisma from "../lib/prisma";

type ProductQuery = {
  q: string;
  brand: string;
  category: string;
  priceFrom: string;
  priceTo: string;
  stock: "ALL" | "OUT_OF_STOCK" | "STOCK";
  rating: string;
};

export const findAll = async (query: ProductQuery, userId: number | null) => {
  const { brand, category, priceFrom, priceTo, q, rating, stock } = query;

  const brands = brand ? brand.split(", ") : [];

  const products = await prisma.product.findMany({
    where: {
      title: {
        contains: q || "",
        mode: "insensitive",
      },
      brand:
        brands.length > 0
          ? {
              title: {
                in: brands,
              },
            }
          : undefined,
      category: category
        ? {
            title: category,
          }
        : undefined,
      price:
        priceFrom && priceTo
          ? {
              lte: Number(priceTo),
              gte: Number(priceFrom),
            }
          : undefined,
      rating: rating
        ? {
            gte: Number(rating),
          }
        : undefined,
      inStock: stock
        ? stock === "ALL"
          ? undefined
          : stock === "STOCK"
          ? true
          : false
        : undefined,
    },

    include: {
      brand: true,
      category: true,
      cartItem: userId
        ? {
            where: {
              cart: {
                user: {
                  id: userId,
                },
              },
            },
            select: {
              qty: true,
            },
          }
        : undefined,
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
      qtyInCart: p.cartItem?.qty || 0,

      cartItem: undefined,
      _count: undefined,
    })) || []
  );
};

export const findBrands = async () => {
  const brands = await prisma.brand.findMany();

  return brands || [];
};

export const findCategories = async () => {
  const categories = await prisma.category.findMany();

  return categories || [];
};
