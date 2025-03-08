import Button from "./elements/Button"
import { Link } from "react-router-dom";
import pizzaBanner from "../assets/images/pizza_banner.jpg";

const Banner = () => {
  return (
    <div className="banner w-full md:w-2/3 px-7 mx-auto relative flex flex-col md:flex-row items-center justify-between">
      <div className="banner-description w-full md:w-1/2 p-3 text-center md:text-left">
        <h2 className="mb-6 text-3xl md:text-4xl font-bold text-white">
          Food Ordering Made Easy
        </h2>
        <p className="font-semibold text-lg text-red-600 py-2">
          Get started Today!
        </p>
        <div className="btn-container flex flex-col sm:flex-row items-center gap-3">
          <Button>Order Now</Button>
          <Link to="/menu" className="text-yellow-400 hover:text-yellow-500 font-bold underline px-3">
            See menu
          </Link>
        </div>
      </div>
      <div className="banner-image w-full md:w-1/2 p-3 flex justify-center md:justify-end">
        <img src={pizzaBanner} alt="banner" className="max-h-60 sm:max-h-72 md:max-h-95 object-cover" />
      </div>
    </div>
  )
}

export default Banner;
