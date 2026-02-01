import React from 'react';

function SettingsView({
  settingsTab,
  setSettingsTab,
  editEmail,
  userEmail,
  setEditEmail,
  setUserEmail,
  editUsername,
  userName,
  setEditUsername,
  setUserName,
  currentPasswordInput,
  setCurrentPasswordInput,
  editPassword,
  setEditPassword,
  confirmPassword,
  setConfirmPassword,
  passwordError,
  setPasswordError,
  validatePasswords,
  userPassword,
  setUserPassword,
  setConfirmationMessage,
  setShowConfirmation,
  setShowDeleteConfirm,
  isAdmin,
  seedSecret,
  setSeedSecret,
  seedStatus,
  onSeedMockPosts
}) {
  return (
    <div className="settings-view">
      <div className="settings-header">
        <div className="settings-header-content">
          <div className="settings-icon">
            <img
              src="/settings.png"
              alt="Settings"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '20px'
              }}
            />
          </div>
          <div className="settings-header-text">
            <h1>Settings</h1>
            <p>Manage your account preferences and security</p>
          </div>
        </div>
      </div>

      <div className="settings-tabs-wrapper">
        <div className="settings-tabs">
          <button
            onClick={() => setSettingsTab('account')}
            className={`settings-tab ${settingsTab === 'account' ? 'active' : ''}`}
          >
            Account
          </button>
          <button
            onClick={() => setSettingsTab('security')}
            className={`settings-tab ${settingsTab === 'security' ? 'active' : ''}`}
          >
            Security
          </button>
          <button
            onClick={() => setSettingsTab('danger')}
            className={`settings-tab ${settingsTab === 'danger' ? 'active' : ''}`}
          >
            Danger Zone
          </button>
          {isAdmin && (
            <button
              onClick={() => setSettingsTab('admin')}
              className={`settings-tab ${settingsTab === 'admin' ? 'active' : ''}`}
            >
              Admin
            </button>
          )}
        </div>
      </div>

      <div className="settings-content">
        {settingsTab === 'account' && (
          <div className="settings-section">
            <div className="settings-card">
              <div className="settings-card-header">
                <h3>Email Address</h3>
                <p>Your email address for account notifications</p>
              </div>
              <div className="settings-card-body">
                <div className="settings-field-group">
                  <input
                    type="email"
                    className="settings-input"
                    value={editEmail || userEmail}
                    onChange={(e) => setEditEmail(e.target.value)}
                    placeholder="Email address"
                  />
                  <button
                    className="settings-save-btn"
                    onClick={() => {
                      if (editEmail && editEmail !== userEmail) {
                        setUserEmail(editEmail);
                        setEditEmail('');
                        setConfirmationMessage('Email updated successfully!');
                        setShowConfirmation(true);
                        setTimeout(() => setShowConfirmation(false), 3000);
                      }
                    }}
                    disabled={!editEmail || editEmail === userEmail}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>

            <div className="settings-card">
              <div className="settings-card-header">
                <h3>Username</h3>
                <p>Your unique username for the platform</p>
              </div>
              <div className="settings-card-body">
                <div className="settings-field-group">
                  <input
                    type="text"
                    className="settings-input"
                    value={editUsername || userName}
                    onChange={(e) => setEditUsername(e.target.value)}
                    placeholder="Username"
                  />
                  <button
                    className="settings-save-btn"
                    onClick={() => {
                      if (editUsername && editUsername !== userName) {
                        setUserName(editUsername);
                        setEditUsername('');
                        setConfirmationMessage('Username updated successfully!');
                        setShowConfirmation(true);
                        setTimeout(() => setShowConfirmation(false), 3000);
                      }
                    }}
                    disabled={!editUsername || editUsername === userName}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {settingsTab === 'security' && (
          <div className="settings-section">
            <div className="settings-card">
              <div className="settings-card-header">
                <h3>Change Password</h3>
                <p>Update your password to keep your account secure</p>
              </div>
              <div className="settings-card-body">
                <div className="settings-field-group-vertical">
                  <input
                    type="password"
                    className="settings-input"
                    placeholder="Current password"
                    value={currentPasswordInput}
                    onChange={(e) => setCurrentPasswordInput(e.target.value)}
                  />

                  <input
                    type="password"
                    className="settings-input"
                    value={editPassword}
                    onChange={(e) => setEditPassword(e.target.value)}
                    placeholder="New password"
                  />
                  <input
                    type="password"
                    className="settings-input"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      setPasswordError('');
                    }}
                  />
                  {passwordError && (
                    <div className="password-error">
                      {passwordError}
                    </div>
                  )}
                  <button
                    className="settings-save-btn-block"
                    onClick={() => {
                      if (currentPasswordInput !== userPassword) {
                        setPasswordError('Current password is incorrect');
                        return;
                      }

                      if (!validatePasswords() || !editPassword) {
                        setPasswordError('Passwords do not match');
                        return;
                      }

                      setUserPassword(editPassword);

                      setCurrentPasswordInput('');
                      setEditPassword('');
                      setConfirmPassword('');
                      setPasswordError('');

                      setConfirmationMessage('Password updated successfully!');
                      setShowConfirmation(true);
                      setTimeout(() => setShowConfirmation(false), 3000);
                    }}
                    disabled={!currentPasswordInput || !editPassword || !confirmPassword}
                  >
                    Update Password
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {settingsTab === 'danger' && (
          <div className="settings-section">
            <div className="settings-card danger-card">
              <div className="settings-card-header">
                <h3>Delete Account</h3>
                <p>Permanently delete your account and all associated data</p>
              </div>
              <div className="settings-card-body">
                <div className="danger-warning">
                  <p><strong>Warning:</strong> This action cannot be undone. All your data, posts, and progress will be permanently deleted.</p>
                </div>
                <button
                  className="delete-account-btn"
                  onClick={() => setShowDeleteConfirm(true)}
                >
                  Delete My Account
                </button>
              </div>
            </div>
          </div>
        )}

        {settingsTab === 'admin' && isAdmin && (
          <div className="settings-section">
            <div className="settings-card admin-card">
              <div className="settings-card-header">
                <h3>Admin Tools</h3>
                <p>Seed mock data for testing</p>
              </div>
              <div className="settings-card-body">
                <div className="settings-field-group">
                  <input
                    type="password"
                    className="settings-input"
                    value={seedSecret}
                    onChange={(e) => setSeedSecret(e.target.value)}
                    placeholder="Seed secret"
                  />
                  <button
                    className="settings-save-btn"
                    onClick={onSeedMockPosts}
                    disabled={!seedSecret.trim()}
                  >
                    Seed Mock Posts
                  </button>
                </div>
                {seedStatus && (
                  <div className="settings-status">
                    {seedStatus}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SettingsView;
