import type { User } from '@prisma/client';
import { LoaderFunction, useLoaderData } from 'remix';

import Canvas from '~/components/Canvas';
import SentryExample from '~/components/SentryExample';

interface LoaderData {
  users: User[];
}

const ARTIFICAL_DELAY = 2000;

export const loader: LoaderFunction = async () => {
  return fetch(`http://localhost:3000/users?delay=${ARTIFICAL_DELAY}`);
};

function Index() {
  const { users } = useLoaderData<LoaderData>();

  return (
    <div>
      <SentryExample
        samples={[
          {
            label: 'Page load',
            traceId: '209441fa13914aceb396de521a5b5cd0'
          },
          {
            label: 'Navigation',
            traceId: '7a42016f828044dd98b1f41eee8e0f40'
          }
        ]}
      />

      <Canvas>
        <h2>
          Server side fetched data (artificial delay: {ARTIFICAL_DELAY}ms):
        </h2>
        <pre className="w-full h-full border-2 border-gray-300 p-2 mt-3 border-dashed rounded-md">
          {JSON.stringify(users, null, ' ')}
        </pre>
      </Canvas>
    </div>
  );
}

export default Index;
