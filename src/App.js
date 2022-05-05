import { useState } from "react";
import Form from "./components/Form";
import Result from "./components/Result";
import { ContractDataContext } from "./utils/contexts";
import { ChakraProvider, Container } from "@chakra-ui/react";
import InfoContainer from "./components/InfoContainer";

function App() {
  // 0 for form, 1 for code
  const [mode, setMode] = useState(0);

  const [contractData, setContractData] = useState({});

  return (
    <ChakraProvider>
      <ContractDataContext.Provider value={contractData}>
        <InfoContainer />
        <Container pt="8" pb="8" maxW="2xl">
          {mode === 0 ? (
            <Form
              setMode={setMode}
              contractData={contractData}
              setContractData={setContractData}
            />
          ) : (
            <Result
              contractType={contractData?.contractType}
              setMode={setMode}
            />
          )}
        </Container>
      </ContractDataContext.Provider>
    </ChakraProvider>
  );
}

export default App;
