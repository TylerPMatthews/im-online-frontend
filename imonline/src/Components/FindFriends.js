import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const FindFriends = () => {
  const [friends, setFriends] = useState([]);
  const {push} = useHistory()
  useEffect(() => {
    axios
      .get("http://localhost:59283/user/profile")
      .then((res) => {
        setFriends(res.data);
      })
      .catch((err) => {
        console.log("Axios find friends error", err);
      });
  }, []);
  if (friends.length < 1) {
    return (
      <div>
        <h3>No friends found...</h3>
      </div>
    );
  }
  return (
    <div>
      {friends.map((item, idx) => {
        return (
          <div key={idx}>
              <div className='profile_image'>
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
            <button onClick={()=>{
                push(`/userprofile:${item.user_id}`)
            }}>View Profile</button>
          </div>
        );
      })}
    </div>
  );
};
export default FindFriends;
