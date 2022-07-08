import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import { RadioField as Raddio } from "../components/Radio";

import { Container } from "../components/Container";
import { DarkModeSwitch } from "../components/DarkModeSwitch";

import { Hero } from "../components/Hero";
import { InputField } from "../components/InputField";
import {
  init,
  mergeAccount,
  setStellarNetwork,
} from "../components/StellarTransaction";
import { TableSection } from "../components/TableSection";
import { Disclaimer } from "../components/Disclaimer";

const Index = () => {
  const [submitted, setSubmitted] = useState(false);
  const [data, setData] = useState([] as any);
  const [_destinationAddress, setDestinationAddress] = useState<
    string | null
  >();
  const [loading, setLoading] = useState(true);
  const [network, setNetwork] = useState<"Public" | "Testnet">("Testnet");

  async function sendTrx() {
    let datas = data;
    for (let i = 0; i < data.length; i++) {
      const fromKeys = data[i].privKeys;
      const fromAddress = data[i].address;

      let res = await mergeAccount(fromKeys, _destinationAddress);
      let updateData;
      console.log("res index", res);

      if (res) {
        console.log("res exist");
        updateData = datas.map((item) => {
          if (item.address == fromAddress && !res.error) {
            return { ...item, status: "success", detail: res.hash };
          } else if (item.address == fromAddress && res.error) {
            return { ...item, status: "failed", detail: res.error };
          }

          return item;
        });
        console.log("updata", updateData);

        datas = updateData;
        setData(datas);
        setSubmitted(false);
      }
    }

    setLoading(false);
  }
  useEffect(() => {
    if (!data) return;
    if (!submitted) return;
    console.log("submited");

    sendTrx();
  }, [submitted]);

  return (
    <>
      <Container minH={"100vh"}>
        <Flex minH="100vh">
          <Flex
            direction={"column"}
            my="auto"
            // mt={"50%"}
            // transform="translate(calc(50vw - 50%), calc(50vh - 50%))"
          >
            <Hero title="Stellar Bulk" />
            <Formik
              initialValues={{
                privKeys: "",
                delimiter: "4",
                destinationAddress: "",
              }}
              onSubmit={(props) => {
                setStellarNetwork(network);
                init(props.privKeys, props.delimiter).then((e) => {
                  setDestinationAddress(props.destinationAddress);
                  setData(e.data);
                  setSubmitted(true);
                });
              }}
            >
              {(props) => (
                <form onSubmit={props.handleSubmit}>
                  <Flex direction={"column"} ml={2} mt={5}>
                    <Box ml={"auto"} my={2}>
                      <Button
                        colorScheme={"green"}
                        variant="outline"
                        onClick={() => {
                          network == "Testnet"
                            ? setNetwork("Public")
                            : setNetwork("Testnet");
                        }}
                      >
                        {network}
                      </Button>
                    </Box>
                    <InputField
                      name="destinationAddress"
                      type={"text"}
                      placeholder="Destination address"
                    />
                    <Flex
                      maxW={"3xl"}
                      minW="3xl"
                      mt={2}
                      // p={1}
                      justifyContent="center"
                      alignContent={"center"}
                      justifyItems="center"
                      justifySelf={"center"}
                      alignItems="center"
                      alignSelf={"center"}
                    >
                      <InputField
                        textarea
                        name="privKeys"
                        placeholder="Enter your private keys"
                        type="text"
                      />
                    </Flex>
                    <Flex mt={4} alignItems="center">
                      <Text>Delimiter :</Text>

                      <Raddio name="delimiter" type="radio" />
                      <Button
                        ml={"auto"}
                        type="submit"
                        bgGradient={"linear(to-l,#4e44ce,#35aee2)"}
                      >
                        Submit!
                      </Button>
                    </Flex>
                  </Flex>
                </form>
              )}
            </Formik>
          </Flex>
        </Flex>

        <DarkModeSwitch />
        <Disclaimer />
        <TableSection data={data} />
      </Container>
    </>
  );
};

export default Index;
