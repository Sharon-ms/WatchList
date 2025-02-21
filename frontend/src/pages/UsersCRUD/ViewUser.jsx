import React, { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { GeneralContext } from '../../App';



const ViewUser = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { API } = useContext(GeneralContext);
    const { user } = location.state || {};


    const handleDeleteUser = async () => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                await axios.delete(`${API}/users/${user.id}`);
                alert('User deleted successfully');
                navigate('/view_users');
            } catch (e) {
                console.error('Error deleting user:', e);
                alert('Failed to delete user. Please try again later.');
            }
        }
    };

    return (
        <div>
            <Button variant="primary" onClick={() => navigate('/view_users')}>
                Back to Users List
            </Button>
            <h1>{user?.name || "User not availble"}</h1>
            <h4>{user?.mail || "Mail not availble"}</h4>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, a nemo et, dolorem dicta rem incidunt molestiae tenetur itaque labore magnam nam! Deserunt sequi harum magni! Modi esse vel facere.</p>
            <Button variant="success" onClick={() => navigate('/edit_User', { state: { user } })}>
                Edit User
            </Button>
            <Button variant="danger" onClick={handleDeleteUser}>
                Delete User
            </Button>

            <br />
            <br />


        </div >
    )
}

export default ViewUser

