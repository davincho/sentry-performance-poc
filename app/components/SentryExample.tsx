import SentryLink from './SentryLink';

const SlowButton: React.FC<{
  samples: {
    label: string;
    traceId: string;
  }[];
}> = ({ samples }) => {
  return (
    <div className="border-blue-400 bg-blue-100 rounded-md p-3 text-xs my-2">
      <div className="font-bold">🐾&nbsp;&nbsp;Sentry example traces </div>
      {samples.map(({ label, traceId }) => (
        <div key={traceId}>
          {label}:&nbsp;&nbsp;
          <SentryLink traceId={traceId}>{traceId}</SentryLink>
        </div>
      ))}
    </div>
  );
};

export default SlowButton;
