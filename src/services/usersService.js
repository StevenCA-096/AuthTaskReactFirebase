import axios from 'axios';

export const getUsers = async() => {
    const response = await axios.get('http://localhost:3000/users');
    return response
}

export const deleteUserS = async(uid) => {
    const response = await axios.delete(`http://localhost:3000/users/${uid}`);
    return response
}

export const updateUserEmail = async(userData) => {
    const response = await axios.put(`http://localhost:3000/updateEmail`, userData);
    return response
}