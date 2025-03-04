'use client';
import { Button } from '@/components/ui/button';
import { joinTrip } from '@/lib/data';

export default function JoinTripButton() {
  return (
    <Button
      onClick={() => {
        joinTrip();
      }}
    >
      Test
    </Button>
  );
}
