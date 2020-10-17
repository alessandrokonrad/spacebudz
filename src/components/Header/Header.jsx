import React from "react";
import Tab from "./Tab";
import {
  mdiRocketOutline,
  mdiBookOpenOutline,
  mdiSortVariant,
  mdiTwitter,
  mdiTelegram,
} from "@mdi/js";
import { Spacer, Popover, Link, useMediaQuery } from "@geist-ui/react";
import Icon from "@mdi/react";
import { useHistory } from "react-router-dom";
import { StartButton } from "../Account";

//assets
import Logo from "../../assets/logo.svg";

const Header = (props) => {
  const history = useHistory();
  const matches = useMediaQuery("md", { match: "up" });

  return (
    <div
      id="header"
      style={{
        margin: matches ? "0 100px" : "0 15px",
        height: "90px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {/* Logo */}
      <div
        style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
        onClick={() => history.push("/")}
      >
        <img draggable={false} width={38} src={Logo} />
        {matches && (
          <>
            <Spacer x={0.8} />
            <span
              style={{ fontFamily: "'Days One', sans-serif", fontSize: 20 }}
            >
              SpaceBudz
            </span>
          </>
        )}
      </div>

      {/* Right Side */}
      <div style={{ display: "flex", alignItems: "center" }}>
        <Tab icon={mdiRocketOutline}>Browse</Tab>
        <Spacer x={1.2} />
        <Tab
          icon={mdiBookOpenOutline}
          menu={
            <>
              <Popover.Item style={{ cursor: "pointer" }}>
                <span>How It Works</span>
              </Popover.Item>
              <Popover.Item line />
              <Popover.Item style={{ cursor: "pointer" }}>
                <span>FAQ</span>
              </Popover.Item>
            </>
          }
        >
          Guide
        </Tab>
        <Spacer x={1.2} />
        <Tab
          icon={mdiSortVariant}
          menu={
            <>
              <Popover.Item title>
                <span>Social Media</span>
              </Popover.Item>
              <Popover.Item>
                <Link
                  href="#"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <Icon path={mdiTwitter} size={0.7} />{" "}
                  <span style={{ marginLeft: 4 }}>Twitter</span>
                </Link>
              </Popover.Item>
              <Popover.Item>
                <Link
                  href="#"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <Icon path={mdiTelegram} size={0.7} />{" "}
                  <span style={{ marginLeft: 4 }}>Telegram</span>
                </Link>
              </Popover.Item>
              <Popover.Item line />
              <Popover.Item style={{ cursor: "pointer" }}>
                <span>About</span>
              </Popover.Item>
              <Popover.Item line />
              <Popover.Item style={{ cursor: "pointer" }}>
                <span>Contact</span>
              </Popover.Item>
            </>
          }
        >
          More
        </Tab>
        <Spacer x={1.5} />
        <StartButton />
      </div>
    </div>
  );
};

export default Header;
