import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface AddFamilyDialogProps {
  open: boolean;
  onClose: () => void;
  onAdd: (data: { name: string; location: string }) => void;
  parentId?: string;
}

export function AddFamilyDialog({ open, onClose, onAdd, parentId }: AddFamilyDialogProps) {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onAdd({ name, location });
      setName("");
      setLocation("");
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent data-testid="dialog-add-family">
        <DialogHeader>
          <DialogTitle>
            {parentId ? "Add Child Family" : "Add Family"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="family-name">Family Name</Label>
            <Input
              id="family-name"
              placeholder="e.g., The Smith Family"
              value={name}
              onChange={(e) => setName(e.target.value)}
              data-testid="input-family-name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="family-location">Location (Optional)</Label>
            <Input
              id="family-location"
              placeholder="e.g., New York, NY"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              data-testid="input-family-location"
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose} data-testid="button-cancel-family">
              Cancel
            </Button>
            <Button type="submit" data-testid="button-submit-family">
              Add Family
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
