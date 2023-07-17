'use client'
import { context } from "../userContext";

export default function Dashboard() {
  return (
    <context.Consumer>
      {({ userContext }) => (
        <div>
          Dashboard
          <div>usuario - {userContext.name}</div>
        </div>
      )}
    </context.Consumer>
  );
}
