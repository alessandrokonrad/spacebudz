import React from "react";
import "./LaunchButton.scss";
import charming from "charming";
import Spaceship from "../../assets/spaceship.svg";
import { useHistory } from "react-router-dom";

const LaunchButton = (props) => {
  const history = useHistory();
  React.useEffect(() => {
    const d = 40;

    document.querySelectorAll(".rocket-button").forEach((elem) => {
      elem.querySelectorAll(".default, .success > div").forEach((text) => {
        charming(text);
        text.querySelectorAll("span").forEach((span, i) => {
          span.innerHTML =
            span.textContent == " " ? "&nbsp;" : span.textContent;
          //   span.style.setProperty("--d", i * d + "ms");
          //   //   span.style.setProperty(
          //     "--ds",
          //     text.querySelectorAll("span").length * d - d - i * d + "ms"
          //   );
        });
      });

      elem.addEventListener("click", (e) => {
        e.preventDefault();
        if (elem.classList.contains("animated")) {
          return;
        }
        elem.classList.add("animated");
        elem.classList.toggle("live");
        setTimeout(() => {
          elem.classList.remove("animated");
          history.push("/browse");
        }, 1600);
      });
    });
  }, []);
  return (
    <React.Fragment>
      {" "}
      <a href="" class="rocket-button" style={{ padding: "16px 30px" }}>
        <div class="default">Browse Collectibles</div>

        <div class="animation">
          <div class="rocket">
            <img width={30} src={Spaceship}></img>
          </div>
          <div class="smoke">
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
          </div>
        </div>
      </a>
    </React.Fragment>
  );
};

export default LaunchButton;
