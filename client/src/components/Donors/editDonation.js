import React, { useEffect, useState } from "react";
import Stepper from "bs-stepper";
import StepperHeader from "../Common/Stepper/stepperHeader";
import StepperContent from "../Common/Stepper/stepperContent";
import StepperDate from "../Common/Stepper/stepperDate";
import StepperTextArea from "../Common/Stepper/stepperTextArea";

import DonorService from "../../services/donor.service";
import StepperCheckbox from "../Common/Stepper/stepperCheckbox";
import axios from "axios";

export default function EditDonation(props) {
  const [donation, setDonation] = useState({
    donorId: "",
    receivedById: "",

    donorName: "",
    amount: 0,
    date: "",
    receivedBy: "",

    isCheque: false,
    iban: "",
    bankName: "",
    branchAddress: "",
    chequeImage:
      "https://www.thedome.org/wp-content/uploads/2019/06/300x300-Placeholder-Image.jpg",
  });

  const [stepper, setStepper] = useState(0);
  const [dummyState, rerender] = React.useState(1);

  const headers = [
    {
      target: "#donor-part",
      name: "Background Information",
    },
    {
      target: "#submit-part",
      name: "Submit",
    },
  ];

  useEffect(() => {
    const stepperEl = document.querySelector("#stepper1");
    setStepper(
      new Stepper(stepperEl, {
        linear: false,
        animation: true,
      })
    );
    const id = props.match.params.id;
    DonorService.getDonation(id).then((res) => {
      console.log(res);
      setDonation(res.data);
    });
  }, [dummyState]);

  const [file, setFile] = React.useState("");

  const nextStepper = () => {
    stepper.next();
  };

  const previousStepper = () => {
    stepper.previous();
  };
  // Handles file Upload
  const handleUpload = (event) => {
    setFile(event.target.files[0]);
  };

  // Handles file upload to Server
  const handleServer = async (event) => {
    const { data: CLOUDINARY_URL } = await axios.get("/cloudinary/url");

    const { data: CLOUDINARY_UPLOAD_PRESET } = await axios.get(
      "/cloudinary/preset"
    );
    // const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    await axios({
      url: CLOUDINARY_URL,
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: formData,
    })
      .then(function (res) {
        setDonation({ ...donation, chequeImage: res.data.url });
      })
      .catch(function (err) {
        console.error(err);
      });
  };

  const updateDonation = (event) => {
    event.preventDefault();
    const id = props.match.params.id;
    DonorService.updateDonation(id, donation).then(
      (res) => {
        alert("Donation Updated Successfully");
        props.history.push("/finance/edit-donation/" + id);
        rerender(dummyState + 1);
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        alert(resMessage);
      }
    );
  };

  return (
    <div className="content-wrapper">
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Edit Donation </h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <a href="/finance"> Home </a>
                </li>
                <li className="breadcrumb-item active">Edit Donation </li>
              </ol>
            </div>
          </div>
        </div>
      </section>
      <section className="content">
        <div className="row">
          <div className="col-md-12">
            <div className="card card-default">
              <div className="card-header">
                <h3 className="card-title">Donation</h3>
              </div>
              <div className="card-body p-0">
                <div className="bs-stepper" id="stepper1">
                  <StepperHeader headers={headers} />
                  <div className="bs-stepper-content">
                    <div id="donor-part" className="content" role="tabpanel">
                      <div className="row">
                        <div className="col-md-6">
                          <StepperContent
                            name={"Donor Name"}
                            value={donation.donorName}
                            placeholder={"Name"}
                          />
                          <StepperContent
                            name={"Amount"}
                            placeholder={"Amount"}
                            value={donation.amount}
                            onChange={(e) =>
                              setDonation({
                                ...donation,
                                amount: e.target.value,
                              })
                            }
                          />
                          <StepperDate
                            name={"Date"}
                            value={donation.date}
                            onChange={(e) =>
                              setDonation({
                                ...donation,
                                date: e.target.value.toString(),
                              })
                            }
                          />
                          <StepperContent
                            name={"Received By"}
                            placeholder={"Received By"}
                            value={donation.receivedBy}
                          />
                          <StepperCheckbox
                            name={"Cheque"}
                            value={donation.isCheque}
                            onChange={(e) =>
                              setDonation({
                                ...donation,
                                isCheque: e.target.checked,
                              })
                            }
                          />
                        </div>
                        <div className="col-md-6">
                          <div class="Container">
                            <StepperContent
                              name={"Bank Name"}
                              placeholder={"Bank Name"}
                              value={donation.bankName}
                              disabled={donation.isCheque ? false : true}
                              onChange={(e) =>
                                setDonation({
                                  ...donation,
                                  bankName: e.target.value,
                                })
                              }
                            />
                            <StepperContent
                              name={"IBAN"}
                              placeholder={"IBAN"}
                              value={donation.iban}
                              disabled={donation.isCheque ? false : true}
                              onChange={(e) =>
                                setDonation({
                                  ...donation,
                                  iban: e.target.value,
                                })
                              }
                            />
                            <StepperTextArea
                              name={"Address"}
                              placeholder={"Address"}
                              value={donation.branchAddress}
                              disabled={donation.isCheque ? false : true}
                              onChange={(e) =>
                                setDonation({
                                  ...donation,
                                  branchAddress: e.target.value,
                                })
                              }
                            />
                          </div>
                        </div>
                      </div>
                      <button className="btn btn-primary" onClick={nextStepper}>
                        Next
                      </button>
                    </div>
                    <div id="submit-part" className="content" role="tabpanel">
                      <div className="row">
                        <div className="col-md-12">
                          <div className="box-profile">
                            <div className="text-center">
                              <img
                                src={donation.chequeImage}
                                alt="cheque"
                                style={{ width: 600, height: 400 }}
                                disabled={donation.isCheque ? false : true}
                              />
                            </div>
                          </div>
                          <div className="form-group">
                            <label> File input </label>
                            <div className="input-group">
                              <div className="custom-file">
                                <input
                                  type="file"
                                  className="custom-file-input"
                                  id="exampleInputFile"
                                  onChange={handleUpload}
                                  disabled={donation.isCheque ? false : true}
                                />
                                <label className="custom-file-label">
                                  {file ? file.name : "Choose File"}
                                </label>
                              </div>

                              <div className="input-group-append">
                                <span
                                  className="input-group-text"
                                  onClick={handleServer}
                                >
                                  {" "}
                                  Upload{" "}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <button
                        className="btn btn-primary"
                        onClick={previousStepper}
                      >
                        Previous
                      </button>
                      <button
                        className="btn btn-primary"
                        style={{ margin: 5 }}
                        type="button"
                        onClick={updateDonation}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-footer" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
