interface BackdropProps {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}
const Backdrop = ({ children, onClick }: BackdropProps) => {
  return (
    <div
      className="w-full h-full bg-black bg-opacity-50 flex items-center justify-center fixed top-0 left-0 z-50"
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Backdrop;
