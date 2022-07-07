import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import { RadioField as Raddio } from "../components/Radio";

import { Container } from "../components/Container";
import { DarkModeSwitch } from "../components/DarkModeSwitch";

import { Hero } from "../components/Hero";
import { InputField } from "../components/InputField";
import { init, sendTransaction } from "../components/StellarTransaction";
import { TableSection } from "../components/TableSection";
import { log } from "console";
const Index = () => {
  const [value, setValue] = useState([] as any);
  const [data, setData] = useState([] as any);
  const [loading, setLoading] = useState(true);
  const [render, setRender] = useState<[]>([] as any);

  async function sendTrx() {
    let datas = data;
    for (let i = 0; i < data.length; i++) {
      const address = data[i].address;
      let res = await sendTransaction(address);
      let updateData;
      console.log(res);

      if (res) {
        updateData = datas.map((item) => {
          if (item.address == address && !res.error) {
            return { ...item, status: "success", detail: res.hash };
          } else if (item.address == address && res.error) {
            return { ...item, status: "failed", detail: res.error };
          }

          return item;
        });
        datas = updateData;
        console.log("updata in loop", datas);
        setData(datas);
      }
      console.log(data);
    }

    setLoading(false);
  }
  useEffect(() => {
    if (!data) return;
    sendTrx();
    console.log(data);
  }, [value]);
  // useEffect(() => {
  //   console.log(data);
  // }, [data]);

  return (
    <Container height="100vh">
      <Flex direction={"column"} my="auto">
        <Hero title="Stellar Bulk" />
        <Formik
          initialValues={{ privKeys: "", delimiter: "4" }}
          onSubmit={async (props) => {
            init(props.privKeys, props.delimiter).then((e) => {
              setData(e.data);
              setValue(e.data);
            });
          }}
        >
          {(props) => (
            <form onSubmit={props.handleSubmit}>
              <Flex direction={"column"} ml={2}>
                <Flex
                  maxW={"3xl"}
                  minW="3xl"
                  p={1}
                  justifyContent="center"
                  alignContent={"center"}
                  justifyItems="center"
                  justifySelf={"center"}
                  alignItems="center"
                  alignSelf={"center"}
                >
                  <InputField
                    name="privKeys"
                    placeholder="Enter your private keys"
                    type="text"

                    // label="Title"
                  />
                  <Button
                    type="submit"
                    bgGradient={"linear(to-l,#4e44ce,#35aee2)"}
                  >
                    Submit!
                  </Button>
                </Flex>
                <Flex>
                  <Text>Delimiter :</Text>

                  <Raddio name="delimiter" type="radio" />
                </Flex>
              </Flex>
            </form>
          )}
        </Formik>
      </Flex>
      <TableSection data={data} />

      <DarkModeSwitch />
    </Container>
  );
};

export default Index;
