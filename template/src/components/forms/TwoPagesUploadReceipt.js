// import Header from "../components/header";
// import "./view.css";
import { resizeFile } from "../../utils/functions";
import { Button, Form, Input, message } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import IncDecCounter from "../component/IncDecCounter";

const receiptConfig = {
  headerComponent: <>this is the header</>, // can pass header component
  title: "Upload Receipt",
  uploadImage: "Upload Image",
  receiptNo: "Receipt No.",
  receiptDate: "Receipt Date",
  receiptAmount: "Receipt Amount",
  purchaseUnit: "Purchase Unit",
  minAmount: 500, // optional
  next: "Next", // if
  submit: "Submit", // if hasNextPage false then required
  skuRequired: true, // default // else false
  receiptImageInNextPage: true, // default false
  skuProducts: [
    // not required if uploadReceiptOnly: true
    {
      label: "Ensure",
      key: "ensure",
      value: 0,
    },
    {
      label: "Glucerna",
      key: "glucerna",
      value: 0,
    },
    {
      label: "Isomil Plus",
      key: "iso",
      value: 0,
    },
    {
      label: "Pediasure",
      key: "pediasure",
      value: 0,
    },
    {
      label: "Similac Total Comfort",
      key: "stc",
      value: 0,
    },
    {
      label: "Similac Gain Kid",
      key: "simKid",
      value: 0,
    },
  ],
};

const TwoPagesUploadReceipt = ({ receiptConfig }) => {
  const navigate = useNavigate();
  const location = useLocation();
  // const location = {};
  const {
    skuProducts,
    skuRequired,
    uploadReceiptOnly,
    receiptImageInNextPage,
  } = receiptConfig;
  const uploadRef = useRef();
  const [imageUrl, setImageUrl] = useState("");
  const [fileType, setFileType] = useState("");
  const [skuQtyExist, setSkuQtyExist] = useState(false);
  const [products, setProducts] = useState(skuProducts);
  const [checkImage, setCheckImage] = useState(false);
  const [number, setNumber] = useState("");

  useEffect(() => {
    if (!location.state?.number) {
      return message.error("Please login to proceed.", 20);
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
      setCheckImage(false);

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
        uri: receiptImageInNextPage ? "" : imageUrl,
        filetype: receiptImageInNextPage ? "" : fileType,
        receiptImageInNextPage,
      };
      // redirect to next page
      // add redirect to next page url
      navigate("/submit/receipt", {
        state: { ...location.state, ...allValues },
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

  const checkRequire = () => {
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

    if (imageUrl && !receiptConfig.receiptImageInNextPage) {
      setCheckImage(false);
    } else {
      setCheckImage(true);
    }
  };

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
              onClick={() => uploadRef.current.click()}
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
                ref={uploadRef}
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

          <Form.Item style={{ margin: "30px 10%" }}>
            <Button
              type="primary"
              htmlType="submit"
              className="upload-receipt-submit-button"
              onClick={checkRequire}
            >
              {receiptConfig.receiptImageInNextPage
                ? receiptConfig.next
                : receiptConfig.submit}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default TwoPagesUploadReceipt;
