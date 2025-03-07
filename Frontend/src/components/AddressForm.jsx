import { useForm } from "react-hook-form";
import Button from "./elements/Button";
import { useDispatch } from "react-redux";
import { setAddress } from "../stores/userInfo/addressSlice";

export const AddressForm = ({ onTabSwitch }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const dispatch = useDispatch();

    const onSubmit = (data) => {
        dispatch(setAddress(data));
        onTabSwitch('Payment')
    }

    return (
        <form className="md:w-2/3 md:mx-auto px-3 pt-1" onSubmit={handleSubmit(onSubmit)}>
            <h3 className="pt-4 text-2xl md:text-center">Address for the delivery</h3>
            <div className="md-4">
                <label className="block mb-2 text-sm font-bold text-gray-700" for="streetAddress">Street Address</label>
                <input
                    {...register('address', { required: "Street address is required" })}
                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="street address"
                    type="text"
                    placeholder="Street Address"
                />
                {errors.address && <p className="text-red-400 text-xs">{errors.address.message}</p>}
            </div>
            <div className="mb-4 md:flex md:justify-between">
                <div className="mb-4 md:mr-2 md:mb-0 flex-1">
                    <label className="block mb-2 text-sm font-bold text-gray-700" for="city">City</label>
                    <input
                        {...register('city', { required: "City is required" })}
                        className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="city"
                        type="text"
                        placeholder="City"
                    />
                    {errors.city && <p className="text-red-400 text-xs">{errors.city.message}</p>}
                </div>
                <div className="mb-4 md:mr-2 md:mb-0 flex-1">
                    <label className="block mb-2 text-sm font-bold text-gray-700" for="state">State</label>
                    <input
                        {...register('state', { required: "State is required" })}
                        className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="state"
                        type="text"
                        placeholder="State"
                    />
                    {errors.state && <p className="text-red-400 text-xs">{errors.state.message}</p>}
                </div>
            </div>
            <div className="mb-4 md:flex md:justify-between">
                <div className="mb-4 md:mr-2 md:mb-0 flex-1">
                    <label className="block mb-2 text-sm font-bold text-gray-700" for="country">Country</label>
                    <input
                        {...register('country', { required: "Country is required" })}
                        className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="country"
                        type="text"
                        placeholder="Country"
                    />
                    {errors.country && <p className="text-red-400 text-xs">{errors.country.message}</p>}
                </div>
                <div className="mb-4 md:mr-2 md:mb-0 flex-1">
                    <label className="block mb-2 text-sm font-bold text-gray-700" for="postalCode">Postal Code</label>
                    <input
                        {...register('postalCode', { required: "Postal code is required" })}
                        className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="postal code"
                        type="text"
                        placeholder="Postal Code"
                    />
                    {errors.postalCode && <p className="text-red-400 text-xs">{errors.postalCode.message}</p>}
                </div>
            </div>
            <div className="flex justify-end p-2">
                <Button variant="dark" className="flex item-center" type="Submit"><span className="mr-1">Next</span></Button>
            </div>
        </form>
    )
}