// @ts-nocheck
import React, { useEffect, useRef, useState } from "react";
import { AiFillCar, AiOutlinePlusCircle, AiOutlineRight } from "react-icons/ai";
import { BiWallet } from "react-icons/bi";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Form,
  FormGroup,
  FormLabel,
  FormControl,
  FormText,
} from "react-bootstrap";
import { FaBluetooth, FaMap } from "react-icons/fa";
import { RiGpsFill } from "react-icons/ri";
import { GiUsbKey } from "react-icons/gi";
import { HiVideoCamera } from "react-icons/hi";
import FormCheckInput from "react-bootstrap/esm/FormCheckInput";
import * as Yup from "yup";
import vehicleApi from "api/vehicleApi";
import { useSelector } from "react-redux";
import {
  changeData,
  changeFuelConsumption,
  changeLicensePlates,
  changeModel,
  changeType,
} from "app/slice/registerSlice";
import store from "app/store";

export default function RegisterVehicleFirst() {
  const register = useSelector((state) => state.register);
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [licensePlates, setLicensePlates] = useState("");
  const [fuelConsumption, setFuelConsumption] = useState(0);
  const [description, setDescription] = useState("");
  const refForm = useRef(null);

  const handleChangeFuelType = (evt) => {
    store.dispatch(changeData({ name: "fuelType", data: evt.target.value }));
  };
  const handleChangeYom = (evt) => {
    console.log(evt.target.value);
    store.dispatch(changeData({ name: "yom", data: evt.target.value }));
  };
  const handleChangeBikeType = (evt) => {
    store.dispatch(
      changeData({ name: "transmission", data: evt.target.value })
    );
  };
  const handleChangeTransmission = (evt) => {
    store.dispatch(
      changeData({ name: "transmission", data: evt.target.value })
    );
  };
  const handleChangeCarType = (evt) => {
    store.dispatch(changeData({ name: "carType", data: evt.target.value }));
  };
  const handleChangeFuelConsumption = () => {
    store.dispatch(changeFuelConsumption(fuelConsumption));
  };
  const handleChangeDescription = () => {
    store.dispatch(changeData({ name: "description", data: description }));
  };
  const handleChangeBluetooth = (evt) => {
    store.dispatch(changeData({ name: "bluetooth", data: evt.target.checked }));
  };
  const handleChangeReverseCamera = (evt) => {
    store.dispatch(
      changeData({ name: "reverseCamera", data: evt.target.checked })
    );
  };
  const handleChangeGps = (evt) => {
    store.dispatch(changeData({ name: "gps", data: evt.target.checked }));
  };
  const handleChangeUsb = (evt) => {
    store.dispatch(changeData({ name: "usb", data: evt.target.checked }));
  };
  const handleChangeLicensePlates = () => {
    store.dispatch(changeLicensePlates(licensePlates));
  };
  const handleChangeModel = (evt) => {
    const id = evt.target.value;
    const model = models.filter((item) => {
      return +item.id === +id;
    });
    const value = model.length ? model[0] : { id: 0 };
    store.dispatch(changeModel(value));
  };
  const handleChangeBrand = (evt) => {
    const id = evt.target.value;
    const item = brands.filter((item) => {
      return +item.id === +id;
    });
    // console.log(item);
    setModels(item[0].category);
  };
  const handleChangeType = (evt) => {
    const type = evt.target.value;
    refForm.current.reset();
    store.dispatch(changeType(type));
  };
  useEffect(() => {
    vehicleApi.getBrands().then((res) => {
      setBrands(res.data);
    });
  }, []);
  return (
    <>
      <div id="nav-control">
        <ul>
          <li>
            <Link to="/myvehicles">
              <span>
                <i>
                  <AiFillCar />
                </i>
                <span>Danh s??ch xe</span>
              </span>
            </Link>
          </li>
          <li>
            <Link to="/registermode" className="border-left">
              <span style={{ color: "#00a54f" }}>
                <i>
                  <AiOutlinePlusCircle />
                </i>
                <span>????ng k?? xe</span>
              </span>
            </Link>
          </li>
          <li>
            <Link to="/mywallet" className="border-left">
              <span>
                <i>
                  <BiWallet />
                </i>
                <span>
                  S??? d??: <span id="line-bold">0??</span>
                </span>
              </span>
            </Link>
          </li>
        </ul>
      </div>
      <div className="register-vehicle">
        <div className="register-heading">
          <Row>
            <Col lg={4} className="register-heading-tab">
              <div
                className="tab-number"
                style={{ backgroundColor: "#00A54F" }}
              >
                1
              </div>
              <p>Th??ng tin</p>
              <i className="icon-after">
                <AiOutlineRight />
              </i>
            </Col>
            <Col lg={4} className="register-heading-tab">
              <div className="tab-number">2</div>
              <p>Cho thu??</p>
              <i className="icon-after">
                <AiOutlineRight />
              </i>
            </Col>
            <Col lg={4} className="register-heading-tab">
              <div className="tab-number">3</div>
              <p>H??nh ???nh</p>
            </Col>
          </Row>
        </div>
        <div className="register-body mt-2">
          <Form ref={refForm} className="register-form" id="register-form">
            <Row>
              <Col>
                <FormLabel muted>Lo???i xe ????ng k??</FormLabel>
                <Form.Select
                  size="lg"
                  aria-label="Default select example"
                  value={register.type}
                  onChange={handleChangeType}
                >
                  <option value="0">---Ch???n lo???i xe---</option>
                  <option value="bike">Xe m??y</option>
                  <option value="car">?? t?? t??? l??i</option>
                  <option value="withDriver">?? t?? c?? t??i x???</option>
                </Form.Select>
              </Col>
              {register.type !== "0" ? (
                <Col>
                  <FormGroup className="mb-3">
                    <FormLabel>Bi???n s??? xe</FormLabel>
                    <FormControl
                      type="text"
                      onChange={(evt) => {
                        setLicensePlates(evt.target.value);
                      }}
                      onBlur={handleChangeLicensePlates}
                      defaultValue={register.data.licensePlates}
                    />
                    <FormText className="text-danger">
                      {register.error.filter((item) => {
                        return item === "licensePlates";
                      }).length
                        ? "Vui l??ng nh???p bi???n s???"
                        : null}
                    </FormText>
                  </FormGroup>
                </Col>
              ) : null}
            </Row>
            {register.type !== "0" ? (
              <>
                <FormGroup className="mb-3">
                  <FormLabel>Th??ng tin c?? b???n</FormLabel>
                  <Row>
                    <Col lg={6}>
                      <FormText muted>H??ng xe</FormText>
                      <FormGroup>
                        <select
                          className="form-select form-select-md mb-3"
                          onChange={handleChangeBrand}
                        >
                          <option>Ch???n h??ng xe</option>
                          {brands.length ? (
                            <>
                              {register.type === "bike"
                                ? brands
                                    .filter((item) => {
                                      return item.bike_production;
                                    })
                                    .map((item, index) => {
                                      return (
                                        <option key={index} value={item.id}>
                                          {item.name}
                                        </option>
                                      );
                                    })
                                : brands
                                    .filter((item) => {
                                      return item.car_production;
                                    })
                                    .map((item, index) => {
                                      return (
                                        <option key={index} value={item.id}>
                                          {item.name}
                                        </option>
                                      );
                                    })}
                            </>
                          ) : null}
                        </select>
                      </FormGroup>
                    </Col>
                    <Col lg={6} className="mb-3">
                      <FormText muted>M???u xe</FormText>
                      <FormGroup>
                        <select
                          className="form-select form-select-md"
                          onChange={handleChangeModel}
                        >
                          <option value="0">{register.data.model.name||"---Ch???n---"}</option>
                          {models.length ? (
                            <>
                              {register.type === "bike"
                                ? models
                                    .filter((item) => {
                                      return !item.car_production;
                                    })
                                    .map((item, index) => {
                                      return (
                                        <option key={index} value={item.id}>
                                          {item.name}
                                        </option>
                                      );
                                    })
                                : models
                                    .filter((item) => {
                                      return item.car_production;
                                    })
                                    .map((item, index) => {
                                      return (
                                        <option key={index} value={item.id}>
                                          {item.name}
                                        </option>
                                      );
                                    })}
                            </>
                          ) : null}
                        </select>
                      </FormGroup>
                      <FormText className="text-danger">
                        {register.error.filter((item) => {
                          return item === "model";
                        }).length
                          ? "Vui l??ng ch???n m???u xe"
                          : null}
                      </FormText>
                    </Col>

                    <Col lg={6}>
                      <FormText muted>Lo???i nhi??n li???u</FormText>
                      <FormGroup>
                        <select
                          className="form-select form-select-md mb-3"
                          onChange={handleChangeFuelType}
                          defaultValue={register.data.fuelType}
                        >
                          <option value="X??ng">X??ng</option>
                          <option value="D???u">D???u diesel</option>
                          <option value="??i???n">??i???n</option>
                        </select>
                      </FormGroup>
                    </Col>
                    <Col lg={6}>
                      <FormText muted>N??m s???n xu???t</FormText>
                      <FormGroup>
                        <select
                          className="form-select form-select-md mb-3"
                          onChange={handleChangeYom}
                          defaultValue={register.data.yom}
                        >
                          <option value="2017">2017</option>
                          <option value="2018">2018</option>
                          <option value="2019">2019</option>
                          <option value="2020">2020</option>
                          <option value="2021">2021</option>
                        </select>
                      </FormGroup>
                    </Col>
                    {register.type === "bike" ? (
                      <Col lg={6}>
                        <FormText muted>Lo???i xe m??y</FormText>
                        <FormGroup>
                          <select
                            className="form-select form-select-md mb-3"
                            onChange={handleChangeBikeType}
                            defaultValue={register.data.bikeType}
                          >
                            <option value="Xe s???">Xe s???</option>
                            <option value="Xe ga">Xe ga</option>
                            <option value="Xe c??n">Xe c??n</option>
                          </select>
                        </FormGroup>
                      </Col>
                    ) : (
                      <>
                        <Col lg={6}>
                          <FormText muted>Truy???n ?????ng</FormText>
                          <FormGroup>
                            <select
                              className="form-select form-select-md mb-3"
                              onChange={handleChangeTransmission}
                              defaultValue={register.data.transmission}
                            >
                              <option value="S??? t??? ?????ng">S??? t??? ?????ng</option>
                              <option value="S??? s??n">S??? s??n</option>
                            </select>
                          </FormGroup>
                        </Col>
                        <Col lg={6}>
                          <FormText muted>Lo???i xe ?? t??</FormText>
                          <FormGroup>
                            <select
                              className="form-select form-select-md mb-3"
                              onChange={handleChangeCarType}
                              defaultValue={register.data.carType}
                            >
                              <option value="1">Mini</option>
                              <option value="2">Sedan</option>
                              <option value="3">Hatchback</option>
                              <option value="4">5 ch???</option>
                              <option value="5">7 ch???</option>
                              <option value="6">7 ch??? g???m cao</option>
                              <option value="7">B??n t???i</option>
                            </select>
                          </FormGroup>
                        </Col>
                      </>
                    )}
                  </Row>
                </FormGroup>
                <FormGroup className="mb-3">
                  <FormLabel>M???c ti??u th??? nhi??n li???u</FormLabel> <br />
                  <FormText muted>
                    S??? l??t nhi??n li???u cho qu??ng ???????ng 100km.
                  </FormText>
                  <FormControl
                    type="number"
                    onChange={(evt) => {
                      setFuelConsumption(+evt.target.value);
                    }}
                    onBlur={handleChangeFuelConsumption}
                    defaultValue={register.data.fuelConsumption}
                  />
                  <FormText className="text-danger">
                    {register.error.filter((item) => {
                      return item === "fuelConsumption";
                    }).length
                      ? "Vui l??ng nh???p m???c ti??u th??? nhi??n li???u"
                      : null}
                  </FormText>
                </FormGroup>
                <FormGroup className="mb-3">
                  <FormLabel>M?? t???</FormLabel> <br />
                  <textarea
                    rows={3}
                    onChange={(evt) => {
                      setDescription(evt.target.value);
                    }}
                    onBlur={handleChangeDescription}
                    defaultValue={register.data.description}
                  ></textarea>
                </FormGroup>
                {register.type !== "bike" ? (
                  <FormGroup className="mb-3">
                    <FormLabel>T??nh n??ng</FormLabel>
                    <Row>
                      <Col lg={6} className="mb-3">
                        <FormCheckInput
                          type="checkbox"
                          onChange={handleChangeBluetooth}
                          defaultChecked={register.data.bluetooth}
                        />
                        <span>
                          <i className="icon-tools">
                            <FaBluetooth />
                          </i>
                          Bluetooth
                        </span>
                      </Col>
                      <Col lg={6} className="mb-3">
                        <FormCheckInput
                          type="checkbox"
                          onChange={handleChangeGps}
                          defaultChecked={register.data.gps}
                        />
                        <span>
                          <i className="icon-tools">
                            <RiGpsFill />
                          </i>
                          ?????nh v??? GPS
                        </span>
                      </Col>
                      <Col lg={6} className="mb-3">
                        <FormCheckInput
                          type="checkbox"
                          onChange={handleChangeUsb}
                          defaultChecked={register.data.usb}
                        />
                        <span>
                          <i className="icon-tools">
                            <GiUsbKey />
                          </i>
                          Khe c???m USB
                        </span>
                      </Col>
                      <Col lg={6} className="mb-3">
                        <FormCheckInput
                          type="checkbox"
                          onChange={handleChangeReverseCamera}
                          defaultChecked={register.data.reverseCamera}
                        />
                        <span>
                          <i className="icon-tools">
                            <HiVideoCamera />
                          </i>
                          Camera l??i
                        </span>
                      </Col>
                    </Row>
                  </FormGroup>
                ) : null}
              </>
            ) : null}
          </Form>
        </div>
      </div>
    </>
  );
}
