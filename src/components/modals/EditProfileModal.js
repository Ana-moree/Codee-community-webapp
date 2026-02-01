import React from 'react';

function EditProfileModal({
  showEditProfile,
  setShowEditProfile,
  editBioText,
  setEditBioText,
  onSaveBio,
  currentUser
}) {
  if (!showEditProfile) return null;

  return (
    <div className="followers-modal-overlay" onClick={() => setShowEditProfile(false)}>
      <div className="edit-profile-modal" onClick={(e) => e.stopPropagation()}>
        <div className="followers-modal-header">
          <h2>Edit Profile</h2>
          <button className="close-panel" onClick={() => setShowEditProfile(false)}>
            ×
          </button>
        </div>
        <div className="edit-profile-content">
          <div className="edit-field">
            <label className="edit-label">Bio</label>
            <textarea
              className="edit-bio-textarea"
              placeholder="Tell us about yourself..."
              value={editBioText}
              onChange={(e) => setEditBioText(e.target.value)}
              maxLength={150}
            />
            <span className="char-count">{editBioText.length}/150</span>
          </div>
        </div>
        <div className="edit-profile-footer">
          <button
            className="cancel-btn"
            onClick={() => setShowEditProfile(false)}
          >
            Cancel
          </button>
          <button
            className="save-btn"
            onClick={() => {
              onSaveBio(editBioText);
              setShowEditProfile(false);
            }}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditProfileModal;
