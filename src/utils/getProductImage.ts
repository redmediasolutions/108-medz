export function getProductImage(product: any) {
  const img = product?.images?.[0]?.src;

  if (typeof img === "string" && img.trim() !== "") {
    return img;
  }

  return "/placeholder-product.png";
}