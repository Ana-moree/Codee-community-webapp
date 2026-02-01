import React, { useMemo, useState } from 'react';
import { ArrowLeft, MessageCircle, X } from 'lucide-react';

function ChatPanel({
  showChat,
  setShowChat,
  selectedConversationId,
  setSelectedConversationId,
  conversations,
  messages,
  messageInput,
  onMessageInputChange,
  onSendMessage,
  onEditMessage,
  onDeleteMessage,
  userProfiles,
  currentHandle,
  currentUserId,
  userIdToHandle,
  typingUsers,
  presenceByHandle
}) {
  const [editingMessageId, setEditingMessageId] = useState(null);
  const [editText, setEditText] = useState('');
  const [menuMessageId, setMenuMessageId] = useState(null);

  const selectedConversation = useMemo(
    () => conversations.find((conversation) => conversation.id === selectedConversationId),
    [conversations, selectedConversationId]
  );

  const resolveConversationLabel = (conversation) => {
    if (!conversation) return { label: '', handle: '' };

    const handles = conversation.memberHandles || [];
    const otherHandle = handles.find((handle) => handle !== currentHandle);
    if (otherHandle) return { label: otherHandle, handle: otherHandle };

    const otherId = (conversation.memberIds || []).find((id) => id !== currentUserId);
    const fallbackHandle = otherId ? userIdToHandle[otherId] : '@user';
    return { label: fallbackHandle, handle: fallbackHandle };
  };

  const handlePrimaryAction = () => {
    if (editingMessageId) {
      if (editText.trim()) {
        onEditMessage(selectedConversationId, editingMessageId, editText.trim());
        setEditingMessageId(null);
        setEditText('');
      }
      return;
    }
    onSendMessage();
  };

  const handleCancelEdit = () => {
    setEditingMessageId(null);
    setEditText('');
  };

  if (!showChat) return null;

  return (
    <div className="chat-panel">
      <div className="chat-header">
        <h2>Messages</h2>
        <button
          className="close-panel"
          onClick={() => {
            setShowChat(false);
            setSelectedConversationId(null);
          }}
          aria-label="Close chat"
        >
          <X size={20} />
        </button>
      </div>

      <div className="chat-content">
        {selectedConversationId && !selectedConversation ? (
          <div className="empty-conversation">
            <MessageCircle size={48} />
            <p>Loading conversation...</p>
          </div>
        ) : selectedConversation ? (
          <div className={`chat-conversation ${editingMessageId ? 'editing' : ''}`}>
            <div className="chat-conversation-header">
              <button className="back-btn" onClick={() => setSelectedConversationId(null)} aria-label="Back">
                <ArrowLeft size={18} />
              </button>

              {(() => {
                const { label, handle } = resolveConversationLabel(selectedConversation);
                const presence = handle ? presenceByHandle[handle] : null;
                return (
                  <div className="chat-user-info">
                    <div className="chat-user-avatar">
                      <img
                        src={userProfiles[handle]?.image || '/character profile pics/profileAda.png'}
                        alt={label}
                      />
                    </div>

                    <div>
                      <div className="chat-username">{label}</div>
                      <div className="chat-user-title">
                        {userProfiles[handle]?.title || 'User'} · {presence?.status === 'online' ? 'Online' : 'Offline'}
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>

            <div className="messages-container">
              {messages.length > 0 ? (
                messages.map((msg) => {
                  const isOwn = msg.senderId === currentUserId;
                  const isDeleted = Boolean(msg.deletedAt);

                  return (
                    <div
                      key={msg.id}
                      className={`message-item ${isOwn ? 'sent' : 'received'}`}
                    >
                      <div className={`message-bubble ${isDeleted ? 'deleted' : ''}`}>
                        {!isDeleted && msg.editedAt && (
                          <span className="message-edited">(edited)</span>
                        )}
                        <p className={isDeleted ? 'message-deleted-text' : ''}>
                          {isDeleted ? 'Deleted message' : msg.text}
                        </p>
                        {isOwn && !isDeleted && (
                          <div className="message-menu">
                            <button
                              className="message-kebab"
                              onClick={(e) => {
                                e.stopPropagation();
                                setMenuMessageId((prev) => (prev === msg.id ? null : msg.id));
                              }}
                              aria-label="Message options"
                              type="button"
                            >
                              ...
                            </button>
                            {menuMessageId === msg.id && (
                              <div className="message-menu-popover">
                                <button
                                  className="message-menu-item"
                                  onClick={() => {
                                    setEditingMessageId(msg.id);
                                    setEditText(msg.text || '');
                                    setMenuMessageId(null);
                                  }}
                                >
                                  Edit
                                </button>
                                <button
                                  className="message-menu-item delete"
                                  onClick={() => {
                                    onDeleteMessage(selectedConversationId, msg.id);
                                    setMenuMessageId(null);
                                  }}
                                >
                                  Delete
                                </button>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="empty-conversation">
                  <MessageCircle size={48} />
                  <p>Start the conversation</p>
                </div>
              )}
            </div>

            <div className="message-input-area">
              {editingMessageId && (
                <div className="edit-message-bar">
                  <span>Edit message</span>
                  <button className="edit-message-cancel" onClick={handleCancelEdit} aria-label="Cancel edit">
                    <X size={16} />
                  </button>
                </div>
              )}
              <div className="message-input-row">
                <input
                  type="text"
                  placeholder={editingMessageId ? 'Edit your message...' : 'Type a message...'}
                  value={editingMessageId ? editText : messageInput}
                  onChange={(e) => {
                    if (editingMessageId) {
                      setEditText(e.target.value);
                    } else {
                      onMessageInputChange(e.target.value);
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && (editingMessageId ? editText.trim() : messageInput.trim())) {
                      handlePrimaryAction();
                    }
                  }}
                  className="message-input"
                  autoFocus={Boolean(editingMessageId)}
                />

                <button
                  className={`send-message-btn ${editingMessageId ? 'save' : ''}`}
                  onClick={handlePrimaryAction}
                  disabled={editingMessageId ? !editText.trim() : !messageInput.trim()}
                >
                  {editingMessageId ? 'Save' : 'Send'}
                </button>
              </div>
            </div>
            {typingUsers.length > 0 && (
              <div className="typing-indicator">
                {typingUsers.map((user) => user.handle || '@user').join(', ')} typing...
              </div>
            )}
          </div>
        ) : (
          <div className="chat-list">
            {conversations.length > 0 ? (
              conversations.map((conversation) => {
                const { label, handle } = resolveConversationLabel(conversation);
                return (
                  <div
                    key={conversation.id}
                    className="chat-list-item"
                    onClick={() => setSelectedConversationId(conversation.id)}
                  >
                    <div className="chat-item-avatar">
                      <img
                        src={userProfiles[handle]?.image || '/character profile pics/profileAda.png'}
                        alt={label}
                      />
                    </div>

                    <div className="chat-item-content">
                      <div className="chat-item-header">
                        <span className="chat-item-username">{label}</span>
                      </div>

                      <p className="chat-item-preview">
                        {conversation.lastMessageText || 'Start a conversation'}
                      </p>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="empty-chat">
                <MessageCircle size={48} />
                <p>No messages yet</p>
                <span className="empty-chat-hint">
                  Click the message button on a user's profile to start chatting
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatPanel;
