import { useState } from "react";
import StellarSdk from "stellar-sdk-2";

// interface SourceKeys {
//   account: string;
// }

// const [data, setData] = useState();

const server = new StellarSdk.Server(
  process.env.NEXT_PUBLIC_STELLAR_TESTNET.toString()
);
StellarSdk.Network.useTestNetwork();

const masterKey = "SBSKZVS5NNLPNTFHL5AD6HEQ254U3GD5WT3M5JCPRCY4E5AYGQCGPI2W";

export const init = async (keys, delim) => {
  const delimiter = [";", ",", "/", " ", "\n"];

  const arrKeys = keys.split(delimiter[delim]);
  const filteredArrKeys = arrKeys.filter((e) => e != "");
  let result = [];

  for (let i in filteredArrKeys) {
    const res = await accountLoader(filteredArrKeys[i]);
    result.push(res);
  }
  return {
    data: result,
  };
};

export const accountLoader = async (keys) => {
  try {
    const sourceKeys = sourceKeysLoader(keys);
    return {
      address: sourceKeys.publicKey(),
      status: "loading",
      detail: null,
    };
  } catch (err) {
    return err;
  }
};

const sourceKeysLoader = (keys) => {
  return StellarSdk.Keypair.fromSecret(String(keys));
};

export const sendTransaction = async (address) => {
  let res;
  await server
    .loadAccount(sourceKeysLoader(masterKey).publicKey())
    .then(async (receiver) => {
      const transaction = new StellarSdk.TransactionBuilder(receiver, {
        fee: 1000,
      })
        .addOperation(
          StellarSdk.Operation.payment({
            destination: address,
            asset: new StellarSdk.Asset.native(),
            amount: "0.1",
          })
        )
        .build();

      transaction.sign(sourceKeysLoader(masterKey));

      res = await server.submitTransaction(transaction);
    })
    .catch((e) => {
      console.log(e);
      res = { error: e.data.extras.result_codes.operations[0] };
    });
  return res;
};
