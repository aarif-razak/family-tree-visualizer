import { EditFamilyDialog } from '../EditFamilyDialog';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function EditFamilyDialogExample() {
  const [open, setOpen] = useState(false);
  const family = {
    id: '1',
    name: 'The Smith Family',
    location: 'New York, NY',
    members: [],
    position: { x: 0, y: 0 }
  };

  return (
    <div className="p-4">
      <Button onClick={() => setOpen(true)}>Open Dialog</Button>
      <EditFamilyDialog
        open={open}
        onClose={() => setOpen(false)}
        onSave={(data) => console.log('Save family:', data)}
        family={family}
      />
    </div>
  );
}
