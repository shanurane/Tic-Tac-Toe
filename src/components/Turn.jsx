import oimage from "../imgs/oimage.jpeg";
import ximage from "../imgs/ximage.jpeg";

const Turn = (props) => {
  return (
    <div className="w-10 h-10 m-3 bg-black flex items-center justify-center border-white border-2 rounded-full">
      <img
        src={oimage}
        alt="..."
        className={`w-full h-full p-2 rounded-full ${props.hiddn}`}
      />
      <img
        src={ximage}
        alt=""
        className={`w-full h-full p-3 rounded-full ${props.hidd}`}
      />
    </div>
  );
};

export default Turn;
