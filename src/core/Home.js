import React from "react";
import { API } from "../backend";
import "../styles.css";
import Base from "./Base";
export default function Home() {
  return (
    <Base title="Home Page" description="Welcome to Hiyar Majhe">
      <h1 className="text-white">Hello Frontend</h1>
      <div className="row">
        <div className="col-4">
          <button className="btn-primary btn-lg">TEST</button>
        </div>
        <div className="col-4">
          <button className="btn-primary btn-lg">TEST</button>
        </div>
        <div className="col-4">
          <button className="btn-primary btn-lg">TEST</button>
        </div>
      </div>
    </Base>
  );
}
