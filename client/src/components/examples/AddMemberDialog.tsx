import { AddMemberDialog } from '../AddMemberDialog';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function AddMemberDialogExample() {
  const [open, setOpen] = useState(false);
  const families = [
    {
      id: '1',
      name: 'The Smith Family',
      location: 'New York, NY',
      members: [],
      position: { x: 0, y: 0 }
    },
    {
      id: '2',
      name: 'The Johnson Family',
      location: 'Los Angeles, CA',
      members: [],
      position: { x: 300, y: 0 }
    }
  ];

  return (
    <div className="p-4">
      <Button onClick={() => setOpen(true)}>Open Dialog</Button>
      <AddMemberDialog
        open={open}
        onClose={() => setOpen(false)}
        onAdd={(data) => console.log('Add member:', data)}
        families={families}
        currentFamilyId="1"
      />
    </div>
  );
}
