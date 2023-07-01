import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addUser, deleteUser, editUser, fetchUsers } from '../redux/userSlice';

const UserListComponent = () => {
    const {loading, users, error} = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const [name, setName] = useState('');
    const [isEdit, setIsEdit] = useState(false);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    const handleSubmit = () => {
        if (userId) {
            const user = users.find(user => user.id === userId);
            dispatch(editUser({...user, name: name.trim()}))
            setUserId(null);
            setIsEdit(false);
        } else {
            if (!name.trim()) return
            dispatch(addUser({ name: name.trim() }));
        }
        setName('');
    }

    const handleEdit = (user) => {
        setIsEdit(true);
        setName(user.name);
        setUserId(user.id);
    }

    return (
        <div>
            <h3>User List</h3>
            <input onChange={e => setName(e.target.value)} value={name} />
            <button onClick={handleSubmit}>{isEdit ? 'Update' : 'Add'} User</button>
            <ul>
                {loading && 'Loading'}
                {error && error}
                {!loading && !error && users.map((user, index) => (
                    <li key={index} style={{ display: 'flex', gap: '5px' }}>{user.name}<button onClick={() => handleEdit(user)}>Edit</button><button onClick={() => dispatch(deleteUser(user.id))}>Delete</button></li>
                ))}
            </ul>
        </div>
    )
}

export default UserListComponent