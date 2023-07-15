"use client";
import { context } from "../userContext";
export default function Dashboard() {
  return (
    <div>
      Dashboard
      <context.Consumer>
        {({ userContext }) => <div>usuario - {userContext}</div>}
      </context.Consumer>
    </div>
  );
}
