import React from "react";
import { API } from "../backend";
import "../styles.css";
import Base from "./Base";
import Card from "./components/card";
import { title, description } from "../bangla";
export default function Home() {
  return (
    <Base title={title} description={description}>
      <div className="card-group">
        {/* <Card
          imageUrls={[
            "https://media.wired.com/photos/5cadec1fb75f9b23c6466d74/1:1/w_1398,h_1398,c_limit/blackhole.jpg",
          ]}
        ></Card> */}

        <Card></Card>

        {/* <Card></Card> */}
      </div>
    </Base>
  );
}
