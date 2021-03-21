import React from "react";
import Helmet from "react-helmet";
import logo from "../../logo.png";

const Metadata = ({ title, titleTwitter, image, description }) => (
  <Helmet>
    <title>{title}</title>
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:site" content="@spacebudzNFT" />
    <meta name="twitter:title" content={titleTwitter} />
    <meta name="twitter:description" content={description} />
    <meta
      name="twitter:image"
      content={`https://spacebudz.io${image ? image : logo}`}
    />
  </Helmet>
);

export default Metadata;
