import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const CheckoutForm = ({ price, badge }) => {
  const [clientSecret, setClientSecret] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  const axiosPublic = useAxios();
  const axiosSecure = useAxiosSecure();
  const stripe = useStripe();
  const { user } = useAuth();
  const elements = useElements();
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

    const { error: methodError, paymentMethod } =
      await stripe.createPaymentMethod({
        type: "card",
        card,
      });
    if (methodError) {
      setError(methodError.message);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
      setError("");
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
      setError(confirmError.message);
      setLoading(false);
    } else {
      if (paymentIntent.status === "succeeded") {
        setTransactionId(paymentIntent.id);
        toast.success("Your payment was successful!");
        const payment = {
          userEmail: user.email,
          amount: price,
          transactionId: paymentIntent.id,
          paymentMethod: "Stripe",
          membership: badge,
          status: "Success",
          paidAt: new Date().toISOString(),
        };
        const res = await axiosSecure.post("/payments", payment);
        setError("");
        setLoading(false);
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
      {transactionId && (
        <p className="mt-2 text-green-600">
          Your transaction id: {transactionId}
        </p>
      )}
      {error && <p className="mt-2 text-red-500">{error}</p>}
    </form>
  );
};

CheckoutForm.propTypes = {
  price: PropTypes.number.isRequired,
  badge: PropTypes.string.isRequired,
};

export default CheckoutForm;
