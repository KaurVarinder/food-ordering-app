import Button from "./elements/Button"
import { Link } from "react-router-dom";
import pizzaBanner from "../assets/images/pizza_banner.jpg";


const Banner = () => {
  return (
    <div className="banner w-full md:w-2/3 px-7 mx-auto relative flex items-center justify-between">
      <div className="banner-description w-full md:w-1/2 p-3">
        <h2 className="mb-6 text-4xl font-bold text-white">
          Food Ordering Made Easy
        </h2>
        <p className="font-semibold text-lg text-red-600 py-2">
          Get started Today!
        </p>
        <div className="btn-container">
          <Button>Order Now</Button>
          <Link to="/menu" className="text-yellow-400 hover:text-yellow-500 font-bold underline px-3">
            See menu
          </Link>
        </div>
      </div>
      <div className="banner-image w-full md:w-1/2 p-3 flex justify-end">
        <img src={pizzaBanner} alt="banner" className="max-h-95 " />
      </div>
    </div>
  )
}

export default Banner
