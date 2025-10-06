import { AddFamilyDialog } from '../AddFamilyDialog';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function AddFamilyDialogExample() {
  const [open, setOpen] = useState(false);

  return (
    <div className="p-4">
      <Button onClick={() => setOpen(true)}>Open Dialog</Button>
      <AddFamilyDialog
        open={open}
        onClose={() => setOpen(false)}
        onAdd={(data) => console.log('Add family:', data)}
      />
    </div>
  );
}
