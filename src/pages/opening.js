import React from "react";
import { Button, LaunchButton } from "../components/Button";
import { Grid, Loading, Spacer, Modal, Snippet } from "@geist-ui/react";

import Layout from "../templates/layout";
import Metadata from "../components/Metadata";

import BounceLoader from "react-spinners/BounceLoader";
import { Checkmark } from "../components/Checkmark";
import QRCode from "react-qr-code";

//assets
import QrIcon from "../images/assets/qr.png";

import { navigate } from "gatsby";
import { useBreakpoint } from "gatsby-plugin-breakpoints";

const ADDRESS =
  "addr_test1qrzq6cs7334u2c38qz8flc89yranpe7z93fr84huztknly30m4ay2h2xqe7kzkx3706e0dl2dukrsrfhq848p2qw2w8snk7j0y";

let priceInternal;

let awaitConfirmation;

const Opening = (props) => {
  const matches = useBreakpoint();
  const [price, setPrice] = React.useState("");
  const [result, setResult] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [animation, setAnimation] = React.useState(false);

  const fetchPrice = async () => {
    const data = await fetch("http://localhost:4000/reserveId").then((res) =>
      res.json()
    );
    const parsedPrice = data.price && parseInt(data.price);
    if (parsedPrice) {
      setPrice(parsedPrice);
      priceInternal = parsedPrice;
    }
    if (!awaitConfirmation) setAwaitConfirmation();
  };

  const fetchResult = async (p) => {
    console.log("http://localhost:4000/result?price=" + p);
    const data = await fetch(
      "http://localhost:4000/result?price=" + p
    ).then((res) => res.json());
    console.log(data);
    if (data.txHash) {
      setResult(data);
      setTimeout(() => {
        setAwaitConfirmation("cancel");
        setOpen(false);
        setAnimation(true);
      }, 2000);
    }
  };

  const setAwaitConfirmation = (action) => {
    if (action == "cancel") {
      clearInterval(awaitConfirmation);
      awaitConfirmation = null;
      return;
    }
    awaitConfirmation = setInterval(() => {
      console.log(priceInternal);
      if (priceInternal) {
        fetchResult(priceInternal);
      }
    }, 6000);
  };

  return (
    <>
      <Metadata
        titleTwitter="SpaceBudz: Collectible Astronauts"
        title="SpaceBudz"
        description="Collect your unique SpaceBud as NFT on the Cardano blockchain."
      />
      <Layout>
        <div
          style={{
            minHeight: "100vh",
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          {animation ? (
            <>
              <img src={`../../spacebudz/bud${result.id}.png`} width={300} />
              <div>Congratulations!</div>
              <div>
                <b>SpaceBud #{result.id}</b> will be soon reflected in your
                wallet.
              </div>
              <div>{result.txHash}</div>
              <div style={{ height: 20 }} />
              <div style={{ display: "flex" }}>
                <Button
                  bgcolor="#263238"
                  onClick={() => {
                    window.open(`/explore/spacebud/${result.id}`);
                    // navigate();
                  }}
                >
                  Details
                </Button>
                <div style={{ width: 20 }} />
                <Button
                  onClick={() => {
                    priceInternal = null;
                    setAnimation(false);
                    setPrice(null);
                    setResult(null);
                    setTimeout(() => {
                      fetchPrice();
                      setOpen(true);
                    });
                  }}
                >
                  Unpack More
                </Button>
              </div>
            </>
          ) : (
            <Button
              onClick={() => {
                fetchPrice();
                setOpen(true);
              }}
            >
              Open
            </Button>
          )}
        </div>
        {/* Modal */}
        <PaymentModal
          result={result}
          price={price}
          open={open}
          setOpen={(b) => setOpen(b)}
        />
      </Layout>
    </>
  );
};

const PaymentModal = ({ price, open, setOpen, result }) => {
  const [showQr, setShowQr] = React.useState(false);

  return (
    <>
      <Modal
        open={open}
        disableBackdropClick={true}
        onClose={() => setOpen(false)}
      >
        <Modal.Title>Awaiting Transaction</Modal.Title>
        <Modal.Subtitle>Unpack one SpaceBud</Modal.Subtitle>
        <Modal.Content>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              textAlign: "center",
              padding: 10,
            }}
          >
            <div style={{ fontSize: 12 }}>
              Send <b>exactly</b> the following ADA amount to this address!
              <br /> This payment request expires in <b>15 minutes</b>.
            </div>
            <div style={{ height: 30 }} />
            <Snippet
              symbol="ADA:"
              text={`${price ? price / 1000000 : "..."}`}
              toastText={`Copied ${price ? price / 1000000 : "..."} ADA`}
            />
            <div style={{ height: 20 }} />
            <div
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div style={{ width: "80%" }}>
                <Snippet
                  symbol="Address:"
                  text={ADDRESS}
                  toastText="Copied payment address"
                />
              </div>
              <div style={{ width: 20 }} />
              <img
                style={{ cursor: "pointer" }}
                onClick={() => setShowQr(true)}
                src={QrIcon}
                width="34px"
              />
            </div>
            <div style={{ height: 50 }} />
            {result && result.txHash ? (
              <Checkmark size="96px" />
            ) : (
              <BounceLoader loading={true} size={96} color={"#4a148c"} />
            )}
            <div style={{ height: 30 }} />
            <div style={{ fontSize: 12 }}>
              It takes up to 1 minute after payment receipt
            </div>
          </div>
        </Modal.Content>
        {/* <Modal.Action onClick={() => setOpen(false)}>?</Modal.Action> */}
        <Modal.Action onClick={() => setOpen(false)}>Cancel</Modal.Action>
        <Modal.Action onClick={() => {}}>Watch Tutorial</Modal.Action>
      </Modal>
      {/* Qr Code */}
      <Modal open={showQr} onClose={() => setShowQr(false)}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            padding: 10,
          }}
        >
          <QRCode value={ADDRESS} />
          <div style={{ height: 20 }} />
          <div style={{ wordBreak: "break-all", fontSize: 11 }}>{ADDRESS}</div>
        </div>
      </Modal>
    </>
  );
};

export default Opening;

// query {
//   utxos(
//     where: {
//       _and: [
//         {
//           tokens: {
//             policyId: {
//               _eq: "dd003135b131f922ff579388f9cfad9cf6ed994eaab42f43c2da8d56"
//             }
//           },
//           transaction: {
//             inputs:{value:{_eq:"20046470"}}
//           }
//         }
//       ]
//     }
//   ) {
//     tokens {
//       assetName
//     }
//     transaction {
//       hash
//     }
//   }
// }

// query {
//   transactions(
//     where: {
//       mint: {
//         policyId: {
//           _eq: "dd003135b131f922ff579388f9cfad9cf6ed994eaab42f43c2da8d56"
//         }
//       }
//     }
//   ) {
// 	mint {assetName}
//   }
// }

// https://codepen.io/RoyLee0702/pen/RwNgVya
