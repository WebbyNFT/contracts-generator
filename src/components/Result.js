import React, { useContext, useState } from "react";
import { ContractDataContext } from "../utils/contexts";
import generateContract from "../utils/generatedContract";

export default function Result() {
  const [showInfo, setShowInfo] = useState(false);

  const data = useContext(ContractDataContext);

  const handleCopyToClipBoard = () => {
    navigator.clipboard.writeText(generateContract(data));

    setShowInfo(true);
  };

  const contract = generateContract(data);

  const formatContract = () => {
    return contract.split("\n").map((item, idx) => {
      return (
        <span key={idx}>
          &nbsp;{item}
          <br />
        </span>
      );
    });
  };

  return (
    <div className="resultContainer">
      <h2>Your code is ready!</h2>
      {showInfo && <h3>Success!</h3>}
      <button onClick={handleCopyToClipBoard}> Copy to clipboard</button>

      <div className="contractCodeContainer">{formatContract()}</div>
    </div>
  );
}
