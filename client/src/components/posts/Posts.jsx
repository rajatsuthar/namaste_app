import React, { useEffect } from 'react'
import './Posts.css'
// import { PostsData } from '../../Data/PostData'
import Post from '../Post/Post'
import {useDispatch,useSelector} from 'react-redux'
import { getTimelinePosts } from '../../actions/PostAction';
import { useParams } from "react-router-dom";


function Posts() {
  const dispatch = useDispatch();
  const {user}=useSelector((state)=>state.authReducer.authData);
  let {posts,loading}=useSelector((state)=>state.postReducer);
  const Params=useParams()

  useEffect(()=>{
    dispatch(getTimelinePosts(user._id))
  },[])

  if(!posts) return "No post";
  if(Params.id){
    posts = posts.filter((post)=>post.userId===Params.id)
  }
  return (
    <div className='Posts'> 
        {loading?"Fetching Post...":
        posts.map((post ,id )=>{
            return <Post data={post} id={id}/>
        })}

    </div>
  )
}

export default Posts