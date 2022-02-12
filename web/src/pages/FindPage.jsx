import { DistanceMatrixService } from "@react-google-maps/api";
import vehicleApi from "api/vehicleApi";
import ItemFind from "components/find/ItemFind";
import Loading from "components/layout/Loading";
import {
  formatDateTime,
  formatMoneyK,
  sortJSON,
  sortVehicle,
  sortVehicleRating,
} from "lib/Helper";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, FormGroup, FormLabel, Row } from "react-bootstrap";
// eslint-disable-next-line no-unused-vars
import FormRange from "react-bootstrap/esm/FormRange";
import "react-datepicker/dist/react-datepicker.css";
import { GrPowerReset } from "react-icons/gr";
import { useSelector } from "react-redux";

export default function FindPage() {
  const [resultSearch, setResultSearch] = useState([]);
  const [afterFilter, setAfterFilter] = useState([]);
  const [isFresh, setIsFresh] = useState(true);
  const [status, setStatus] = useState("loading");
  const [listLocationVehicle, setListLocationVehicle] = useState([]);
  const [listVehicle, setListVehicle] = useState([]);
  const [range, setRange] = useState(1000000);



  const handleRange = (evt) => {   
    const value = evt.target.value;
    setRange(value);
    let list = [...resultSearch];
    list = list.filter((item) => {
      return item.vehicle.originPrice < value;
    });
    setAfterFilter(list);
  };
  const handleBikeType = (evt) => {
    const value = evt.target.value;
    let list = [...resultSearch];
    if (value !== "all") {
      list = list.filter((item) => {
        return item.vehicle.bikeType === value;
      });
    }
    setAfterFilter(list);
  };
  const handleCarType = (evt) => {
    const value = evt.target.value;
    let list = [...resultSearch];
    if (value !== "all") {
      list = list.filter((item) => {
        return item.vehicle.carType === +value;
      });
    }
    setAfterFilter(list);
  };
  const handleTransmission = (evt) => {
    const value = evt.target.value;
    let list = [...resultSearch];
    if (value !== "all") {
      list = list.filter((item) => {
        return item.vehicle.transmission === value;
      });
    }
    setAfterFilter(list);
  };
  // @ts-ignore
  const searchInput = useSelector((state) => state.searched).data;
  console.log("timkiem",searchInput);
  const handleSort = (evt) => {
    const type = evt.target.value;
    let list = [...afterFilter];
    switch (type) {
      case "1":
        list = sortJSON(list, "dis", true);
        break;
      case "2":
        list = sortVehicle(list, "originPrice", true);
        break;
      case "3":
        list = sortVehicle(list, "originPrice", false);
        break;
      case "4":
        list = sortVehicleRating(list, false);
      // eslint-disable-next-line no-fallthrough
      default:
        list = sortVehicle(list, "id", true);
      break;
    }
    setAfterFilter(list);
  };
  var rslist=[];
  useEffect(() => {
    const runEffect = async () => {
      rslist= await getListVehicles(searchInput);
      console.log(searchInput.type);
      console.log("kqtimkiem:",rslist);
      // const list = await getListVehicles('car');
      // console.log(list);
      // console.log(getListLocation(list));
      setListVehicle(rslist);
      // setListLocationVehicle(getListLocation(list));
      console.log("abd:",listVehicle);
    };
    runEffect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // eslint-disable-next-line no-unused-vars
  const url = "#";
  return (
    <>
    {/* {console.log(isFresh && searchInput?.startLocal !== "")} */}
  
      {/* {isFresh && searchInput?.startLocal !== "" && (

        <DistanceMatrixService
          options={{
            destinations: listLocationVehicle,
            origins: [searchInput.startLocal],
            travelMode: "DRIVING",
          }}
          
          callback={(response) => {
            console.log("Linh");
            if (response) {
              let rs = getListDistanceVehicles(response, listVehicle);
             
              setResultSearch(rs);
              setAfterFilter(rs);
              setIsFresh(false);
              setStatus("idle");
            }
          }}
        /> 
      )} */}
      <div id="find-page">
        <div className="find">
          <Row className="find__header">
            <Col className="find__header-location" lg={6} id="heading">
              <label htmlFor="">Địa điểm:</label>
              <p>{searchInput.startLocal}</p>
            </Col>
            <Col className="find__header-start" lg={3} id="heading">
              <label htmlFor="">Bắt đầu:</label>
              <div className="date-start" id="date">
                <p>{formatDateTime(searchInput.startDate, false)}</p>
              </div>
              <div className="time-start ms-3">
                <p>{searchInput.startTime}</p>
              </div>
            </Col>
            {searchInput.type === "driver" ? (
              <Col className="find__header-end" lg={3} id="heading">
                <label htmlFor="">Thời gian:</label>
                <div className="date-end" id="date">
                  <p>{searchInput.time} Tiếng</p>
                </div>
              </Col>
            ) : (
              <Col className="find__header-end" lg={3} id="heading">
                <label htmlFor="">Kết thúc:</label>
                <div className="date-end" id="date">
                  <p>{searchInput.startDate}</p>
                </div>
                <div className="time-end ms-3">
                  <p>{searchInput.startTime}</p>
                </div>
              </Col>
            )}
          </Row>
          <Row className="find__content">
            <Col className="find__content-options" lg={4}>
              <Form>
                <FormGroup id="group" className="mb-4">
                  <FormLabel id="lable">Sắp xếp</FormLabel>
                  <select
                    className="form-select form-select-md mb-3"
                    defaultValue="Tối ưu"
                    onChange={handleSort}
                  >
                    <option value="0">Tối ưu</option>
                    <option value="1">Ưu tiên khoảng cách</option>
                    <option value="2">Ưu tiên giá thấp</option>
                    <option value="3">Ưu tiên giá cao</option>
                    <option value="4">Ưu tiên đánh giá</option>
                  </select>
                </FormGroup>
                <FormGroup id="group" className="mb-4">
                  <FormLabel id="lable">Mức giá</FormLabel>
                  <Form.Range
                    min="100000"
                    max="1500000"
                    step="100000"
                    onChange={handleRange}
                    defaultValue={range}
                    id="price-range"
                  />
                  <Form.Label className="form-label fw--3 fs--6 justify-content-end d-flex">
                    <span id="max-price">Dưới {formatMoneyK(range)}</span>
                  </Form.Label>
                </FormGroup>
                {searchInput.type === "bike" ? (
                  <FormGroup id="group" className="mb-4">
                    <FormLabel id="lable">Loại xe máy</FormLabel>
                    <select
                      className="form-select form-select-md mb-3"
                      defaultValue="all"
                      onChange={handleBikeType}
                    >
                      <option value="all">Tất cả</option>
                      <option value="Xe số">Xe số</option>
                      <option value="Xe ga">Xe ga</option>
                      <option value="Xe côn">Xe côn</option>
                    </select>
                  </FormGroup>
                ) : (
                  <FormGroup id="group" className="mb-4">
                    <FormLabel id="lable">Loại xe ô tô</FormLabel>
                    <select
                      className="form-select form-select-md mb-3"
                      defaultValue="all"
                      onChange={handleCarType}
                    >
                      <option value="all">Tất cả</option>
                      <option value="1">Mini (4 chỗ)</option>
                      <option value="2">Sedan (4 chỗ)</option>
                      <option value="3">Hatchback (4 chỗ)</option>
                      <option value="4">Gầm cao (5 chỗ)</option>
                      <option value="5">Gầm cao (7 chỗ)</option>
                      <option value="6">Gầm thấp (7 chỗ)</option>
                      <option value="7">Bán tải</option>
                    </select>
                  </FormGroup>
                )}
                {searchInput.type === "bike" ? null : (
                  <FormGroup id="group" className="mb-4">
                    <FormLabel id="lable">Truyền động</FormLabel>
                    <select
                      className="form-select form-select-md mb-3"
                      defaultValue="all"
                      onChange={handleTransmission}
                    >
                      <option value="all">Tất cả</option>
                      <option value="Số sàn">Số sàn</option>
                      <option value="Tự động">Số tự động</option>
                    </select>
                  </FormGroup>
                )}
                <FormGroup
                  id="group"
                  className="mb-4"
                  style={{ textAlign: "right", color: "#00a54f" }}
                ></FormGroup>
                <Button
                  type="reset"
                  className="w-100"
                  onClick={() => {
                    setAfterFilter(resultSearch);
                  }}
                >
                  {" "}
                  <span id="icon-reset">
                    <GrPowerReset style={{ color: "#00a54f" }} />
                  </span>
                  Bỏ lọc
                </Button>
              </Form>
            </Col>
            {console.log("ầdfad",rslist)}
            <Col className="find__content-items" lg={8}>
              <Row className="items position-relative">
                {/* {status === "loading" ? (
                  <Loading type="inline" />
                ) :  */}
                {rslist.length > 0 ? (
                  rslist.map((item, index) => {
                    return (
                      <ItemFind
                        key={index}
                        data={item}
                        type={searchInput.type}
                      />
                    );
                  })
                ) : (
                  <p className="text-center mt-5 text-danger">
                    Không tìm thấy kết quả!
                  </p>
                )}
              </Row>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}

async function getListVehicles(type) {
  let listVehicle = [];
  switch (type) {
    case "car":
      // @ts-ignore
      listVehicle = await vehicleApi.getCarSelfDriver();
      break;
    case "driver":
      // @ts-ignore
      listVehicle = await vehicleApi.getCarDriver();
      break;
    case "bike":
      // @ts-ignore
      listVehicle = await vehicleApi.getBikes();
      break;
  }

  return listVehicle;
}
// function getListLocation(list) {
//  //  console.log(list.data);
//   var length = Object.keys(list).length;
//   let rsLatLng = [];
//   if (length > 0) {
//     // for (let key in list) {
//     //   console.log(key);
//     //   let item = list[key].location[0].str_address;
//     //   rsLatLng.push(item);
//     // }
//     list.data.forEach((e) => {
//       let item = e.location.str_address;
//       rsLatLng.push(item);
//     });
//   }
//   // console.log(rsLatLng);
//   return rsLatLng;
// }
// function getListDistanceVehicles(response, listVehicles) {
//   let list = [];
//   let desList = response.destinationAddresses;
//   let oriList = response.originAddresses;
//   let num = desList.length;
//   let rowList = response.rows[0].elements;
//   for (let i = 0; i < num; i++) {
//     if (rowList[i].distance) {
//     }
//     if (rowList[i].distance && rowList[i].distance.value < 20000) {
//       let item = {
//         id: i,
//         des: desList[i],
//         ori: oriList[0],
//         dis: rowList[i].distance.text,
//         dur: rowList[i].duration.text,
//         vehicle: listVehicles[i],
//       };
//       list.push(item);
//     }
//   }
//   return list;
// }
