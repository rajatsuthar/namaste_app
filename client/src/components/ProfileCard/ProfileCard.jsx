import React from "react";
import "./ProfileCard.css";
import { useSelector } from "react-redux";
// import Cover from "../../img/cover.jpg";
// import Profile from "../../img/profileImg.jpg";
import { Link } from "react-router-dom";

function ProfileCard({location}) {
  const { user } = useSelector((state) => state.authReducer.authData);
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  const posts = useSelector((state)=>state.postReducer.posts);

  // const ProfilePage = false;
  return (
    <div className="ProfileCard">
      <div className="ProfileImage">
        <img
          src={
            user.coverPicture
              ? serverPublic + user.coverPicture
              : serverPublic + "defaultCover.jpg"
          }
          alt="coverImg"
        />
        <img
          src={
            user.coverPicture
              ? serverPublic + user.profilePicture
              : serverPublic + "defaultProfile.png"
          }
          alt="ProfileImg"
        />
      </div>
      <div className="ProfileName">
        <span>
          {user.firstname} {user.lastname}
        </span>
        <span>{user.worksAt ? user.worksAt : "Write about yourself"}</span>
      </div>

      <div className="FollowStatus">
        <hr />
        <div>
          <div className="Follow">
            <span>{user.following.length}</span>
            <span>Following</span>
          </div>
          <div className="vl"></div>
          <div className="Follow">
            <span>{user.followers.length}</span>
            <span>Follower</span>
          </div>

          {location==="profilePage" && (
            <>
              <div className="vl"></div>
              <div className="Follow">
                <span>{posts.filter((post)=>post.userId===user._id).length}</span>
                <span>Posts</span>
              </div>
            </>
          )}
        </div>
        <hr />
      </div>

      {location==="profilePage" ? (
        ""
      ) : (
        <span>
          <Link style={{textDecoration:"none", color:"inherit"}} to={`/profile/${user._id}`}>my profile </Link>
        </span>
      )}
    </div>
  );
}

export default ProfileCard;
