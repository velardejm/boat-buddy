'use client';

import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { joinTrip } from '@/lib/data';

interface JoinTripButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  tripId: string;
}

export default function JoinTripButton({ tripId, ...props }: JoinTripButtonProps) {
  const [joinStatus, setJoinStatus] = useState('');
  return (
    <div className={`${props.className}`}>
      <Button
        disabled={props.disabled}
        onClick={async () => {
          const response = await joinTrip(tripId);
          setJoinStatus(response.message);
        }}
      >
        Join Trip
      </Button>
      <p>{joinStatus}</p>
    </div>
  );
}
