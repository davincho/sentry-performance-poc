import type { User } from '@prisma/client';
import { LoaderFunction, json } from 'remix';

interface LoaderData {
  users: User[];
}

export const loader: LoaderFunction = async ({ request }) => {
  const res = await fetch(
    `http://localhost:3002/users${new URL(request.url).search}`
  );

  const data: LoaderData = {
    users: await res.json()
  };

  return json(data);
};
