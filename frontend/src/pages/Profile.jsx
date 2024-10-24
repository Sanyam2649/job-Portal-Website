import { userLogoutAction } from '../actions/userAction';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
const Profile = () => {
    const [user, setUser] = useState({ profile: {}, email: '' });
    const [originalUser, setOriginalUser] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [profilePicture, setProfilePicture] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const token = localStorage.getItem('userToken');
                const config = { headers: { Authorization: `Bearer ${token}` } };
                const response = await axios.get('http://localhost:9000/api/users/me', config);
                setUser(response.data.user);
                setOriginalUser(response.data.user); // Store the original data
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };
        
        fetchUserProfile();
    }, []);

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, profile: { ...user.profile, [name]: value } });
    };

    const handleSaveChanges = async () => {
        try {
            const token = localStorage.getItem('userToken');
            const config = { headers: { Authorization: `Bearer ${token}` } };
            await axios.put(`http://localhost:9000/api/users/profile`, user, config);
            setIsEditing(false);
        } catch (error) {
            console.error('Error saving profile changes:', error);
        }
    };

    const handleLogout = () => {
        dispatch(userLogoutAction());
        localStorage.removeItem('userToken');
        navigate('/');
    };

    const handleCancelEdit = () => {
        setUser(originalUser);
        setIsEditing(false);
    };



    const handleProfilePictureChange = (e) => {
        const file = e.target.files[0];
        setProfilePicture(URL.createObjectURL(file));
    };

    return (
        <div className="flex h-screen">
            <aside className="w-1/4 bg-white p-4 border-r border-gray-300">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold mb-4">Organize</h1>
                    <ul>
                        <li className="mb-4 flex items-center">
                            <i className="fas fa-briefcase mr-2"></i>
                            <span><Link to="job-list">Job Listings</Link></span>
                        </li>
                        <li className="mb-4 flex items-center">
                    
                            <span>My Applications</span>
                        </li>
                    </ul>
                </div>
                <div className="mt-auto">
                            <button onClick={handleLogout} className="bg-black text-white rounded text-center px-6 py-2 hover:bg-gray-600">
                                LogOut
                            </button>
                      
                </div>
            </aside>
            <main className="flex-1 p-8">
                <div className="bg-white p-8 border border-gray-300">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-2xl font-bold">Profile</h2>
                        <button className="border border-gray-300 p-2" onClick={isEditing ? handleCancelEdit : handleEditToggle}>
                           {isEditing ? 'Cancel' : 'Edit'}
                       </button>

                    </div>
                    <div className="mb-8">
                        <h3 className="font-bold mb-2">Profile Picture</h3>
                        <div className="flex items-center">
                            <div className="w-32 h-32 border border-gray-300 flex items-center justify-center">
                                {profilePicture ? <img src={profilePicture} alt="Profile" className="w-full h-full"/> : <span className="text-gray-500">Image Placeholder</span>}
                            </div>
                            <div className="ml-4">
                                {isEditing && <input type="file" onChange={handleProfilePictureChange} className="border border-gray-300 p-2" />}
                                <p className="text-gray-500 mt-2">Image Guidelines</p>
                            </div>
                        </div>
                    </div>

                    <div className="mb-8">
                        <h3 className="font-bold mb-2">Full Name</h3>
                        {isEditing ? (
                            <input
                                type="text"
                                placeholder="Enter your full name"
                                className="border border-gray-300 p-2 w-full"
                                name="fullName"
                                value={user.profile?.fullName || ''}
                                onChange={handleChange}
                            />
                        ) : (
                            <p>{user.profile?.fullName || 'N/A'}</p>
                        )}
                    </div>
                    <div className="mb-8">
                                 <h3 className="font-bold mb-2">Email Address</h3>
                                 <p className="mb-2">{user.email}</p>
                    </div>
 
                    <div className="mb-8">
                        <h3 className="font-bold mb-2">Experience</h3>
                        {isEditing ? (
                            <textarea
                                placeholder="Describe your experience"
                                className="border border-gray-300 p-2 w-full h-24"
                                name="experience"
                                value={user.profile?.experience || ''}
                                onChange={handleChange}
                            ></textarea>
                        ) : (
                            <p>{user.profile?.experience || 'N/A'}</p>
                        )}
                    </div>
                    <div className="mb-8">
                        <h3 className="font-bold mb-2">Education</h3>
                        {isEditing ? (
                            <textarea
                                placeholder="Describe your education"
                                className="border border-gray-300 p-2 w-full h-24"
                                name="education"
                                value={user.profile?.education || ''}
                                onChange={handleChange}
                            ></textarea>
                        ) : (
                            <p>{user.profile?.education || 'N/A'}</p>
                        )}
                    </div>
                    <div className="mb-8">
                        <h3 className="font-bold mb-2">Projects</h3>
                        {isEditing ? (
                            <textarea
                                placeholder="Describe your projects"
                                className="border border-gray-300 p-2 w-full h-24"
                                name="projects"
                                value={user.profile?.projects || ''}
                                onChange={handleChange}
                            ></textarea>
                        ) : (
                            <p>{user.profile?.projects || 'N/A'}</p>
                        )}
                    </div>
                    <div className="mb-8">
                        <h3 className="font-bold mb-2">Skills</h3>
                        {isEditing ? (
                            <textarea
                                placeholder="List your skills"
                                className="border border-gray-300 p-2 w-full h-24"
                                name="skills"
                                value={user.profile?.skills || ''}
                                onChange={handleChange}
                            ></textarea>
                        ) : (
                            <p>{user.profile?.skills || 'N/A'}</p>
                        )}
                    </div>
                    {isEditing && (
                        <div className="flex justify-between">
                            <button onClick={handleSaveChanges} className="border border-gray-300 p-2">Save Changes</button>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}

export default Profile;
