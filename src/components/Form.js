import {
  Button,
  Container,
  Grid,
  Input,
  Select,
  Text,
  Flex,
  NumberInput,
  NumberInputField,
} from "@chakra-ui/react";
import React from "react";

export default function Form({ setMode, contractData, setContractData }) {
  const handleChangeData = (type, value) => {
    setContractData((data) => ({ ...data, [type]: value }));
  };

  const buttonDisabled =
    !contractData?.contractType ||
    !contractData?.contractName ||
    !contractData?.collectionName ||
    !contractData?.collectionSymbol ||
    !contractData?.metadataUrl ||
    !contractData?.maxSupply ||
    !contractData?.price ||
    !contractData?.nftPerAddress ||
    (contractData?.contractType === "whitelist" && !contractData?.merkleRoot);

  return (
    <>
      <Text fontSize="2xl" mb="8" textAlign="center">
        Generate your contract
      </Text>

      <Grid mb="4">
        <Text>Please select contract type first:</Text>

        <Select
          placeholder="Select option"
          onChange={(e) => handleChangeData("contractType", e.target.value)}
        >
          <option value="noWhitelist">ERC721A (low gas) contract</option>
          <option value="whitelist">
            ERC721A (low gas) contract with Merkle Tree whitelist
          </option>
        </Select>
      </Grid>

      {contractData?.contractType ? (
        <>
          <Grid mb="4">
            <label>
              Contract name (just a name for the contract, no spaces)
            </label>
            <Input
              type="text"
              onChange={(e) => handleChangeData("contractName", e.target.value)}
            />
          </Grid>

          <Grid mb="4">
            <label>Collection name</label>
            <Input
              type="text"
              onChange={(e) =>
                handleChangeData("collectionName", e.target.value)
              }
            />
          </Grid>

          <Grid mb="4">
            <label>Collection symbol</label>
            <Input
              type="text"
              onChange={(e) =>
                handleChangeData("collectionSymbol", e.target.value)
              }
            />
          </Grid>

          <Grid mb="4">
            <label>Metadata URL</label>
            <Input
              type="text"
              onChange={(e) => handleChangeData("metadataUrl", e.target.value)}
            />
          </Grid>

          {contractData?.contractType === "whitelist" ? (
            <Grid mb="4">
              <label>Merkle Root</label>
              <Input
                type="text"
                onChange={(e) => handleChangeData("merkleRoot", e.target.value)}
              />
            </Grid>
          ) : null}

          <Grid mb="4">
            <label>Max supply</label>
            <NumberInput
              type="text"
              onChange={(e) => handleChangeData("maxSupply", e.target.value)}
            >
              <NumberInputField />
            </NumberInput>
          </Grid>

          <Grid mb="4">
            <label>Price (in ETH)</label>
            <NumberInput
              type="text"
              onChange={(e) => handleChangeData("price", e.target.value)}
            >
              <NumberInputField />
            </NumberInput>
          </Grid>

          <Grid mb="4">
            <label>NFT per address limit</label>
            <NumberInput
              type="text"
              onChange={(e) =>
                handleChangeData("nftPerAddress", e.target.value)
              }
            >
              <NumberInputField />
            </NumberInput>
          </Grid>

          <Flex justifyContent="center" mb="4">
            <Button
              size="lg"
              disabled={buttonDisabled}
              onClick={() => setMode(1)}
            >
              Generate
            </Button>
          </Flex>
        </>
      ) : null}
    </>
  );
}
