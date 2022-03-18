const SlowButton: React.FC<{ traceId: string }> = ({ traceId, children }) => {
  return (
    <a
      className="text-xs hover:underline"
      target="_blank"
      href={`https://sentry.io/organizations/adverity-trial/performance/trace/${traceId}/?`}
      rel="noreferrer"
    >
      {children}
    </a>
  );
};

export default SlowButton;
