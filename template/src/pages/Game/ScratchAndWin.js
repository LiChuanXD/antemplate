import React from "react";
import ScratchImageComponent from "../../components/forms/Game/ScratchImageComponent";

const ScratchAndWin = () => {
  console.log('checkScratch')
  return (
    <div>
      <div>
        <ScratchImageComponent />
      </div>
      <div >
        <div style={{ fontWeight: "bold" }}>TERM & CONDITION</div>
        <ol>
          <li >
            Each receipt submission is only entitled for one voucher.
          </li>
          <li >
            Upon the voucher revealed, the voucher is secured in the system and
            the participant will receive a SMS notification after receipt
            validation is made and approved.
          </li>
          <li >
            Vouchers redeemed cannot be transferred for cash or other
            alternatives.
          </li>
          <li className="tnc-content">
            The vouchers are unable to perform renewals of expired eWallet
            reload pin(s) or extension of validity.
          </li>
        </ol>
      </div>
    </div>
  );
};

export default ScratchAndWin;
