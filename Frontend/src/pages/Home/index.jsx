import Banner from "../../components/Banner";
import About from "../../components/About";
import { ProductPreview } from "../../components/ProductsPreview";

const Home = () => {
    return (
        <>
            <Banner />
            <ProductPreview/>
            <About />
        </>
    )
}

export default Home;
