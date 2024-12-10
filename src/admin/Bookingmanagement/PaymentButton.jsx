import { useState, useEffect } from "react";

const PaymentButton = ({ item, payment, handlepayment }) => {
  const [canGeneratePayment, setCanGeneratePayment] = useState(false);

  // Check if 24 hours have passed since createdDate and payment status is not success
  useEffect(() => {
    const createdDate = new Date(item?.createdDate);
    const currentTime = new Date();
    const hoursPassed = (currentTime - createdDate) / (1000 * 60 * 60); // Convert to hours

    if (hoursPassed >= 24 && payment?.payment_status !== "success") {
      setCanGeneratePayment(true);
    } else {
      setCanGeneratePayment(false);
    }
  }, [item, payment]);

  return (
    <div>
      {payment?.payment_status !== "success" ? (
        item?.status === "approved" && item?.totalPrice !== 0 ? (
          <button
            onClick={() => handlepayment(item?._id)}
            className={`${
              canGeneratePayment
                ? "bg-[#ff0062] hover:bg-[#4400c3] text-white"
                : "bg-gray-400 cursor-not-allowed"
            } font-bold text-[12px] md:text-[14px] py-[13px] px-[10px] md:px-[10px] rounded`}
            disabled={!canGeneratePayment}
          >
            {canGeneratePayment
              ? "Payment Generator"
              : "Payment Generator (Not Available Yet)"}
          </button>
        ) : null
      ) : (
        <button className="min-w-[110px] capitalize border font-[manrope] font-[600] text-[16px] text-center px-[15px] py-[6px] rounded-[60px] border-[#4CAF50] bg-[#4CAF501A] text-[#4CAF50]">
          Payment successfully done.
        </button>
      )}
    </div>
  );
};

export default PaymentButton;
