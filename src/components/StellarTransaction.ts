import { useState } from "react";
import StellarSdk from "stellar-sdk-2";
let server;
export const setStellarNetwork = (networks) => {
  let network;
  if (networks == "Testnet") {
    network = process.env.NEXT_PUBLIC_STELLAR_TESTNET.toString();
    StellarSdk.Network.useTestNetwork();
  }
  if (networks == "Public") {
    network = process.env.NEXT_PUBLIC_STELLAR_PUBLIC.toString();
    StellarSdk.Network.usePublicNetwork();
  }
  server = new StellarSdk.Server(network);
};

export const filterArrKeys = (keys, delim) => {
  const delimiter = [";", ",", "/", " ", "\n"];
  const arrKeys = keys.split(delimiter[delim]);
  return arrKeys.filter((e) => e != "");
};
export const init = async (keys, delim) => {
  const filteredArrKeys = filterArrKeys(keys, delim);
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
      privKeys: keys,
      status: "loading",
      detail: null,
    };
  } catch (err) {
    return {
      address: "invalid",
      privKeys: keys,
      status: "loading",
      detail: null,
    };
  }
};

const sourceKeysLoader = (keys) => {
  return StellarSdk.Keypair.fromSecret(String(keys));
};

export const sendTransaction = async (from, to) => {
  let res;
  if (from == "invalid") return { error: "Invalid Key" };
  await server
    .loadAccount(sourceKeysLoader(to).publicKey())
    .then(async (receiver) => {
      const transaction = new StellarSdk.TransactionBuilder(receiver, {
        fee: 1000,
      })
        .addOperation(
          StellarSdk.Operation.payment({
            destination: from,
            asset: new StellarSdk.Asset.native(),
            amount: "0.1",
          })
        )
        .build();

      transaction.sign(sourceKeysLoader(to));

      res = await server.submitTransaction(transaction);
    })
    .catch((e) => {
      e.data.extras
        ? (res = { error: e.data.extras.result_codes.operations[0] })
        : (res = { error: e.name.toString() });
    });
  return res;
};
export const mergeAccount = async (fromAccount, destAccount) => {
  const from = sourceKeysLoader(fromAccount);
  const destination = sourceKeysLoader(destAccount);
  let result;
  await server
    .loadAccount(from.publicKey())
    .then(async (account) => {
      let transaction = new StellarSdk.TransactionBuilder(account, {
        fee: 1000,
      })
        .addOperation(
          StellarSdk.Operation.accountMerge({
            destination: destination.publicKey(),
          })
        )
        .build();

      transaction.sign(from);
      result = await server.submitTransaction(transaction);
    })
    .catch((e) => {
      e.data.extras
        ? (result = { error: e.data.extras.result_codes.operations[0] })
        : (result = { error: e.name.toString() });
    });
  console.log(result);

  return result;
};
