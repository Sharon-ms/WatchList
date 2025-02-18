import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const UsersList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/users") // עדכן את כתובת ה-API לפי כתובת השרת שלך
            .then((response) => response.json())
            .then((data) => setUsers(data))
            .catch((error) => console.error("Error fetching users:", error));
    }, []);

    return (
        <div className="p-4">
            <h1 className="text-2xl mb-4">User List</h1>
            <ul className="space-y-2">
                {users.map((user) => (
                    <li key={user.id} className="border p-2 rounded-md shadow">
                        <Link to={`/users/${user.id}`} className="text-blue-500 hover:underline">
                            {user.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UsersList;
