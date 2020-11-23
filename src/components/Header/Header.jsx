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
import Logo from "../../assets/logo3.svg";

const Header = (props) => {
  const history = useHistory();
  const matches = useMediaQuery("md", { match: "up" });

  return (
    <div style={{ position: "absolute", width: "100%" }}>
      <div
        id="header"
        style={{
          margin: matches ? "0 4%" : "0 15px",
          height: matches ? 120 : 100,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            zIndex: 2,
          }}
          onClick={() => {
            history.push("/");
            window.scrollTo(0, 0);
          }}
        >
          <img
            style={{
              backgroundColor: "white",
              padding: 2,
              borderRadius: "50%",
            }}
            draggable={false}
            width={matches ? 55 : 45}
            src={Logo}
          />
          {matches && (
            <>
              <Spacer x={0.8} />
              <span
                style={{
                  fontFamily: "'Heebo', sans-serif",
                  fontSize: 28,
                  color: "#311b92",
                }}
              >
                SpaceBudz
              </span>
            </>
          )}
        </div>

        {/* Right Side */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            zIndex: 1,
            background: "white",
            borderRadius: "40px",
            padding: matches ? "10px 40px" : "5px 10px",
            marginRight: matches && -20,
          }}
        >
          <Tab
            icon={mdiRocketOutline}
            onClick={() => {
              history.push("/explore");
              window.scrollTo(0, 0);
            }}
          >
            Explore
          </Tab>
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
    </div>
  );
};

export default Header;
