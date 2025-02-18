import { useEffect, useState } from 'react';
import { axiosInstance } from '../api/axiosInstance';

export default function UsersPage() {
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState('');

    // שליפת כל היוזרים
    useEffect(() => {
        axiosInstance.get('/users')
            .then(response => setUsers(response.data))
            .catch(error => console.error("Error fetching users:", error));
    }, []);

    // הוספת יוזר חדש
    const handleAddUser = () => {
        if (!newUser.trim()) return;
        axiosInstance.post('/users', { name: newUser })
            .then(response => setUsers([...users, response.data]))
            .catch(error => console.error("Error adding user:", error));
        setNewUser('');
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl mb-4">Manage Users</h1>

            {/* טופס הוספת יוזר */}
            <input
                type="text"
                value={newUser}
                onChange={e => setNewUser(e.target.value)}
                placeholder="Enter user name"
                className="border p-2 mr-2 rounded"
            />
            <button onClick={handleAddUser} className="bg-blue-500 text-white p-2 rounded">
                Add User
            </button>

            {/* רשימת יוזרים */}
            <ul className="mt-4">
                {users.map(user => (
                    <li key={user.id} className="border-b p-2">{user.name}</li>
                ))}
            </ul>
        </div>
    );
}
