import { useState } from "react";
import "./App.scss";
import Form from "./components/Form";
import Result from "./components/Result";
import { ContractDataContext } from "./utils/contexts";

function App() {
  // 0 for form, 1 for code
  const [mode, setMode] = useState(0);

  const [contractData, setContractData] = useState({});

  return (
    <ContractDataContext.Provider value={contractData}>
      <div className="mainContainer">
        {mode === 0 ? (
          <Form
            setMode={setMode}
            contractData={contractData}
            setContractData={setContractData}
          />
        ) : (
          <Result />
        )}
      </div>
    </ContractDataContext.Provider>
  );
}

export default App;
