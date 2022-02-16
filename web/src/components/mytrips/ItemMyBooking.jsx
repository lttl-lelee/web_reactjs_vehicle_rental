import { formatDateTime, formatMoneyK } from "lib/Helper";
import React from "react";
import { Button, Col } from "react-bootstrap";
import { AiFillStar } from "react-icons/ai";
import { GrLocation } from "react-icons/gr";
import { Link } from "react-router-dom";
import StarRatings from "react-star-ratings";

const ItemMyBooking = (props) => {
  const booking = props.booking;
  // console.log(booking.vehicle.category.name);  
  return (
    <div className="booking__item">
      <Link className="link--text" to={`booking?id=${booking.id}`}>
        <h4>{booking.vehicle.category.name}</h4>
        <div className="booking__item--container">
          <div className="booking__item--img">
            <div className="image-wrapper">
              <img src={"http://127.0.0.1:8000/"+ booking.vehicle.images[0].link} alt="" />
            </div>
          </div>
          <div className="text-muted">
            <p>Bắt đầu: {formatDateTime(booking.start_time, true)}</p>
            <p>Kết thúc: {formatDateTime(booking.end_time, true)}</p>
            <p className="fw-bold fs-5 text-dark">
              Tổng tiền: {formatMoneyK(booking.amount)}
            </p>
          </div>
        </div>
        <div className="booking__item--footer">
          <div className={`${booking.status==="Đã hủy"?"text-danger":"text-primary"}`}>{booking.status}</div>
          <div className="text-muted fs--5">
            {formatDateTime(booking.createTime, false)}
          </div>
        </div>
      </Link>
    </div>
  );
};
export default React.memo(ItemMyBooking);
