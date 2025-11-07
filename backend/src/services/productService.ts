import prisma from "../lib/prisma";

type ProductQuery = {
  searchQuery: string;
  brand: string;
  category: string;
  priceFrom: string;
  priceTo: string;
  stock: "ALL" | "OUT_OF_STOCK" | "STOCK";
  rating: string;
  page: string;
};

const PAGE_SIZE = 6;

const getOffset = (pageLimit?: string) => {
  const limit = Number(pageLimit) || 0;

  if (limit > 1) {
    return PAGE_SIZE * (limit - 1);
  }

  return 0;
};

export const findAll = async (query: ProductQuery, userId: number | null) => {
  const {
    brand,
    category,
    priceFrom,
    priceTo,
    searchQuery,
    rating,
    stock,
    page,
  } = query;

  const brands = brand ? brand.split(",") : [];

  const products = await prisma.product.findMany({
    where: {
      title: {
        contains: searchQuery || "",
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
    take: PAGE_SIZE,
    skip: getOffset(page),
  });

  const totalCount = await prisma.product.count({
    where: {
      title: {
        contains: searchQuery || "",
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
  });

  const transformedProducts = products.map((p) => ({
    ...p,
    reviewsCount: p._count.reviews,
    qtyInCart: (p.cartItem && p.cartItem[0]?.qty) || 0,
    cartItem: undefined,
    _count: undefined,
  }));

  return {
    products: transformedProducts,
    totalCount,
    pageSize: PAGE_SIZE,
    currentPage: Number(page) || 1,
    totalPages: Math.ceil(totalCount / PAGE_SIZE),
    hasMore: getOffset(page) + PAGE_SIZE < totalCount,
  };
};

export const findById = async (id: string, userId: number | null) => {
  try {
    const product = await prisma.product.findFirst({
      where: {
        uuid: id,
      },
      include: {
        brand: true,
        category: true,
        reviews: {
          select: {
            author: {
              select: {
                username: true,
                email: true,
                uuid: true,
              },
            },
          },
        },
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
      },
    });

    return {
      ...product,
      qtyInCart: (product?.cartItem && product?.cartItem[0]?.qty) || 0,
    };
  } catch (error) {
    return null;
  }
};

export const findBrands = async () => {
  const brands = await prisma.brand.findMany();

  return brands || [];
};

export const findCategories = async () => {
  const categories = await prisma.category.findMany();

  return categories || [];
};
