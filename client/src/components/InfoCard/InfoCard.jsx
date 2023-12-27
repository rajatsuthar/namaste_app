import React, { useEffect } from 'react'
import './InfoCard.css'
import {UilPen} from '@iconscout/react-unicons'
import { useState } from 'react'
import ProfileModal from '../profileModal/ProfileModal';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as UserApi from '../../api/UserRequest.js';
import { logout } from '../../actions/Authaction.js';

function  InfoCard() {

    const [modalOpened , setModalOpened ] = useState(false);

    const dispatch = useDispatch();
    const params = useParams();
    const profileUserId = params.id;
    const [profileUser , setProfileUser] = useState({});

    const {user} = useSelector((state)=>state.authReducer.authData)

    const handleLogout=()=>{
        dispatch(logout());
    }


    useEffect(()=>{
        const fetchProfileUser = async()=>{
            if(profileUserId === user._id){
                setProfileUser(user);
                // console.log("in if",user)
            }
            else{
                const profileUser = await UserApi.getUser(profileUserId)
                setProfileUser(profileUser);
                // console.log("in else",profileUser)
            }
        }
        fetchProfileUser();
    },[user])
  return (
    <div className='InfoCard'>
        <div className="InfoHead">
            <h4>Profile Info</h4>
            {user._id === profileUserId ? (<div> 
                 <UilPen width='2rem' height='1.2rem'onClick ={()=>setModalOpened(true)} />
                 <ProfileModal modalOpened={modalOpened} setModalOpened={setModalOpened} data={user}/>
            </div>):""}
            
          
        </div>
        <div className="Info">
            <span>
                <b>Status </b>
            </span>
            <span>{profileUser.relationship}</span>
        </div>
        <div className="Info">
            <span>
                <b>Lives In </b>
            </span>
            <span>{profileUser.livesIn}</span>
        </div>
        <div className="Info">
            <span>
                <b>Works At </b>
            </span>
            <span>{profileUser.worksAt}</span>
        </div>

        <button className="button logout-button" onClick={handleLogout}>LogOut</button>

        
    </div>
  )
}

export default InfoCard