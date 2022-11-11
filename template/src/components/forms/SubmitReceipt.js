import { Button, Modal, message } from "antd";
import { resizeFile } from "../../utils/functions";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import Loader from "../component/Loader";
const receiptConfig = {
  headerComponent: <>this is the header component</>,
  title: "Submit Receipt",
  uploadImage: "Upload Image",
  btnText: "Submit", // if hasNextPage false then required
  receiptDescription: "",
  preview: "Upload Preview",
  uploadBtnText: "Reupload",
  addElement: (
    <>
      <div className="submit-receipt-make-sure">
        <div>Make Sure</div>
        <div className="submit-receipt-make-sure-grid">
          <img
            src="https://dwzg9hxy3ldn9.cloudfront.net/cmh_retention3/images/tick.png"
            alt="tick"
          />
          <div>frame cover</div>
        </div>
        <div className="submit-receipt-make-sure-grid">
          <img
            src="https://dwzg9hxy3ldn9.cloudfront.net/cmh_retention3/images/tick.png"
            alt="tick"
          />
          <div>seen clearly</div>
        </div>
      </div>
    </>
  ),
  successModal: true,
};
const SubmitReceipt = ({ receiptConfig }) => {
  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  // const location = useLocation();
  const location = {};
  const uploadRef = useRef();
  const [imageUrl, setImageUrl] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fileType, setFileType] = useState("");

  // console.log("lxocation.state", location.state);

  useEffect(() => {
    if (!location.state?.number) {
      return message.error("Please login to proceed.", 10);
    }
    if (location.state?.uri) {
      setImageUrl(location.state.uri);
    } else {
      setImageUrl("");
    }
  }, [location.state]);

  const onFinish = () => {
    setLoading(true);
    if (!location.state?.number) {
      return message.error("Please login to proceed.", 15);
    }

    let data = { ...location.state };
    if (imageUrl) {
      data.uri = imageUrl;
      data.fileType = fileType;
    }

    const uploadData = {
      ...data,
    };
    // console.log("uploadData", uploadData);
    //
    axios
      .post("/api/upload/receipt", uploadData)
      .then((res) => {
        if (receiptConfig.successModal) {
          setShowModal(true);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        message.error(err.response.data.error, 10);
        setLoading(false);
      });
  };

  const handleDisplayImage = async (e) => {
    const curFile = e.target.files[0];
    if (curFile) {
      const MAX_FILE_SIZE = 10120; // 10MB

      const fileSizeKiloBytes = curFile.size / MAX_FILE_SIZE;
      if (fileSizeKiloBytes > MAX_FILE_SIZE) {
        return;
      }

      const resized = await resizeFile(curFile);
      setImageUrl(resized);
      setFileType(curFile.type);
    }
  };

  return (
    <div>
      {/* the head component goes here  */}
      {receiptConfig.headerComponent ? receiptConfig.headerComponent : null}
      <div className="submit-receipt-content">
        <h2 className="submit-receipt-title">{receiptConfig.title || ""}</h2>
        <div className="submit-receipt-input-title">
          {receiptConfig.preview || ""}
        </div>
        <div className="submit-receipt-preview-box">
          <img
            src={imageUrl}
            alt="receipt"
            className="uploaded-image-container"
          />
          <div
            className="submit-receipt-reupload"
            onClick={() => uploadRef.current.click()}
          >
            {receiptConfig.uploadBtnText || ""}
          </div>
          <form style={{ width: "0px", height: "0px" }}>
            <input
              type="file"
              name="receiptImage"
              accept="image/jpg,image/jpeg,image/png"
              ref={uploadRef}
              onChange={(e) => handleDisplayImage(e)}
              style={{ width: "0px", height: "0px", opacity: "0" }}
            />
          </form>
        </div>
        {/* any info to display */}
        {receiptConfig.addElement ? receiptConfig.addElement : ""}

        <Button
          loading={loading}
          block
          type="primary"
          htmlType="submit"
          className="submit-receipt-submit-button"
          onClick={onFinish}
          id="submit-btn"
        >
          {receiptConfig.btnText || "Submit"}
        </Button>
      </div>
      <Modal
        open={showModal}
        footer={null}
        closable={false}
        className="submit-receipt-modal"
        centered
      >
        <>
          <img
            src="https://dwzg9hxy3ldn9.cloudfront.net/cmh_retention3/images/tickimage.png"
            alt="tick"
            className="submit-receipt-modal-tick"
          />
          <img
            src="https://dwzg9hxy3ldn9.cloudfront.net/cmh_retention3/images/close.png"
            alt="close"
            className="submit-receipt-modal-close"
            // your redirect url goes here
            // onClick={() => navigate(-2)}
          />
          <h2 className="submit-receipt-modal-title">Upload Success</h2>
          <div className="submit-receipt-modal-text">Thank You Upload</div>
        </>
      </Modal>
    </div>
  );
};

export default SubmitReceipt;
