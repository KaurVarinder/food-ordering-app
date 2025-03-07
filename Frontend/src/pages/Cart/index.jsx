import { Tabs } from "../../components/Tabs";
import Button from "../../components/elements/Button";
import { useSelector } from "react-redux";
import { cartProducts } from "../../stores/Cart/cartSlice";
import useTabSwitch from "../../hooks/useTabSwitch";
import { AddressForm } from "../../components/AddressForm";
import { ProductSummary } from "../../components/ProductSummary";
import  PaymentForm  from "../../components/PaymentForm"

const Cart = () => {
  const cart = useSelector(cartProducts);
  const tabs = ['Summary', 'Delivery', 'Payment'];
  const [currentTab, handleTabSwitch] = useTabSwitch(tabs, 'Summary');

  if (!cart || cart.length === 0) {

    return (
      <div className="bg-white h-full text-black flex justify-center p-4">
        <h1>Your cart is empty</h1>
      </div>
    )
  }
  return (
    <div className="bg-white h-screen text-black mx-auto mt-2 border-gray-200 p-4 md:w-2/3 rounded-lg shadow-md sm:p-6 lg:p-8 overflow-y-auto max-h-screen">
      <Tabs list={tabs} onTabSwitch={handleTabSwitch} activeTab={currentTab} />
      <div className={`tabs ${currentTab !== 'Summary' ? 'hidden' : ''}`}>
        <ProductSummary />
        <div className="flex justify-end p-2">
          <Button variant="dark" className="flex item-center" onClick={()=>handleTabSwitch('Delivery')}><span className="mr-1">Next</span></Button>
        </div>
      </div>
      <div className={`tabs ${currentTab !== 'Delivery' ? 'hidden' : ''}`}>
        <AddressForm onTabSwitch={handleTabSwitch} />
      </div>
      <div className={`tabs ${currentTab !== 'Payment' ? 'hidden' : ''}`}>
        <PaymentForm />
      </div>
    </div>
  )
}

export default Cart;
