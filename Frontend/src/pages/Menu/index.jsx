// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchProducts, selectAllProducts } from "../../stores/menu/productSlice";
// import ProductDetailCard from "../../components/ProductDetailCard";
// import { Tabs } from "../../components/Tabs";
// import { addToCart } from "../../stores/Cart/cartSlice";

// const Menu = () => {
//     const dispatch = useDispatch();
//     const products = useSelector(selectAllProducts);

//     const [activeTab, setActiveTab] = useState('');
//     const [activeTabIndex, setActiveTabIndex] = useState(0);

//     useEffect(() => {
//         console.log("Fetching products...");
//         dispatch(fetchProducts())
//           .unwrap()
//           .then((data) => console.log("Fetched products:", data))
//           .catch((error) => console.log("Error fetching products:", error));
//     }, [dispatch]);
    

//     const onAddProduct = (product) => {
//         dispatch(addToCart(product));
//     };

//     const onTabSwitch = (newActiveTab) => {
//         setActiveTab(newActiveTab);
//         let categories = products.products?.map((product) => product.name?.name);
//         let index = categories.findIndex(category => newActiveTab === category);
//         setActiveTabIndex(index > -1 ? index : 0);
//     };

//     return (
//         <div className="bg-white">
//             {products.status !== "fulfilled" ? (
//                 <div>Loading....</div>
//             ) : (
//                 <div className="menu-wrapper">
//                     {products.products && (
//                         <Tabs
//                             list={products.products.map((product) => product.name.name)}
//                             activeTab={activeTab}
//                             onTabSwitch={onTabSwitch}
//                         />
//                     )}
//                     <div className="flex flex-row mx-3">
//                         {products.products &&
//                             products.products.length > 0 &&
//                             products.products[activeTabIndex].products &&
//                             products.products[activeTabIndex].products.map((product, index) => (
//                                 <ProductDetailCard key={index} product={product} onAddProduct={onAddProduct} />
//                             ))}
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Menu;

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, selectAllProducts } from "../../stores/menu/productSlice";
import ProductDetailCard from "../../components/ProductDetailCard";
import { Tabs } from "../../components/Tabs";
import { addToCart } from "../../stores/Cart/cartSlice";

const Menu = () => {
    const dispatch = useDispatch();
    const products = useSelector(selectAllProducts);

    const [activeTab, setActiveTab] = useState('');
    const [activeTabIndex, setActiveTabIndex] = useState(0);

    // ✅ Fetch products on mount
    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    console.log("Products state:", products); // ✅ Debugging log

    const onAddProduct = (product) => {
        dispatch(addToCart(product));
    };

    const onTabSwitch = (newActiveTab) => {
        setActiveTab(newActiveTab);
        
        // ✅ Fix category name access
        let categories = products.products.map((category) => category.name || "Unnamed");
        
        let index = categories.findIndex(category => newActiveTab === category);
        setActiveTabIndex(index > -1 ? index : 0);
    };
    

    return (
        <div className="bg-white">
            {products.status === "pending" && <div>Loading....</div>}
            {products.status === "failed" && <div>Error: {products.error}</div>}
            {products.status === "fulfilled" && (
                <div className="menu-wrapper">
                    {products.products.length > 0 && (
                        <Tabs
                            list={products.products.map((product) => product.name?.name || "Unnamed")}
                            activeTab={activeTab}
                            onTabSwitch={onTabSwitch}
                        />
                    )}
                    <div className="flex flex-row mx-3">
                        {products.products.length > 0 &&
                            products.products[activeTabIndex]?.products?.map((product, index) => (
                                <ProductDetailCard key={index} product={product} onAddProduct={onAddProduct} />
                            ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Menu;
