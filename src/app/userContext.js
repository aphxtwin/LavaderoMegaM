"use client";
import React from "react";

const context = React.createContext({
  userContext: {},
  setUserContext: (value) => {},
});

export { context };
