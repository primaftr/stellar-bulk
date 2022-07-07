import {
  CheckCircleIcon,
  CloseIcon,
  ExternalLinkIcon,
  LinkIcon,
  TimeIcon,
} from "@chakra-ui/icons";
import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tfoot,
  Text,
  Flex,
  Link,
} from "@chakra-ui/react";
import React from "react";

interface TableSectionProps {
  data?: [{ address: string; status: string; detail: string }];
}

const successField = () => (
  <Flex>
    <Text>Success</Text>
    <CheckCircleIcon ml={2} />
  </Flex>
);

const errorField = () => (
  <Flex>
    <Text>Transaction Failed </Text>
    <CloseIcon ml={2} />
  </Flex>
);
const loadingField = () => (
  <Flex>
    <Text>Loading</Text>
    <TimeIcon />
  </Flex>
);

export const TableSection: React.FC<TableSectionProps> = ({ data }) => {
  console.log("tabel", data);

  return (
    <TableContainer>
      <Table size="sm">
        <Thead>
          <Tr>
            <Th>Address</Th>
            <Th>Status</Th>
            <Th>Detail</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data?.map((e) => (
            <Tr key={e.address}>
              <Td>{e.address}</Td>
              <Td>
                {e.status == "success"
                  ? successField()
                  : e.status == "failed"
                  ? errorField()
                  : loadingField()}
              </Td>
              <Td>
                {e.status == "success" ? (
                  <Link
                    href={`https://stellar.expert/explorer/public/tx/${e.detail}`}
                    target="_blank"
                  >
                    {e.detail.slice(0, 15)}...
                    <ExternalLinkIcon ml={2} />
                  </Link>
                ) : e.detail ? (
                  e.detail
                ) : (
                  "Loading"
                )}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
