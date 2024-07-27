import Navbar from "./Navbar";
import axios from "axios";
import { useEffect, useState } from "react";

const Chatbot = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-grow p-2">
        <div className="w-[20vw]">
          <div className="text-black p-3">
            <p>User</p>
            <p>Role</p>
          </div>
          <div className="text-center p-2">
            <div className="horizontal-line"></div>
            <h1 className="text-base">Prompt Title</h1>
            <div className="horizontal-line"></div>
          </div>
        </div>

        <div className="border-l-2 border-black h-auto"></div>

        <div className="w-[80vw]">
          <div className="p-3">
            <div className="horizontal-line"></div>
            <h1 className="text-base text-right">Prompt Title</h1>
            <div className="horizontal-line"></div>
          </div>
          <div className="px-3">
            <div className="horizontal-line"></div>
            <h1 className="text-sm">Prompt Title</h1>
            <div className="horizontal-line"></div>
          </div>
          <div className="bottom-0 left-0 right-0 p-4">
        <input
          type="text"
          className="text-black w-full px-4 py-2 border border-black bg-white rounded-lg"
          placeholder="Generate Prompt"
        />
    </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
