import React from 'react';

const Profile = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-beige-50 text-beige-800 p-6">
            {/* Profile Card */}
            <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6 transform hover:scale-105 transition-transform duration-300">
                {/* Profile Image */}
                <div className="flex justify-center">
                    <img
                        src="https://via.placeholder.com/150"
                        alt="Profile"
                        className="w-24 h-24 rounded-full border-4 border-beige-500 shadow-md"
                    />
                </div>

                {/* User Info */}
                <div className="text-center mt-4">
                    <h2 className="text-2xl font-semibold text-beige-700">John Doe</h2>
                    <p className="text-beige-600 text-sm">Software Engineer</p>
                    <p className="text-beige-500 text-sm mt-1">johndoe@example.com</p>
                </div>

                {/* Profile Details */}
                <div className="mt-6">
                    <h3 className="text-lg font-semibold text-beige-700">Profile Information</h3>
                    <ul className="mt-3 space-y-2">
                        <li className="text-beige-600"><strong>Location:</strong> New York, USA</li>
                        <li className="text-beige-600"><strong>Phone:</strong> +1 234 567 890</li>
                        <li className="text-beige-600"><strong>Joined:</strong> January 2023</li>
                    </ul>
                </div>

                {/* Buttons */}
                <div className="mt-6 flex justify-center gap-4">
                    <button className="px-6 py-2 bg-beige-500 text-white rounded-lg shadow-lg hover:bg-beige-600 transition-all duration-300">
                        Edit Profile
                    </button>
                    <button className="px-6 py-2 border border-beige-500 text-beige-500 rounded-lg shadow-lg hover:bg-beige-50 transition-all duration-300">
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Profile;
