import React, { useState } from 'react';

interface ExpandableTextProps {
  text: string;
  maxLength?: number;
}

function ExpandableText({ text, maxLength = 200 }: ExpandableTextProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleDescription = () => setIsExpanded(!isExpanded);

  const displayText = isExpanded ? text : text.slice(0, maxLength) + (text.length > maxLength ? '...' : '');

  return (
    <div>
      <p className='text-nomad-black text-[1.6rem]'>{displayText}</p>
      <button className='text-green-dark text-[1.6rem] font-bold cursor-pointer' onClick={toggleDescription}>
        {isExpanded ? '간략히 보기' : '더보기'}
      </button>
    </div>
  );
}

export default ExpandableText;
