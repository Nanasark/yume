import { useReadContract } from "@/app/thirdweb";
import { contract } from "@/app/contract";
import ProductCard from "../cards/ProductCard";
import Link from "next/link";

export default function AllProductGrid() {
  const { data: product, isLoading: isProductLoading } = useReadContract({
    contract,
    method: "getAllProducts",
  });

  if (product) {
    console.log(product);
  }

  return (
    <div className="relative  h-full pl-14 pr-16 pt-10 w-screen ">
      <div className=" grid grid-cols-4 gap-10 ">
        {product &&
          product.map((product) => (
            <Link href={`/Buy/${product.id}`}>
              <ProductCard
                key={product.id}
                cover={product.cover}
                isMaticPayment={product.isMaticPayment}
                price={product.price}
                name={product.name}
                tag={product.tag}
                id={product.id}
                stock={product.stock}
                seller={product.seller}
              />
            </Link>
          ))}
      </div>
    </div>
  );
}
