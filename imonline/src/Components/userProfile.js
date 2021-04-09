import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";

const UserProfile = (props) => {
  const [friend, setFriends] = useState([]);
  const { id } = useParams();
  const newID = id.replace(/:/g, "");

  useEffect(() => {
    axios
      .get(`http://localhost:59283/user/profile?${newID}`)
      .then((res) => {
        setFriends(res.data);
      })
      .catch((err) => {
        console.log("Axios USER_PROFILE error");
      });
  }, []);
  const readyData = JSON.stringify(friend);
  const postData = {
    user_id: props.user_id,
    user_friend_list: readyData,
  };
  
 

  const addFriend = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:59283/user/friends", postData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log("Axios add friend error", err);
      });
  };
  return (
    <div>
      {friend.map((item, idx) => {
        return (
          <div key={idx}>
            <div className="profile_image">
              <img
                src={item.user_profile_main_img}
                alt={item.user_profile_firstName}
              />
            </div>
            <h3>
              {item.user_profile_firstName}, {item.user_profile_lastName}
            </h3>
            <span>{item.user_profile_location}</span>
            <p>{item.user_profile_bio}</p>
            <button onClick={addFriend}>Add Friend</button>
          </div>
        );
      })}
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    user_username: state.user.user_username,
    user_id: state.user.user_id,
  };
};

export default connect(mapStateToProps)(UserProfile);
