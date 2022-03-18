import * as Sentry from '@sentry/react';
import { useSearchParams } from 'remix';

import Button from '~/components/Button';
import Canvas from '~/components/Canvas';
import SentryExample from '~/components/SentryExample';
import SlowUI from '~/components/SlowUI';

const SlowUIInstrumented = Sentry.withProfiler(SlowUI);

export default function PageA() {
  const [searchParams, setSearchParams] = useSearchParams();

  const part = searchParams.get('part') || 'fast';

  return (
    <div>
      <SentryExample
        samples={[
          {
            label: 'Page load',
            traceId: '6b99fdf2a6e8454ebcabe5fac916263b'
          },
          {
            label: 'Navigation',
            traceId: '382811e9388c41db868771c917a0c233'
          }
        ]}
      />

      <Canvas>
        <div className="flex justify-between">
          {part === 'fast' ? (
            <Button
              onClick={() => {
                setSearchParams({
                  part: 'slow'
                });
              }}
            >
              Show slow 🐢
            </Button>
          ) : (
            <Button
              onClick={() => {
                setSearchParams({
                  part: 'fast'
                });
              }}
            >
              Show fast 🐇
            </Button>
          )}

          <div className="animate-bounce rounded-xl bg-red-100 h-10 w-10" />
        </div>
        {part === 'fast' ? (
          <div className="flex rounded-md items-center justify-center bg-slate-100 h-14 mt-4">
            <h1 className="text-xl">No dashboard</h1>
          </div>
        ) : (
          <SlowUIInstrumented />
        )}
      </Canvas>
    </div>
  );
}
