import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

const ButtonLoader = ({ isLoading, component }) => {
  if (isLoading) {
    return (
      <div className="text-center">
        <Spin indicator={<LoadingOutlined style={{ fontSize: "30" }} spin />} />
      </div>
    );
  } else {
    return component;
  }
};

export default ButtonLoader;
