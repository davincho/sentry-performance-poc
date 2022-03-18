import { LoaderFunction } from 'remix';

export const loader: LoaderFunction = async ({ params }) => {
  const res = await fetch(`http://localhost:3002/users/${params.id}`);

  return res.json();
};
