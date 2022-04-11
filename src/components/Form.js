import React from "react";

export default function Form({ setMode, setContractData }) {
  const handleChangeData = (type, value) => {
    setContractData((data) => ({ ...data, [type]: value }));
  };

  return (
    <div className="formContainer">
      <h2>Generate your contract</h2>

      <div className="formElement">
        <label>Name</label>
        <input
          type="text"
          onChange={(e) => handleChangeData("name", e.target.value)}
        />
      </div>

      <div className="formElement">
        <label>Max supply</label>
        <input
          type="text"
          onChange={(e) => handleChangeData("maxSupply", e.target.value)}
        />
      </div>
      <div className="formElement">
        <label>Cost (in ETH)</label>
        <input
          type="text"
          onChange={(e) => handleChangeData("cost", e.target.value)}
        />
      </div>
      <div className="formElement">
        <label>Max mint amount</label>
        <input
          type="text"
          onChange={(e) => handleChangeData("maxMintAmount", e.target.value)}
        />
      </div>
      <div className="formElement">
        <label>NFT per address limit</label>
        <input
          type="text"
          onChange={(e) => handleChangeData("nftPerAddress", e.target.value)}
        />
      </div>
      <div className="formElement">
        <button onClick={() => setMode(1)}>Generate</button>
      </div>
    </div>
  );
}
