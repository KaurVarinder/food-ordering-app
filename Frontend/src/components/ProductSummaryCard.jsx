import { useDispatch } from "react-redux"
import { incrementProductAmount, decrementProductAmount } from "../stores/Cart/cartSlice";

export const ProductSummayCard = ({ product }) => {
    const dispatch = useDispatch();

    return (
        <div className="flex p-1 sm:p-2 border-b border-b-gray-200">
            <div className="product-image mr-2 border border-gray-200 rounded-lg w-fullsm:w-1/3">
                <img src={product.imageUrl} alt={product.name} />
            </div>
            <div className="product-info">
                <h3>{product.name}</h3>
                <p className="text-gray-600">{product.description}</p>
            </div>
            <div className="product-price-qt flex flex-col items-center justify-center">
                <div className="price">{`Rs.${product.price}`}</div>
                <div className="quantity flex">
                    <button className="p-1" disabled={product.amount <=0} onClick={() => dispatch(decrementProductAmount( {id: product.id, name: product.name} ))}>-</button>
                    <span className="p-1">{product.amount}</span>
                    <button className="p-1" onClick={() => dispatch(incrementProductAmount( {id: product.id, name: product.name} ))}>+</button>
                </div>
            </div>
        </div>
    )
}