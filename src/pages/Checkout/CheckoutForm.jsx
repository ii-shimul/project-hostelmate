import {
  CardElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";


const CheckoutForm = ({ price }) => {
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const [transactionId, setTransactionId] = useState('');
  const stripe = useStripe();
  const { user } = useAuth();
  const elements = useElements();
  const axiosPublic = useAxios();
  const getSecret = async () => {
    try {
      const res = await axiosPublic.post("/create-payment-intent", {
        price: price,
      });
      setClientSecret(res.data.clientSecret);
    } catch (error) {
      console.error("Error fetching client secret:", error);
    }
  };

  useEffect(() => {
    getSecret();
  }, []);
  const handlePay = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (!card) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      console.log("[error]", error);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
    }

    // confirm payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName || "anonymous",
            email: user?.email || "anonymous",
          },
        },
      });
    if (confirmError) {
      console.log("confirm error", confirmError);
      setLoading(false);
    } else {
      if (paymentIntent.status === "succeeded") {
        setTransactionId(paymentIntent.id);
        setLoading(false);
        toast.success("Your payment was successful!");
      }
    }
  };
  return (
    <form onSubmit={handlePay} className="mt-5">
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <button
        type="submit"
        disabled={!stripe || !clientSecret}
        className="transition-all cursor-pointer disabled:bg-slate-500 duration-200 hover:scale-105 mt-8 w-40 py-3.5 text-sm bg-secondary hover:bg-blue-500 text-primary rounded-md tracking-wide"
      >
        {loading ? "Please wait..." : "Pay"}
      </button>
      {transactionId && <p className="mt-2 text-green-600">Your transaction id: {transactionId}</p>}
    </form>
  );
};

export default CheckoutForm;
