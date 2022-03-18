const Button = (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      {...props}
      className="border-2 border-gray-300 p-2 rounded-md hover:bg-gray-50"
    />
  );
};

export default Button;
