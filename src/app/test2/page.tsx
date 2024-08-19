'use client'
import React, { useState } from 'react';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';

const EmojiTextArea = () => {
  const [text, setText] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const maxCharacters = 2200;

  // Correct handler to extract the emoji object
  const handleEmojiClick = (emojiData: EmojiClickData, event: MouseEvent) => {
    console.log("emoji object", emojiData);  // This should log the correct emoji object
    setText((prevText) => prevText + emojiData.emoji);
    setShowEmojiPicker(false);
  };

  const handleTextChange = (e : React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= maxCharacters) {
      setText(e.target.value);
    }
  };

  return (
    <div className="emoji-textarea-container" style={{ position: 'relative', width: '100%', maxWidth: '500px' }}>
      <textarea
        value={text}
        onChange={handleTextChange}
        placeholder="Type something..."
        rows={5}
        style={{ width: '100%', padding: '10px', fontSize: '16px', resize: 'none' }}
      />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0' }}>
        <button
          onClick={() => setShowEmojiPicker((val) => !val)}
          style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '24px' }}
        >
          😊
        </button>
        <span>{text.length}/{maxCharacters}</span>
      </div>
      {showEmojiPicker && (
        <div style={{ position: 'absolute', bottom: '50px', left: '10px', zIndex: 100 }}>
          <EmojiPicker onEmojiClick={handleEmojiClick} />
        </div>
      )}
    </div>
  );
};

export default EmojiTextArea;
