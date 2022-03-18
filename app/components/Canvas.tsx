import { FC } from 'react';

const Canvas: FC = ({ children }) => {
  return (
    <div className="border-green-200 rounded-md border-2 p-3">{children}</div>
  );
};

export default Canvas;
