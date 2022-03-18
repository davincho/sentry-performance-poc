import type { User } from '@prisma/client';
import { LoaderFunction, useLoaderData } from 'remix';

interface LoaderData {
  users: User[];
}

const ARTIFICAL_DELAY = 3000;

export const loader: LoaderFunction = async () => {
  return fetch(`http://localhost:3000/users?delay=${ARTIFICAL_DELAY}`);
};

function Index() {
  const { users } = useLoaderData<LoaderData>();

  return (
    <div>
      <h2>Server side fetched data (delay: {ARTIFICAL_DELAY}ms):</h2>
      <pre className="w-full h-full border-2 border-gray-300 p-2 mt-3">
        {JSON.stringify(users, null, ' ')}
      </pre>
    </div>
  );
}

export default Index;
