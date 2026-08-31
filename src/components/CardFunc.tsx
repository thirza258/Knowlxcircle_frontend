type CardFuncProps = {
  title: string;
};

const CardFunc = ({ title }: CardFuncProps) => {
  return (
    <div className="card py-20 mx-10 items-center rounded-[6px] shadow-lg">
      <h2 className="primary-nav title">{title}</h2>
    </div>
  );
};

export default CardFunc;
