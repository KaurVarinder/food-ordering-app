import { useSelector } from "react-redux"
import { cartProducts } from "../stores/Cart/cartSlice"
import { ProductSummayCard } from "./ProductSummaryCard";

export const ProductSummary = () => {
    const cart  = useSelector(cartProducts);

    return (
        <div className="flex flex-col">
            { cart && cart?.map((product, index) => {
                return (
                    <ProductSummayCard product={product} key={index}/>
                )
            })}
        </div>
    )
}