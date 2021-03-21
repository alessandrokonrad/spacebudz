import {
  mdiFacebook,
  mdiLink,
  mdiReddit,
  mdiShareVariantOutline,
  mdiTwitter,
} from "@mdi/js";
import Icon from "@mdi/react";
import React from "react";
import {
  Grid,
  Input,
  Link,
  Modal,
  Snippet,
  Spacer,
  useModal,
} from "@geist-ui/react";

const ShareModal = (props) => {
  return (
    <Modal {...props.modal.bindings} open={props.modal.visible}>
      <Modal.Title>Share</Modal.Title>
      <Modal.Subtitle>SpaceBud #{props.id}</Modal.Subtitle>
      <Modal.Content
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <div
          style={{ width: 300, height: 300, marginTop: -30, marginBottom: -30 }}
        >
          <img src={`../../../spacebudz/bud${props.id}.png`} width="100%" />
        </div>

        <Spacer y={1} />

        <Snippet
          width="90%"
          text={`https://spacebudz.io/explore/spacebud/${props.id}`}
          symbol=""
          toastText="Copied Link"
        />
      </Modal.Content>
      <Modal.Action
        passive
        onClick={() =>
          window.open(
            `https://twitter.com/intent/tweet?text=Check%20out%20SpaceBud%20%23${props.id}!%0A&url=${window.location.href}`
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
            `http://www.reddit.com/submit?url=${window.location.href}&title=Check%20out%20SpaceBud%20%23${props.id}!`
          )
        }
      >
        <Icon path={mdiReddit} size={1} />
      </Modal.Action>
    </Modal>
  );
};

export default ShareModal;
