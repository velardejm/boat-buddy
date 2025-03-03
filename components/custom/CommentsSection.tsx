'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const CommentsSection = () => {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<string[]>([]);

  const handleAddComment = () => {
    if (comment.trim()) {
      setComments([...comments, comment.trim()]);
      setComment('');
    }
  };

  return (
    <div className='mt-8'>
      <h2 className='text-xl font-bold mb-4'>Comments</h2>
      <div className='space-y-4'>
        {comments.map((c, index) => (
          <Card key={index} className='p-4'>
            <div className='flex items-start space-x-4'>
              <Avatar>
                <AvatarImage src='/avatar-placeholder.png' alt='User Avatar' />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <div>
                <p className='text-sm'>{c}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
      <div className='mt-4'>
        <Textarea
          placeholder='Add a comment...'
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className='mb-2'
        />
        <Button onClick={handleAddComment}>Post Comment</Button>
      </div>
    </div>
  );
};

export default CommentsSection;
