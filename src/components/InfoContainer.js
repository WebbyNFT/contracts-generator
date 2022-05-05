import { Container, Grid, Flex, Link, Test, Text, Box } from "@chakra-ui/react";
import React from "react";

export default function InfoContainer() {
  return (
    <>
      <Flex p="4" justifyContent="space-between">
        <Flex>
          Author:{" "}
          <Link href="https://github.com/WebbyNFT" isExternal ml="1">
            Webby NFT
          </Link>
        </Flex>
        <Text>Used: 512 times</Text>
      </Flex>
    </>
  );
}
