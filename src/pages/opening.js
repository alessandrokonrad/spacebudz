import React from "react";
import { Button, LaunchButton } from "../components/Button";
import {
  Grid,
  Loading,
  Spacer,
  Modal,
  Snippet,
  Link,
  useModal,
} from "@geist-ui/react";
import { useBreakpoint } from "gatsby-plugin-breakpoints";
import Layout from "../templates/layout";
import Metadata from "../components/Metadata";

import BounceLoader from "react-spinners/BounceLoader";
import { Checkmark } from "../components/Checkmark";
import QRCode from "react-qr-code";

//assets
import QrIcon from "../images/assets/qr.png";

import { Share2 } from "@geist-ui/react-icons";
import { ShareModal } from "../components/Modal";

const ADDRESS =
  "addr_test1qrzq6cs7334u2c38qz8flc89yranpe7z93fr84huztknly30m4ay2h2xqe7kzkx3706e0dl2dukrsrfhq848p2qw2w8snk7j0y";

const API = "https://us-central1-space-budz.cloudfunctions.net/api";

let priceInternal;

let awaitConfirmation;

const Opening = (props) => {
  const matches = useBreakpoint();
  const [price, setPrice] = React.useState("");
  const [result, setResult] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [animation, setAnimation] = React.useState(false);
  const { visible, setVisible, bindings } = useModal();

  const fetchPrice = async () => {
    const data = await fetch(API + "/reserveId").then((res) => res.json());
    const parsedPrice = data.price && parseInt(data.price);
    if (parsedPrice) {
      setPrice(parsedPrice);
      priceInternal = parsedPrice;
    }
    if (!awaitConfirmation) setAwaitConfirmation();
  };

  const fetchResult = async (p) => {
    const data = await fetch(API + "/result?price=" + p).then((res) =>
      res.json()
    );
    console.log(data);
    setResult(data);
    if (data.txHash) {
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
    }, 3000);
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
            marginTop: !matches.md ? 120 : 80,
            flexDirection: "column",
          }}
        >
          {animation ? (
            <>
              <img
                src={`../../spacebudz/bud${result.id}.png`}
                width={!matches.md ? 410 : 350}
              />
              <div style={{ fontWeight: 800, fontSize: 22, color: "#777777" }}>
                Congratulations!
              </div>
              <div style={{ height: 15 }} />
              <div style={{ textAlign: "center", maxWidth: 400, width: "90%" }}>
                <b>SpaceBud #{result.id}</b>
                <br /> will be soon reflected in your wallet and on the website.
              </div>
              <div style={{ height: 5 }} />
              <div>
                <Link
                  style={{ textDecoration: "underline" }}
                  underline
                  color="success"
                  onClick={(e) => {
                    e.preventDefault();
                    window.open(
                      `https://cardanoscan.io/transaction/${result.txHash}`
                    );
                  }}
                >
                  View Transaction
                  <span style={{ fontSize: 11, marginLeft: 4 }}>
                    (may take a while)
                  </span>
                </Link>
              </div>
              <div style={{ height: 40 }} />
              <div style={{ display: "flex" }}>
                <Button
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    minWidth: 50,
                  }}
                  bgcolor="#263238"
                  onClick={() => {
                    setVisible(true);
                  }}
                >
                  <Share2 size={22} />
                </Button>
                <div style={{ width: 20 }} />
                <Button
                  bgcolor="#263238"
                  onClick={() => {
                    window.open(`/explore/spacebud/${result.id}`);
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
        <ShareModal
          id={result && result.txHash && result.id}
          modal={{ visible, setVisible, bindings }}
        />{" "}
      </Layout>
    </>
  );
};

const toMinutes = (milliseconds) =>
  parseInt(Math.floor(parseInt(Math.floor(milliseconds / 1000)) / 60));

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
              <br /> This payment request expires in{" "}
              <b>
                {result ? 15 - toMinutes(Date.now() - result.time) : "15"}{" "}
                minutes
              </b>
              .
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

// https://codepen.io/RoyLee0702/pen/RwNgVya
