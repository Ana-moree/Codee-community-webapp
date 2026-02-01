import React from 'react';

function ConfirmationToast({ showConfirmation, confirmationMessage }) {
  if (!showConfirmation) return null;

  return (
    <div className="confirmation-toast">
      <div className="confirmation-content">
        <div className="confirmation-icon">✓</div>
        <span>{confirmationMessage}</span>
      </div>
    </div>
  );
}

export default ConfirmationToast;
