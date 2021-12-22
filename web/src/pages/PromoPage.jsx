// import userApi from "api/userApi";
import { formatDateTime, formatMoneyK } from "lib/Helper";
import React, { useEffect, useState } from "react";
import ReactDOM from 'react-dom';
import axios from "axios";
import {
  Col,
  ListGroup,
  ListGroupItem,
  Row,
  Card,
  Container,
  Modal,
  Button,
  Form,
} from "react-bootstrap";

function PromoPage() {
  const [promotions, setPromotion] = useState([]);
  const [item, setItem] = useState(null);
  const [status, setStatus] = useState("loading");
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleShowModel = (item) => {
    setShowModal(true);
    setItem(item);
  };
  const [msg, setMsg] = useState("");
  //useEffect(() => {
  //   userApi.getPromotions().then((res) => {
  //     setPromotion(res.data);
  //     setStatus("idle");
  //   });
  // }, []);

  const handleSubmit = (event) => {
    setMsg("");
    event.preventDefault();
    const rootElement = document.getElementById('messagess');

    //cái này khi nhập và nhấn send, thì sẽ render ra chỗ class MenuOption(ở đây truyền cả message và time)
    ReactDOM.render(<Question />, rootElement) //(ở đây truyền cả msg và time)
    
    axios.post(`http://127.0.0.1:5000/assistant`, { 'message': msg })
      .then(res => {
        console.log(res);
        alert('Message: '+ res.data.message);
        // khi api trả data về, thì hiển thị câu trả lời
        if(res.data.message != ""){
          //nếu trả về khác rỗng, thì show câu trả lời ra. nếu rỗng, thì thôi
          ReactDOM.render(<Answer />, rootElement) //(ở đây truyền cả res.data.message và time)
        }
        console.log(res.data);
      })
  }

  return (
    <div className="page-content pt-3">
      <div className="container">
        <h3 className=" text-center">Messaging</h3>
        <div className="messaging">
            <div className="inbox_msg">
                <div className="inbox_people">
                    <div className="headind_srch">
                        <div className="recent_heading">
                            <h4>Recent</h4>
                        </div>
                        <div className="srch_bar">
                            <div className="stylish-input-group">
                                <input type="text" className="search-bar" placeholder="Search"/>
                                <span className="input-group-addon">
                                    <button type="button"> <i className="fa fa-search" aria-hidden="true"></i> </button>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="inbox_chat">
                        <div className="chat_list active_chat">
                            <div className="chat_people">
                                <div className="chat_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil"/> </div>
                                <div className="chat_ib">
                                    <h5>Sunil Rajput <span className="chat_date">Dec 25</span></h5>
                                    <p>Test, which is a new approach to have all solutions
                                        astrology under one roof.</p>
                                </div>
                            </div>
                        </div>
                        <div className="chat_list">
                            <div className="chat_people">
                                <div className="chat_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil"/> </div>
                                <div className="chat_ib">
                                    <h5>Sunil Rajput <span className="chat_date">Dec 25</span></h5>
                                    <p>Test, which is a new approach to have all solutions
                                        astrology under one roof.</p>
                                </div>
                            </div>
                        </div>
                        <div className="chat_list">
                            <div className="chat_people">
                                <div className="chat_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil"/> </div>
                                <div className="chat_ib">
                                    <h5>Sunil Rajput <span className="chat_date">Dec 25</span></h5>
                                    <p>Test, which is a new approach to have all solutions
                                        astrology under one roof.</p>
                                </div>
                            </div>
                        </div>
                        <div className="chat_list">
                            <div className="chat_people">
                                <div className="chat_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil"/> </div>
                                <div className="chat_ib">
                                    <h5>Sunil Rajput <span className="chat_date">Dec 25</span></h5>
                                    <p>Test, which is a new approach to have all solutions
                                        astrology under one roof.</p>
                                </div>
                            </div>
                        </div>
                        <div className="chat_list">
                            <div className="chat_people">
                                <div className="chat_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil"/> </div>
                                <div className="chat_ib">
                                    <h5>Sunil Rajput <span className="chat_date">Dec 25</span></h5>
                                    <p>Test, which is a new approach to have all solutions
                                        astrology under one roof.</p>
                                </div>
                            </div>
                        </div>
                        <div className="chat_list">
                            <div className="chat_people">
                                <div className="chat_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil"/> </div>
                                <div className="chat_ib">
                                    <h5>Sunil Rajput <span className="chat_date">Dec 25</span></h5>
                                    <p>Test, which is a new approach to have all solutions
                                        astrology under one roof.</p>
                                </div>
                            </div>
                        </div>
                        <div className="chat_list">
                            <div className="chat_people">
                                <div className="chat_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil"/> </div>
                                <div className="chat_ib">
                                    <h5>Sunil Rajput <span className="chat_date">Dec 25</span></h5>
                                    <p>Test, which is a new approach to have all solutions
                                        astrology under one roof.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mesgs">
                    <div className="msg_history" id="messagess">
                        <div>
                            <div id="noti"></div>
                        </div>
                        <div className="incoming_msg">
                            <div className="incoming_msg_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil"/> </div>
                            <div className="received_msg">
                                <div className="received_withd_msg">
                                    <p>Test which is a new approach to have all
                                        solutions</p>
                                    <span className="time_date"> 11:01 AM | June 9</span>
                                </div>
                            </div>
                        </div>

                        <div className="outgoing_msg">
                            <div className="sent_msg">
                                <p>Test which is a new approach to have all
                                    solutions</p>

                                <span className="time_date"> 11:01 AM | June 9</span>
                            </div>
                        </div>

                    </div>
                    <div className="type_msg">
                        <div className="input_msg_write">
                            <form onSubmit={handleSubmit}>
                                <input type="text" className="write_msg" placeholder="Type a message" value={msg} onChange={(e) => setMsg(e.target.value)} autoComplete="off"/>
                                <button className="msg_send_btn" type="submit"><i className="fa fa-paper-plane-o" aria-hidden="true"></i></button>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
    </div>
  );
}

 
//hàm này sẽ nhận time và message sau đó show ra
class Question extends React.Component {
  render() {
      return (
          <div>
             <div className='outgoing_msg'><div className='sent_msg'><p>câu hỏi: Message được truyền sang</p><span className='time_date'>Hiển thị thời gian</span></div></div>
          </div>
      )
  }
}

class Answer extends React.Component {
  render() {
      return (
          <div>
            <div className='incoming_msg'><div className='incoming_msg_img'> 
              <img src='https://ui-avatars.com/api/?name=Bot&color=7F9CF5&background=EBF4FF' alt='sunil'/> 
              </div>
              <div className='received_msg'>
                <div className='received_withd_msg'><p>  câu trả lời </p><span className='time_date'> time </span></div>
              </div>
            </div>
          </div>
      )
  }
}

export default PromoPage;
