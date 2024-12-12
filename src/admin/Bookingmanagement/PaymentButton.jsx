import { useState, useEffect } from "react";

const PaymentButton = ({ item, handlepayment, payment }) => {
  const [canGeneratePayment, setCanGeneratePayment] = useState(false);
  const [showReGenratorButton, setShowReGenratorButton] = useState(false);

  // Check if 24 hours have passed since createdDate and payment status is not success
  useEffect(() => {
    const createdDate = new Date(item?.payment_genrator_date
    );
    const currentTime = new Date();
    const hoursPassed = (currentTime - createdDate) / (1000 * 60 * 60); // Convert to hours
    if (hoursPassed >= 24 && payment?.payment_status !== "success") {
      setCanGeneratePayment(true);
    } else {
      setCanGeneratePayment(false);
    }
  }, [item, payment]);

  return (
    <div> {showReGenratorButton && (<button onClick={() => handlepayment(item?._id)} className="bg-[#ff0062] hover:bg-[#4400c3] text-white font-bold text-[12px] md:text-[14px] py-[13px] px-[10px] md:px-[10px] rounded" > ReGenrator payment Link </button>)} </div>
  );
};

export default PaymentButton;
