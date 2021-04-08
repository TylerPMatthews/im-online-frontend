import React from "react";
import { connect } from "react-redux";
import {Link} from 'react-router-dom';



const Home = (props) => {

  return (
    <div>
      <div className='postwrap'>
      <h3>Would you like to create a new post?</h3>
      <Link to='/createpost'>Create new post</Link>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    user_username: state.user.user_username,
    user_id: state.user.user_id,
  };
};

export default connect(mapStateToProps)(Home);
