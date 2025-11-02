import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaRegUserCircle } from "react-icons/fa";
import type { RootState } from "../store/store";
import { updateProfile } from "../features/authSlice";

function Profile() {
  const dispatch = useDispatch();
  const { username, email, avatar } = useSelector((state: RootState) => state.auth);
  const [bio, setBio] = useState("Lorem ipsum dolor sit amet.");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    username,
    bio,
    avatar: avatar || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm({ ...form, avatar: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    dispatch(updateProfile({ username: form.username, avatar: form.avatar }));
    setBio(form.bio);
    setShowModal(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-sm text-center">
        {form.avatar ? (
          <img
            src={form.avatar}
            alt="Profile"
            className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
          />
        ) : (
          <FaRegUserCircle size={96} className="mx-auto text-yellow-400 mb-4" />
        )}
        <h2 className="text-xl font-semibold">{username}</h2>
        <p className="text-gray-600">{email}</p>
        <p className="text-gray-500 mt-2">{bio}</p>
        <button
          onClick={() => setShowModal(true)}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 cursor-pointer"
        >
          Edit Profile
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-transparent bg-opacity-40">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Edit Profile</h3>

            {/* Image preview + upload */}
            <div className="flex flex-col items-center mb-4">
              {form.avatar ? (
                <img
                  src={form.avatar}
                  alt="Preview"
                  className="w-24 h-24 rounded-full object-cover mb-2 border border-gray-300 shadow-sm"
                />
              ) : (
                <FaRegUserCircle size={96} className="text-yellow-400 mb-2" />
              )}

              <label
                htmlFor="avatar-upload"
                className="cursor-pointer bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-full text-sm transition"
              >
                {form.avatar ? "Change Picture" : "Upload Picture"}
              </label>
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>

            {/* Editable username */}
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Username"
              className="w-full p-3 border border-gray-300 rounded-xl mb-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-gray-700 shadow-sm"
            />

            {/* Editable bio */}
            <textarea
              value={form.bio}
              onChange={(e) => setForm({ ...form, bio: e.target.value })}
              placeholder="Write a short bio..."
              className="w-full h-24 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 text-gray-700 resize-none shadow-sm"
            />

            <div className="flex justify-end gap-3 mt-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 cursor-pointer"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
