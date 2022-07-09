import { Flex, Heading } from "@chakra-ui/react";

export const Hero = ({ title }: { title: string }) => (
  <Flex
    justifyContent="center"
    alignItems="center"
    bgGradient="linear(to-l, heroGradientStart, heroGradientEnd)"
    bgClip="text"
  >
    <Heading fontSize={{ base: "3em", md: "4em" }}>{title}</Heading>
  </Flex>
);

Hero.defaultProps = {
  title: "with-chakra-ui-typescript",
};
