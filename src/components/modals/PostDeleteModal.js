import React from 'react';

function PostDeleteModal({ isOpen, postPreview, onConfirm, onCancel }) {
  if (!isOpen) return null;

  return (
    <div className="post-delete-overlay" onClick={onCancel}>
      <div className="post-delete-modal" onClick={(e) => e.stopPropagation()}>
        <div className="post-delete-header">
          <h2>Delete post?</h2>
        </div>
        <p className="post-delete-text">
          This post will be permanently removed and can’t be undone.
        </p>
        {postPreview && (
          <div className="post-delete-preview">
            <span className="post-delete-author">{postPreview.username}</span>
            <span className="post-delete-snippet">{postPreview.content}</span>
          </div>
        )}
        <div className="post-delete-actions">
          <button className="post-delete-cancel" onClick={onCancel}>
            Cancel
          </button>
          <button className="post-delete-confirm" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default PostDeleteModal;
