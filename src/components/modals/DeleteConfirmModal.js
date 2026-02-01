import React from 'react';

function DeleteConfirmModal({ showDeleteConfirm, setShowDeleteConfirm }) {
  if (!showDeleteConfirm) return null;

  return (
    <div className="followers-modal-overlay" onClick={() => setShowDeleteConfirm(false)}>
      <div className="delete-confirm-modal" onClick={(e) => e.stopPropagation()}>
        <div className="delete-confirm-header">
          <h2>Delete Account?</h2>
        </div>
        <div className="delete-confirm-content">
          <p>Are you absolutely sure you want to delete your account?</p>
          <p className="delete-confirm-warning">This will:</p>
          <ul className="delete-confirm-list">
            <li>Permanently delete all your posts and comments</li>
            <li>Remove all your achievements and progress</li>
            <li>Delete your profile and personal information</li>
            <li>Remove you from all leaderboards</li>
          </ul>
          <p className="delete-confirm-final"><strong>This action cannot be undone.</strong></p>
        </div>
        <div className="delete-confirm-footer">
          <button
            className="cancel-btn"
            onClick={() => setShowDeleteConfirm(false)}
          >
            Cancel
          </button>
          <button
            className="confirm-delete-btn"
            onClick={() => {
              // Handle account deletion
              alert('Account deleted');
              setShowDeleteConfirm(false);
            }}
          >
            Delete My Account
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmModal;
