export type Product = {
  id: string;
  name: string;
  slug: string;
  price: string;
  categoryId?: number;

  images?: { src: string }[];

  meta_data?: {
    key: string;
    value: string;
  }[];
};