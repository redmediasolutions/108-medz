import Products from "@/src/components/Products";

export default function ProductsGrid({
  products,
  loading,
}: {
  products: any[];
  loading: boolean;
}) {
  return (
    <div>
      <Products products={products} loading={loading} />
    </div>
  );
}