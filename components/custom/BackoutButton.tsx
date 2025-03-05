'use client';

import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { joinTrip } from '@/lib/data';

interface BackoutButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  //   tripId: string;
}

// export default function BackoutButton({ tripId }: { tripId: string }) {
export default function BackoutButton({ ...props }: BackoutButtonProps) {
  //   const [joinStatus, setJoinStatus] = useState('');
  return (
    <div>
      <Button
        className={props.className}
        variant={'destructive'}
        onClick={async () => {
          //   const response = await joinTrip(tripId);
          //   setJoinStatus(response.message);
          alert('Backout button test');
        }}
      >
        Backout
      </Button>
      {/* <p>{joinStatus}</p> */}
    </div>
  );
}
