import { useSelector } from "react-redux";
const Success = () => {
  const { message } = useSelector((state) => state.message);
  return (
    <div>
      <h1 className="heading"> {message} </h1>
    </div>
  );
};

export default Success;
