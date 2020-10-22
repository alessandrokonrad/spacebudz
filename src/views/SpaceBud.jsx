import {
  Badge,
  Grid,
  Input,
  Link,
  Modal,
  Spacer,
  useModal,
} from "@geist-ui/react";
import {
  mdiFacebook,
  mdiLink,
  mdiReddit,
  mdiShareVariantOutline,
  mdiTwitter,
} from "@mdi/js";
import Icon from "@mdi/react";
import React from "react";
import MiddleEllipsis from "react-middle-ellipsis";
import { useHistory } from "react-router-dom";
import { Button } from "../components/Button";

const sampleAddr =
  "addr1q88auysv8uale3unvnk2s9xrwqqxf2dzs7wpyut6g3xzuwlnhh356yzp7k3qwmhe4fk0g5u6kx5ka4rz5qcq4j7mvh2swy44jn";

const SpaceBud = React.forwardRef((props, ref) => {
  const history = useHistory();
  const [data, setData] = React.useState("");
  const { visible, setVisible, bindings } = useModal();

  const getId = () => {
    const url = window.location.href;
    const id = url.split("spacebud/")[1];
    return id;
  };

  const fetchData = () => {
    const id = getId();
    const data = {
      id,
      attributes: { helmet: true, weapon: true },
      type: "Ape",
      image: `/set3/sample${id}.svg`,
    };
    setData(data);
  };

  React.useEffect(() => {
    fetchData();
  }, []);
  return (
    <div
      ref={ref}
      style={{
        position: "absolute",
        width: "100%",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        marginTop: 20,
      }}
    >
      <div
        style={{
          position: "relative",
          paddingTop: 35,
          paddingBottom: 35,
          width: "95%",
          borderRadius: 10,
          backgroundColor: "#263238",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          color: "white",
        }}
      >
        <Icon
          path={mdiShareVariantOutline}
          size={1.2}
          style={{ position: "absolute", left: 25, top: 25, cursor: "pointer" }}
          onClick={() => setVisible(true)}
        ></Icon>
        {/* Modal Share */}
        <ShareModal data={data} modal={{ visible, setVisible, bindings }} />
        {/* Modal Share End */}
        <img width={300} height={300} src={data.image} />
        <Spacer y={1} />
        <div style={{ fontWeight: 600, fontSize: 30 }}>SpaceBud #{data.id}</div>
        Ape Astronaut
      </div>
      <Spacer y={1} />
      <div
        style={{
          paddingTop: 8,
          paddingBottom: 8,
          paddingLeft: 12,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 16,
          border: "solid 2px #311b92",
          borderRadius: 25,
          color: "#777777",
        }}
      >
        <span>
          <b>Owner:</b>{" "}
        </span>
        <div
          style={{
            width: "200px",
            whiteSpace: "nowrap",
            textAlign: "center",
          }}
        >
          <MiddleEllipsis>
            <Link
              underline
              color="success"
              onClick={(e) => {
                e.preventDefault();
                history.push(`/profile/${sampleAddr}`);
              }}
            >
              {sampleAddr}
            </Link>
          </MiddleEllipsis>
        </div>
      </div>
      <Spacer y={2} />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div>
          <div style={{ fontSize: 12 }}>Buy now price</div>
          <Spacer y={0.1} />
          <div style={{ fontWeight: 500 }}>100.0 ADA</div>
          <Spacer y={0.1} />
          <div style={{ fontSize: 12, color: "#777777" }}>10.8 USD</div>
        </div>
        <Spacer x={1} />
        <Button>Buy</Button>
        <Spacer x={0.4} />
        <Button bgcolor="#263238">Make Offer</Button>
      </div>
      <Spacer y={1.5} />
      <div style={{ fontSize: 26, color: "#777777", fontWeight: 600 }}>
        Attributes
      </div>
      <Spacer y={0.5} />
      <div
        style={{
          width: 350,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Grid.Container
          gap={1}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Attribute>Flag</Attribute>
          <Attribute>Weapon</Attribute>
          <Attribute>Helmet</Attribute>
        </Grid.Container>
      </div>
    </div>
  );
});

const ShareModal = (props) => {
  return (
    <Modal {...props.modal.bindings} open={props.modal.visible}>
      <Modal.Title>Share</Modal.Title>
      <Modal.Subtitle>SpaceBud #{props.data.id}</Modal.Subtitle>
      <Modal.Content
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <img width={250} height={250} src={props.data.image} />
        <Spacer y={1} />
        <Input
          onFocus={(e) => e.target.select()}
          readOnly={true}
          value={`https://space-budz.web.app/browse/spacebud/${props.data.id}`}
          iconRight={<Icon path={mdiLink} size={1} />}
        ></Input>
      </Modal.Content>
      <Modal.Action
        passive
        onClick={() =>
          window.open(
            `https://twitter.com/intent/tweet?text=Check%20out%20SpaceBud%20%23${props.data.id}!%0A&url=${window.location.href}`
          )
        }
      >
        <Icon path={mdiTwitter} size={1} />
      </Modal.Action>
      <Modal.Action
        passive
        onClick={() =>
          window.open(
            "https://www.facebook.com/sharer/sharer.php?u=" +
              encodeURIComponent(window.location.href),
            "facebook-share-dialog"
          )
        }
      >
        <Icon path={mdiFacebook} size={1} />
      </Modal.Action>
      <Modal.Action
        passive
        onClick={() =>
          window.open(
            `http://www.reddit.com/submit?url=${window.location.href}&title=Check%20out%20SpaceBud%20%23${props.data.id}!`
          )
        }
      >
        <Icon path={mdiReddit} size={1} />
      </Modal.Action>
    </Modal>
  );
};

const Attribute = (props) => {
  return (
    <Grid
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          display: "table",
          height: 20,
          backgroundColor: "#9575cd",
          padding: "2px 5px",
          borderRadius: 25,
          fontSize: 14,
          color: "white",
          fontWeight: 500,
          textAlign: "center",
          verticalAlign: "middle",
        }}
      >
        {props.children}
      </div>
    </Grid>
  );
};

export default SpaceBud;
