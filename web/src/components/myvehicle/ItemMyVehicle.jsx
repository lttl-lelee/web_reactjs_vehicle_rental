import { formatMoneyK } from "lib/Helper";
import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import { AiFillStar } from "react-icons/ai";
import { GrLocation } from "react-icons/gr";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import StarRatings from "react-star-ratings";

export default function ItemMyVehicle(props) {
  const vehicle = props.item;
  const images = vehicle.images;
  const url = vehicle.bikeType === "bike" ? "/bike" : vehicle.driver ? "/withdriver" : "/car";
  const rates = vehicle.rating || [];
  const totalRate = rates.reduce((ini, item) => {
    return ini + item.numStar;
  }, 0);
  let numRate = 4.5;
  // if (rates.length) {
  //   numRate = totalRate / rates.length;
  // }
  return (
    <>
      <Row className="item-vehicle mb-3">
        <Col lg={6}>
          <div className="img-item">
            <div className="img-item-main">
              <div className="image-wrapper">
                {/* <img src={vehicle.mainImg}></img> */}
                <img src={"http://127.0.0.1:8000/"+images[0]?.link}></img>
              </div>
              <span className="img-status">
                {vehicle.actived ? "Đang hoạt động" : "Đang chờ duyệt"}
              </span>
            </div>
          </div>
        </Col>
        <Col lg={6}>
          <div className="content-item">
            <div className="content-item-desc">
              <div className="name-vehicle">{vehicle?.category?.name}</div>
              <div className="content-item-rating">
                <div className="content-item-rating-star">
                  <StarRatings
                    rating={numRate}
                    starRatedColor="yellow"
                    numberOfStars={5}
                    starDimension="20px"
                    starSpacing="1px"
                  />
                </div>
                <span>• {vehicle.numBooking}10 chuyến</span>
              </div>
              <div className="content-item-price">
                <span>Giá thuê: </span>
                <span className="price">
                  {formatMoneyK(vehicle.origin_price)}
                </span>
              </div>
              <div className="content-item-local">
                <span>
                  <i className="icon-local">
                    <GrLocation />
                  </i>
                  {vehicle.location.str_address}
                </span>
              </div>
            </div>
            <div className="content-item-btn">
              <hr />
              <Row>
                <Col lg={6}>
                  <Link className="btn details-btn w-100" to={`${url}?id=${vehicle.id}`}>
                    Xem chi tiết
                  </Link>
                </Col>
                <Col lg={6}>
                  <Link
                    className="btn btn-primary manage-btn w-100"
                    to={`/vehiclesetting?id=${vehicle.id}`}
                  >
                    Quản lý xe
                  </Link>
                </Col>
              </Row>
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
}
