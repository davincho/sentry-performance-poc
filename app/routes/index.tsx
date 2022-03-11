import React from "react";

import type { User } from "@prisma/client";
import * as Sentry from "@sentry/react";
import { Link, LoaderFunction, useLoaderData, json } from "remix";

import { db } from "~/utils/db.server";

interface LoaderData {
  users: User[];
}

export const loader: LoaderFunction = async () => {
  const data: LoaderData = {
    users: await db.user.findMany(),
  };
  return json(data);
};

function mySlowFunction(baseNumber: number) {
  console.time("mySlowFunction");
  let result = 0;
  for (let i = Math.pow(baseNumber, 7); i >= 0; i--) {
    result += Math.atan(i) * Math.tan(i);
  }
  console.timeEnd("mySlowFunction");
}

function Index() {
  const data = useLoaderData<LoaderData>();
  const [time, setTime] = React.useState(new Date().getTime());

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <button
        onClick={() => {
          const t: any = {};

          mySlowFunction(10);

          t.a.g();

          setTime(new Date().getTime());
        }}
      >
        Click Me! 💣 - {time}
      </button>

      <Link to="/pagea">PageA</Link>
    </div>
  );
}

export default Sentry.withProfiler(Index, { name: "Davncho" });
