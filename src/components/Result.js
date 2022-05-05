import { Button, Container, Grid, Text, Flex } from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { ContractDataContext } from "../utils/contexts";
import generateContract from "../utils/generatedContract";
import generateContractWithWhitelist from "../utils/generatedContractWithWhitelist";

export default function Result({ contractType, setMode }) {
  const [showInfo, setShowInfo] = useState(false);

  const data = useContext(ContractDataContext);

  const handleCopyToClipBoard = () => {
    navigator.clipboard.writeText(generateContract(data));

    setShowInfo(true);
  };

  const contract =
    contractType === "noWhitelist"
      ? generateContract(data)
      : generateContractWithWhitelist(data);

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
    <>
      <Text fontSize="2xl" mb="8" textAlign="center">
        Your code is ready!
      </Text>
      {/* {showInfo && <h3>Success!</h3>}
      <button onClick={handleCopyToClipBoard}> Copy to clipboard</button> */}

      <Grid
        backgroundColor="#222336"
        color="#babbcc"
        p="4"
        borderRadius="4"
        mb="6"
      >
        {formatContract()}
      </Grid>

      <Flex justifyContent="center">
        <Button size="lg" onClick={() => setMode(0)}>
          Go back to form
        </Button>
      </Flex>
    </>
  );
}
