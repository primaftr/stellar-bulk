import {
  Button,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";

export const Disclaimer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: true });

  return (
    <>
      <Button
        position="fixed"
        top={4}
        onClick={onOpen}
        aria-label="Toggle Theme"
        colorScheme="green"
      >
        Disclaimer !
      </Button>
      <Modal
        isCentered
        isOpen={isOpen}
        size="2xl"
        onClose={onClose}
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Disclaimers</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Heading size={"md"} mb={4}>
              STELLAR BULK DIDN'T COLLECT ANY DATA EITHER ITS TRANSACTION,
              ADDRESS NOR PRIVATE KEYS.
            </Heading>
            Stellar Bulk purely use static web page that didn't interact with
            any server database beside Stellar Horizon to make request. Make
            sure there is no malware nor keylogger that could log your
            copy-pasting data.
          </ModalBody>

          <ModalFooter mt={4}>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Understood!
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                history.back();
              }}
            >
              Take me back!
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
