import Button from "./elements/Button";


const ProductDetailCard = ({ product, onAddProduct }) => {
    return (
        <div className="p-4 m-4 rounded-lg bg-slate-50 w-full max-w-sm mx-auto">
            <div className="flex flex-col items-center text-center space-y-2">
                <h2 className="text-2xl md:text-3xl">{product.name}</h2>
                <p className="text-lg md:text-2xl text-gray-500">{product.description}</p>
                <div className="text-xl md:text-3xl text-black">{product.price}</div>
            </div>
            <div className="w-full flex items-center justify-center mt-3">
                <img src={product.imageUrl} className="w-32 h-32 md:w-40 md:h-40 rounded-xl object-cover" alt={product.name} />
            </div>
            <div className="w-full flex items-center justify-center mt-3">
                <Button onClick={() => onAddProduct(product)}>Add to Cart</Button>
            </div>
        </div>
    )
}

export default ProductDetailCard;