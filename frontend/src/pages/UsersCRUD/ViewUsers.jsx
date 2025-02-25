// גירסא ללא עיצוב


// import React, { useState, useContext, useEffect } from 'react';
// import { useNavigate } from "react-router-dom";
// import { Container, Row, Col, Form, FormControl, Button } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { GeneralContext } from '../../App';
// import axios from 'axios';

// const ViewUsers = () => {
//     const navigate = useNavigate();
//     const { API } = useContext(GeneralContext);
//     const [users, setUsers] = useState([]);

//     useEffect(() => {
//         fetchUsers();
//     }, []);

//     const fetchUsers = async (pageNumber = 0, pageSize = 10) => {
//         try {
//             const response = await axios.get(`${API}/users`, {
//                 params: { pageNumber, pageSize }
//             });

//             setUsers(response.data);
//         } catch (error) {
//             console.error('Error fetching users:', error);
//         }
//     };


//     return (
//         <div>
//             <Button variant="primary" onClick={() => navigate('/')}>
//                 Back to Home
//             </Button>
//             <h1>Users list</h1>
//             <Button variant="success" onClick={() => navigate('/create_user')}>Add an user</Button>
//             <Container>
//                 <Row>
//                     {users.map((user) => (
//                         <Col key={user.id} md={4}>
//                             <div
//                                 onClick={() => navigate('/view_user', { state: { user } })}
//                                 style={{ cursor: 'pointer', padding: '20px' }}
//                             >
//                                 <h2>{user.name}</h2>
//                                 <h4>{user.mail}</h4>
//                             </div>
//                         </Col>
//                     ))}
//                 </Row>
//             </Container>
//         </div>
//     )
// }

// export default ViewUsers;





import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { GeneralContext } from '../../App';
import axios from 'axios';

const ViewUsers = () => {
    const navigate = useNavigate();
    const { API } = useContext(GeneralContext);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async (pageNumber = 0, pageSize = 10) => {
        try {
            const response = await axios.get(`${API}/users`, {
                params: { pageNumber, pageSize }
            });
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    return (
        <Container className="mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <Button variant="primary" onClick={() => navigate('/')}>Back to Home</Button>
                <h1 className="text-center flex-grow-1">Users List</h1>
                <Button variant="success" onClick={() => navigate('/create_user')}>Add User</Button>
            </div>
            <Row>
                {users.length > 0 ? (
                    users.map((user) => (
                        <Col key={user.id} md={4} className="mb-4">
                            <Card className="shadow-sm" onClick={() => navigate('/view_user', { state: { user } })} style={{ cursor: 'pointer' }}>
                                <Card.Body>
                                    <Card.Title>{user.name}</Card.Title>
                                    <Card.Text>{user.mail}</Card.Text>
                                    <Button variant="info">View Profile</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                ) : (
                    <p className="text-center w-100">No users found.</p>
                )}
            </Row>
        </Container>
    );
};

export default ViewUsers;
