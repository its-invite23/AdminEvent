import { useState, useEffect } from "react";

const PaymentButton = ({ item, handlepayment, payment }) => {
  console.log("payment", payment)
  const [canGeneratePayment, setCanGeneratePayment] = useState(false);

  useEffect(() => {
    const createdDate = new Date(item?.payment_genrator_date);
    const currentTime = new Date();
    const hoursPassed = (currentTime - createdDate) / (1000 * 60 * 60); // Convert to hours
    // Check if 24 hours have passed and payment status is not success
    if (hoursPassed >= 24 && item?.payment_status !== "success") {
      setCanGeneratePayment(true);
    } else {
      setCanGeneratePayment(false);
    }
  }, [item, payment]);

  return (
    <div>
      {payment?.payment_status !== "success" && (

        canGeneratePayment && (
          <button
            onClick={() => handlepayment(item?._id)}
            className="bg-[#ff0062] hover:bg-[#4400c3] text-white font-bold text-[12px] md:text-[14px] py-[13px] px-[10px] md:px-[10px] rounded"
          >
            ReGenerate payment Link
          </button>
        )
      )}
    </div>
  );
};

export default PaymentButton;
