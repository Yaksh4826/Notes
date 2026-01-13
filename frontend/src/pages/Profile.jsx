import React from 'react'
import { Navigate, Outlet } from "react-router-dom";
import api from '../api/axios';
import ProfileCard from '../components/ProfileCard';
import { useContext } from 'react';
import { AuthContext } from '../context/authContext';


export const Profile = () => {
const {user} = useContext(AuthContext);
  if (!user) return null;
  return (
    <div><ProfileCard email={user.email} fullName={user.fullName} ></ProfileCard></div>
  )
}
