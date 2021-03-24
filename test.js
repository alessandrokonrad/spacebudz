function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}


let oldTxHash = "dae2b9f955f6e3f92f7bd5d3f224e44decad4ff1ec40309f1836e942338cfdcf";

const getReceiver = async (oldTxHash) => {
  const receiver = await fetch(
    `https://cardano-mainnet.blockfrost.io/api/v0/txs/${oldTxHash}/utxos`,
    { headers: { project_id: "3Ojodngr06BReeSN9lhsow0hypKf8gu5" } }
  );
  if (receiver) return receiver;
  await sleep(500);
  return getReceiver(oldTxHash);
};


const log = async () => {
  const receiver = await getReceiver(oldTxHash);
  console.log(receiver);
}


log()
