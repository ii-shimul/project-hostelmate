import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useParams } from "react-router-dom";
import CheckoutForm from "./CheckoutForm";
const badges = [
  { badge: "Silver", price: 10000 },
  { badge: "Gold", price: 20000 },
  { badge: "Platinum", price: 30000 },
];

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);

const priceFinder = (badge) => {
  const foundBadge = badges.find((bad) => bad.badge === badge);
  const price = foundBadge.price;
  return price;
};

const Checkout = () => {
  const { badge } = useParams();
  const price = priceFinder(badge);
  return (
    <div className="font-[sans-serif] bg-white dark:bg-inherit px-4 py-7">
      <div className="md:max-w-5xl max-w-xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 max-md:order-1">
            <h2 className="text-3xl font-extrabold text-gray-800 dark:text-gray-300">
              Payment for {badge} Membership
            </h2>
            <p className="text-gray-800 dark:text-gray-300 text-sm mt-4">
              Complete your transaction swiftly and securely with our
              easy-to-use payment process.
            </p>
            <p className="">We use Stripe for payment.</p>
            <Elements stripe={stripePromise}>
              <CheckoutForm price={price} badge={badge}></CheckoutForm>
            </Elements>
          </div>
          <div className="bg-gray-100 dark:bg-gray-600 p-6 rounded-md">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-300">৳ {price}.00</h2>
            <ul className="text-gray-800 dark:text-gray-300 mt-8 space-y-3">
              <li className="flex flex-wrap gap-4 text-sm">
                Platinum Membership
                <span className="ml-auto font-bold">৳ {price}.00</span>
              </li>
              <li className="flex flex-wrap gap-4 text-sm">
                Tax <span className="ml-auto font-bold">৳ 00.00</span>
              </li>
              <li className="flex flex-wrap gap-4 text-sm font-bold border-t-2 pt-4">
                Total <span className="ml-auto">৳ {price}.00</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
