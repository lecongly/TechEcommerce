const Loader = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="lds-ripple">
        <div className="border-4 border-black rounded-full"></div>
        <div className="border-4 border-black rounded-full"></div>
      </div>
    </div>
  );
};

export default Loader;
