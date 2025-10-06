import { EditMemberDialog } from '../EditMemberDialog';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function EditMemberDialogExample() {
  const [open, setOpen] = useState(false);
  const member = {
    id: '1',
    name: 'John Smith',
    relationship: 'Father',
    age: 45
  };

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
      <EditMemberDialog
        open={open}
        onClose={() => setOpen(false)}
        onSave={(data) => console.log('Save member:', data)}
        member={member}
        families={families}
        currentFamilyId="1"
      />
    </div>
  );
}
