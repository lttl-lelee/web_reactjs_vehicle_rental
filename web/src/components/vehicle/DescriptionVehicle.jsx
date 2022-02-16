// @ts-nocheck
import React from "react";
import StarRatings from "react-star-ratings";
import { Col, Row } from "react-bootstrap";
import { GiFuelTank, GiGears, GiPassport, GiUsbKey } from "react-icons/gi";
import { ImProfile } from "react-icons/im";
import { HiVideoCamera } from "react-icons/hi";
import { FaBluetooth, FaMap } from "react-icons/fa";
import { RiGpsFill } from "react-icons/ri";
import { GrLocation } from "react-icons/gr";
import GoogleMapReact from "google-map-react";
function DescriptionVehicle(props) {
  const vehicle = props.vehicle;
  const user = vehicle.users;
  const type = props.type;
  return (
    <>
      <Row className="desc-item">
        <Col lg={3} className="desc-title">
          ĐẶC ĐIỂM
        </Col>
        <Col lg={9} className="desc-content">
          <Row>
            <Col lg={6} className="mb-3">
              <span>
                <i id="icon-vehicle" style={{ top: "-21%" }}>
                  <GiGears />
                </i>
                Loại xe: {vehicle.type}
              </span>
            </Col>
            <Col lg={6}>
              <span>
                <i id="icon-vehicle" style={{ top: "-10%" }}>
                  <GiFuelTank />
                </i>
                Nhiên liệu: {vehicle.fuel_type}
              </span>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="desc-item">
        <Col lg={3} className="desc-title">
          MÔ TẢ
        </Col>
        <Col lg={9} className="desc-content">
          {vehicle.description}
        </Col>
      </Row>
      <Row className="desc-item">
        <Col lg={3} className="desc-title">
          GIẤY TỜ THUÊ XE (BẢN GỐC)
        </Col>
        <Col lg={9} className="desc-content">
          <Row>
            <Col lg={6}>
              <span>
                <i id="icon-vehicle">
                  <ImProfile />
                </i>
                CMND và GPLX (đối chiếu)
              </span>
            </Col>
            <Col lg={6}>
              <span>
                <i id="icon-vehicle">
                  <GiPassport />
                </i>
                Hộ Khẩu hoặc KT3 hoặc Passport (giữ lại)
              </span>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="desc-item">
        <Col lg={3} className="desc-title">
          TÀI SẢN THẾ CHẤP
        </Col>
        <Col lg={9} className="desc-content">
          {type === "car" ? (
            <span>
              15 triệu (tiền mặt/chuyển khoản cho chủ xe khi nhận xe) hoặc Xe
              máy (kèm cà vẹt gốc) giá trị 15 triệu
            </span>
          ) : (
            <span>1 triệu (tiền mặt/chuyển khoản cho chủ xe khi nhận xe)</span>
          )}
        </Col>
      </Row>
      <Row className="desc-item">
        <Col lg={3} className="desc-title">
          ĐIỀU KHOẢN
        </Col>
        <Col lg={9} className="desc-content">
          <span>
            1. Chấp nhận Hộ khẩu Thành phố/KT3 Thành phố/Hộ khẩu tỉnh/Passport
            (Bản gốc) (Giữ lại khi nhận xe) CMND và GPLX đối chiếu 2.
            <br />
            <br />* Quý khách lưu ý một số qui định sau: Không sử dụng xe thuê
            vào mục đích phi pháp, trái pháp luật Không được sử dụng xe thuê để
            cầm cố hay thế chấp, sử dụng đúng mục đích Không hút thuốc,ăn kẹo
            cao su xả rác trong xe Không chở hàng quốc cấm dễ cháy nổ,hoa quả
            thưc phẩm lưu mùi trong xe. Khi trả xe, khách hàng vui lòng vệ sinh
            sạch sẽ hoặc gửi phụ thu thêm phí rửa xe, hút bụi nếu xe dơ. (sẽ thu
            nhiều hơn tuỳ theo mức độ dơ) Trân trọng cảm ơn, chúc quý khách có
            những chuyến đi tuyệt vời!
          </span>
        </Col>
      </Row>
      <Row className="desc-item">
        <Col lg={3} className="desc-title">
          CHỦ XE
        </Col>
        <Col lg={9} className="desc-content">
          <Row className="infor-owner">
            <Col xs={3} className="avatar-owner">
              <img src={user.avatar_link} alt="" />
            </Col>
            <Col xs={9} className="status-owner">
              <a href="/account" id="owner-name">
                <h4>{user.fullName}</h4>
              </a>
              <div className="mt-3">SĐT: {user.phone}</div>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="desc-item">
        <Col lg={3} className="desc-title">
          VỊ TRÍ
        </Col>
        <Col lg={9} className="desc-content">
          {vehicle.location.latitude ? (
            <div className="map" style={{ height: "300px" }}>
              <GoogleMapReact
                bootstrapURLKeys={{
                  key: "AIzaSyCl-VoCEBsPXrdreQzdsapPNrXGpOTFCWo",
                  language: "vi",
                  region: "vi",
                }}
                yesIWantToUseGoogleMapApiInternals={true}
                defaultZoom={15}
                defaultCenter={{
                  lat: parseFloat(vehicle.location.latitude),
                  lng: parseFloat(vehicle.location.longitude),
                  address: "Đà Nẵng",
                }}
              >
                <div
                  className="map--pointer"
                  lat={vehicle.location.latitude}
                  lng={vehicle.location.longitude}
                >
                  <GrLocation />
                </div>
              </GoogleMapReact>
            </div>
          ) : null}
          <span>
            <i id="icon-vehicle" style={{ top: "-2px" }}>
              <GrLocation />
            </i>
            {vehicle.location.str_address}
          </span>
        </Col>
      </Row>
    </>
  );
}

export default DescriptionVehicle;
