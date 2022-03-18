import { LoaderFunction } from 'remix';

export const loader: LoaderFunction = async ({ params, request }) => {
  const res = await fetch(
    `http://localhost:3002/users/${params.id}${new URL(request.url).search}`
  );

  return res.json();
};
