import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faEye, faEyeSlash, faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Button } from "./Reusable";
import { useNavigate } from "react-router-dom";

const Favourite = () => {
  const [favorites, setFavorites] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [updatedReason, setUpdatedReason] = useState("");
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    // Add visibility and editing properties to each favorite
    const favoritesWithFeatures = storedFavorites.map(fav => ({ ...fav, isVisible: false, isEditing: false }));
    setFavorites(favoritesWithFeatures);
  }, []);

  const handleDelete = (index) => {
    setDeleteIndex(index);
    setShowDeleteConfirmation(true);
  };

  const handleToggleVisibility = (index) => {
    const updatedFavorites = [...favorites];
    updatedFavorites[index].isVisible = !updatedFavorites[index].isVisible;
    setFavorites(updatedFavorites);
  };

  const handleToggleEditing = (index) => {
    setEditingIndex(index);
    setUpdatedReason(favorites[index].reason);
    const updatedFavorites = [...favorites];
    updatedFavorites[index].isEditing = !updatedFavorites[index].isEditing;
    setFavorites(updatedFavorites);
  };

  const handleEditConfirm = (index) => {
    const updatedFavorites = [...favorites];
    updatedFavorites[index].reason = updatedReason;
    updatedFavorites[index].isEditing = false;
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setEditingIndex(null);
  };

  const handleEditCancel = (index) => {
    const updatedFavorites = [...favorites];
    updatedFavorites[index].isEditing = false;
    setFavorites(updatedFavorites);
    setEditingIndex(null);
  };

  const handleConfirmation = (confirmed) => {
    // Hide the confirmation modal
    setShowDeleteConfirmation(false);

    // If user clicks "Yes," add the selected package to favorites
    if (confirmed) {
      const updatedFavorites = [...favorites];
    updatedFavorites.splice(deleteIndex, 1);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setShowDeleteConfirmation(false);

      alert("Package delete successfully");
    } else{
      setShowDeleteConfirmation(false);
    setDeleteIndex(null);
    }
  };

  const handleSubmit = () => {
    navigate("/");
  };

  return (
    <div>
      <div className="flex justify-between m-16 py-1 align-middle">
        <h1>Welcome to Favourite NPM Packages</h1>
        <Button
          classname={
            "w-1/7 bg-blue-600 hover:bg-blue-500 px-3 py-1 border-0 rounded text-white m-5"
          }
          text={"Add Fav"}
          handleSubmit={handleSubmit}
        />
      </div>
      <ul className="border border-black w-80% m-16 py-1">
        <div className="flex justify-around">
          <li><strong>Package name</strong></li>
          <li><strong>Actions</strong></li>
        </div>
        {favorites.map((fav, index) => (
          <li key={index} className="flex items-center justify-between border-b border-gray-300 p-4">
            <span className="w-3/4">{fav.result}</span>
            <div className="w-1/4 flex items-center justify-end space-x-4">
              <FontAwesomeIcon
                icon={fav.isVisible ? faEyeSlash : faEye}
                onClick={() => handleToggleVisibility(index)}
                className="cursor-pointer"
                title={fav.isVisible ? "Hide Reason" : "Show Reason"}
              />
              <FontAwesomeIcon
                icon={fav.isEditing ? faCheck : faEdit}
                onClick={() => (fav.isEditing ? handleEditConfirm(index) : handleToggleEditing(index))}
                className="cursor-pointer"
                title={fav.isEditing ? "Confirm Edit" : "Edit Reason"}
              />
              <FontAwesomeIcon
                icon={fav.isEditing ? faTimes : faTrash}
                onClick={() => handleDelete(index)}
                className="cursor-pointer"
                title={fav.isEditing ? "Cancel Edit" : "Delete"}
              />
            </div>
            {fav.isVisible && (
              <div className="absolute left-1/4 mt-2 p-2 bg-white border border-gray-300 rounded-md">
                <strong>Reason:</strong> {fav.reason}
              </div>
            )}
            {fav.isEditing && (
              <div className="absolute left-1/4 mt-2 p-2 bg-white border border-gray-300 rounded-md">
                <input
                  type="text"
                  value={updatedReason}
                  onChange={(e) => setUpdatedReason(e.target.value)}
                />
              </div>
            )}
          </li>
        ))}
      </ul>
      {/* Delete Confirmation Modal */}
      {showDeleteConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md">
            <p className="mb-4">Are you sure you want to submit?</p>
            <div className="flex justify-between">
              <Button
                text="Yes"
                handleSubmit={() => handleConfirmation(true)}
                classname="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
              />
              <Button
                text="No"
                handleSubmit={() => handleConfirmation(false)}
                classname="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Favourite;
