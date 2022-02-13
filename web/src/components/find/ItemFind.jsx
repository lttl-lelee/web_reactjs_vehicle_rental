import { formatMoneyK } from "lib/Helper";
import React from "react";
import { Col } from "react-bootstrap";
import { AiFillStar } from "react-icons/ai";
import { GrLocation } from "react-icons/gr";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import StarRatings from "react-star-ratings";

const ItemFind = (props) => {
  const data = props.data;
  const vehicle = data;
  const type = props.type;
  const url = type === "bike" ? "/bike" : type === "car" ? "car" : "withdriver";
  // const rates = vehicle?.rating || [];
  // const totalRate = rates.reduce((ini, item) => {
  //   return ini + item.numStar;
  // }, 0);
  let numRate = 5;
  // if (rates.length) {
  //   numRate = totalRate / rates.length;
  // }
  return (
    <>
      <Col className="item" lg={6}>
        <Link to={url + `?id=${vehicle?.id}`}>
          <div className="item__img">
            <div className="item__img-main">
              <img src={"http://127.0.0.1:8000/"+vehicle?.images[0].link} alt="No" />
            </div>
            <div className="item__img-infor">
              {vehicle?.driver ? (
                <div className="item__img-infor-price">
                  {formatMoneyK(Math.round(4*vehicle?.origin_price/6000)*1000)}
                </div>
              ) : (
                <div className="item__img-infor-price">
                  {formatMoneyK(vehicle?.origin_price)}
                </div>
              )}
            </div>
          </div>
          <div className="item__decs">
            <h2>{vehicle?.category.name}</h2>
            <div className="item__decs--rating">
              <div className="d-inline-block">
                <StarRatings
                  rating={numRate}
                  starRatedColor="yellow"
                  numberOfStars={5}
                  starDimension="20px"
                  starSpacing="1px"
                />
              </div>
              <span> • 10 chuyến</span>
              <span> ∼ {data.dis}7.2km</span>
            </div>
            <div className="item__decs--auto">
              {type === "bike" ? (
                <span>{vehicle?.bikeType}</span>
              ) : (
                <span>{vehicle?.transmission}</span>
              )}
            </div>
            {vehicle?.discount_enable ? (
              <div className="item__decs--auto">
                <span>Giao xe tận nơi</span>
              </div>
            ) : null}
            <div className="item__decs-local mt-2">
              <div className="item__decs-local-icon">
                <GrLocation />
              </div>
              <span>{vehicle?.location.str_address}</span>
            </div>
          </div>
        </Link>
      </Col>
    </>
  );
};
export default React.memo(ItemFind);
