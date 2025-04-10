type ErrorProps = {
  error: string;
};

export const Error = ({ error }: ErrorProps) => {
  return (
    <div className="error-container">
      <div className="error-message">{error}</div>
    </div>
  );
};
