import axios from "axios";
import { resizeFile } from "../../utils/functions";
import { Button, Modal, Form, Input, message } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import IncDecCounter from "../component/IncDecCounter";
import Loader from "../component/Loader";

const SinglePageUploadReceipt = ({ receiptConfig }) => {
  // const navigate = useNavigate();
  // const location = useLocation();
  const location = {};
  // const receiptConfig = {
  //   headerComponent: <>this is the header</>, // can pass header component
  //   title: "Upload Receipt",
  //   uploadImage: "Upload Image",
  //   receiptNo: "Receipt No.",
  //   receiptDate: "Receipt Date",
  //   receiptAmount: "Receipt Amount",
  //   purchaseUnit: "",
  //   minAmount: 500, // optional
  //   submit: "Submit", // if hasNextPage false then required
  //   skuRequired: false, // default // else false
  //   skuProducts: [
  //     {
  //       label: "Ensure",
  //       key: "ensure",
  //       value: 0,
  //     },
  //   ],
  //   successModal: true,
  //   uploadReceiptOnly: false,
  //   modalSuccess: (
  //     <>
  //       <img
  //         src="https://dwzg9hxy3ldn9.cloudfront.net/cmh_retention3/images/tickimage.png"
  //         alt="tick"
  //         className="submit-receipt-modal-tick"
  //       />
  //       <img
  //         src="https://dwzg9hxy3ldn9.cloudfront.net/cmh_retention3/images/close.png"
  //         alt="close"
  //         className="submit-receipt-modal-close"
  //         onClick={() => {
  //           // setShowModal(false);
  //           // your redirect url goes here
  //           // navigate(-2);
  //         }}
  //       />
  //       <h2 className="submit-receipt-modal-title">Upload Success</h2>
  //       <div className="submit-receipt-modal-text">Thank You Upload</div>
  //     </>
  //   ),
  // };

  const { skuProducts, skuRequired, uploadReceiptOnly, successModal } =
    receiptConfig;
  const uploadref = useRef();
  const [imageUrl, setImageUrl] = useState("");
  const [fileType, setFileType] = useState("");
  const [skuQtyExist, setSkuQtyExist] = useState(false);
  const [products, setProducts] = useState(skuProducts);
  const [checkImage, setCheckImage] = useState(false);
  const [number, setNumber] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!location.state?.number) {
      return message.error("Please login to proceed.", 10);
    }
    if (location.state?.number) {
      setNumber(location.state.number);
    }
  }, [location.state]);

  function changeQuantity(event, index) {
    let newQuantity = [...products];

    newQuantity[index].value = event; // 1
    setProducts(newQuantity);
  }

  // console.log('location.state', location.state);

  const onSubmit = (values) => {
    if (imageUrl) {
      if (skuRequired && !skuQtyExist) return;

      let newSku = {};
      const productsData = skuRequired
        ? skuProducts.forEach((each) => {
            newSku[each.key] = each.value;
          })
        : "";

      const allValues = {
        ...values,
        products: skuRequired ? newSku : "",
        number: number,
        uri: imageUrl,
        filetype: fileType,
      };

      // console.log("allValues", allValues);
      // redirect to next page
      axios
        .post("/api/upload/receipt", allValues)
        .then((res) => {
          if (successModal) {
            setShowModal(true);
          }
          setLoading(false);
        })
        .catch((err) => {
          message.error(err.response.data.error, 15);
          setLoading(false);
        });
    } else {
      if (!imageUrl) {
        setCheckImage(true);
      }
    }
  };

  useEffect(() => {
    if (!skuRequired) return;

    let total = 0;

    products.forEach((each) => {
      if (each.value > 0) {
        total += 1;
      }
    });

    if (total < 1) {
      setSkuQtyExist(false);
    } else {
      setSkuQtyExist(true);
    }
  }, [products, skuRequired]);

  const handleDisplayImage = async (e) => {
    const curFile = e.target.files[0];
    if (curFile) {
      const MAX_FILE_SIZE = 10120; // 10MB

      const fileSizeKiloBytes = curFile.size / MAX_FILE_SIZE;
      if (fileSizeKiloBytes > MAX_FILE_SIZE) {
        setCheckImage(true);
        return;
      }

      const resized = await resizeFile(curFile);

      setImageUrl(resized);
      setFileType(curFile.type);
      setCheckImage(false);
    }
  };

  return (
    <div>
      {receiptConfig.headerComponent ? receiptConfig.headerComponent : null}

      <div className="upload-receipt-content">
        <h2 className="upload-receipt-title">{receiptConfig.title || ""}</h2>

        {receiptConfig.receiptImageInNextPage ? null : (
          <div className="upload-receipt-input-item">
            <p className="upload-receipt-input-title">
              {receiptConfig.uploadImage || ""}
            </p>
            <div
              className="upload-receipt-input-file-box"
              onClick={() => uploadref.current.click()}
            >
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt="receipt"
                  className="uploaded-image-container"
                />
              ) : (
                <div className="upload-receipt-input-file-grid">
                  <div className="upload-receipt-input-file-textone">
                    Choose File
                  </div>
                  <div className="upload-receipt-input-file-texttwo">
                    No File Chosen
                  </div>
                </div>
              )}
              <input
                type="file"
                name="receiptImage"
                accept="image/*"
                ref={uploadref}
                onChange={(e) => handleDisplayImage(e)}
                style={{ width: "0px", height: "0px", opacity: "0" }}
                required
              />
            </div>
            {checkImage && (
              <span style={{ color: "#ff4d4f", fontSize: "14px" }}>
                Please upload your receipt image!
              </span>
            )}
          </div>
        )}

        <Form className="upload-receipt-form" onFinish={onSubmit}>
          {uploadReceiptOnly ? null : (
            <>
              <Form.Item
                name="invoiceNo"
                className="upload-receipt-input-item"
                rules={[
                  { required: true, message: "Please enter your receipt no!" },
                ]}
              >
                <div>
                  <label className="upload-receipt-input-title">
                    {receiptConfig.receiptNo || ""}
                    <Input className="upload-receipt-input-field" />
                  </label>
                </div>
              </Form.Item>
              <Form.Item
                name="receiptDate"
                className="upload-receipt-input-item"
                rules={[
                  {
                    required: true,
                    message: "Please enter your receipt date!",
                  },
                ]}
              >
                <div>
                  <label className="upload-receipt-input-title">
                    Receipt Date
                  </label>
                  <Input type="date" className="upload-receipt-input-field" />
                </div>
              </Form.Item>
              <Form.Item
                name="amount"
                className="upload-receipt-input-item"
                rules={[
                  {
                    required: true,
                    message: "Please enter your receipt amount!",
                  },
                  {
                    validator: (_, value) => {
                      if (receiptConfig.minAmount) {
                        if (value >= receiptConfig.minAmount) {
                          return Promise.resolve();
                        } else {
                          return Promise.reject(
                            new Error(
                              `Please enter an amount in minimum ${receiptConfig.minAmount}!`
                            )
                          );
                        }
                      }
                    },
                  },
                ]}
              >
                <div>
                  <label className="upload-receipt-input-title">
                    {receiptConfig.receiptAmount || ""}
                  </label>
                  <Input type="number" className="upload-receipt-input-field" />
                </div>
              </Form.Item>
              <p
                className="upload-receipt-input-title"
                style={{ margin: "15px 10%" }}
              >
                {receiptConfig.purchaseUnit || ""}
              </p>
              {skuRequired && skuProducts.length ? (
                <>
                  <div className="upload-receipt-purchase">
                    {products.map((sku, idx) => {
                      // console.log("sku", sku);
                      return (
                        <div key={idx}>
                          <div className="upload-receipt-purchase-grid">
                            <div>{sku.label}</div>
                            <div>
                              <IncDecCounter
                                num={sku.value}
                                setNum={(e) => changeQuantity(e, idx)}
                              />
                            </div>
                          </div>
                          <hr
                            style={{
                              backgroundColor: "#888B8D",
                              borderWidth: "0.1px",
                              margin: "12px 0px 12px -10px",
                            }}
                          />
                        </div>
                      );
                    })}
                  </div>
                  {/* if don't need this can comment out this block of code */}
                  {!skuQtyExist && (
                    <span
                      style={{
                        color: "#ff4d4f",
                        fontSize: "14px",
                        margin: "0px 10%",
                      }}
                    >
                      Please add at least one purchased unit!
                    </span>
                  )}
                </>
              ) : null}
            </>
          )}
          {receiptConfig.addElement ? receiptConfig.addElement : ""}

          <Loader
            isLoading={loading}
            component={
              <Button
                type="primary"
                htmlType="submit"
                className="submit-receipt-submit-button-single"
                onClick={onSubmit}
              >
                {receiptConfig.submit || "Submit"}
              </Button>
            }
          />
        </Form>
      </div>

      <Modal
        open={showModal}
        footer={null}
        closable={false}
        className="submit-receipt-modal"
        centered
      >
        {receiptConfig.modalSuccess ? receiptConfig.modalSuccess : null}
      </Modal>
    </div>
  );
};

export default SinglePageUploadReceipt;