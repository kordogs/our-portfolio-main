"use client";
import React, { useEffect } from "react";

interface Props {
  username: string;
}

const FiverrSellerWidget = ({ username }: Props) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.id = "fiverr-seller-widget-script";
    script.src = `https://widgets.fiverr.com/api/v1/seller/${username}`;
    script.setAttribute(
      "data-config",
      '{"category_name":"Programming \u0026 Tech"}'
    );
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [username]);

  return (
    <div
      itemScope
      itemType="http://schema.org/Person"
      className="fiverr-seller-widget"
      style={{ display: "inline-block" }}
    >
      <a
        itemProp="url"
        href={`https://www.fiverr.com/${username}`}
        rel="nofollow"
        target="_blank"
        style={{ display: "inline-block" }}
      >
        <div
          className="fiverr-seller-content"
          id="fiverr-seller-widget-content"
          itemProp="contentURL"
          style={{ display: "none" }}
        ></div>
        <div id="fiverr-widget-seller-data" style={{ display: "none" }}>
          <div itemProp="name">{username}</div>
          <div itemScope itemType="http://schema.org/Organization">
            <span itemProp="name">Fiverr</span>
          </div>
          <div itemProp="jobtitle">Seller</div>
          {/* You can add description dynamically here if needed */}
        </div>
      </a>
    </div>
  );
};

export default FiverrSellerWidget;
