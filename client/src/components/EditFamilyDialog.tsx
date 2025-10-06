import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import type { Family } from "./FamilyNode";

interface EditFamilyDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: { name: string; location: string }) => void;
  family: Family | null;
}

export function EditFamilyDialog({ open, onClose, onSave, family }: EditFamilyDialogProps) {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    if (family) {
      setName(family.name);
      setLocation(family.location || "");
    }
  }, [family]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onSave({ name, location });
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent data-testid="dialog-edit-family">
        <DialogHeader>
          <DialogTitle>Edit Family</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="edit-family-name">Family Name</Label>
            <Input
              id="edit-family-name"
              placeholder="e.g., The Smith Family"
              value={name}
              onChange={(e) => setName(e.target.value)}
              data-testid="input-edit-family-name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-family-location">Location (Optional)</Label>
            <Input
              id="edit-family-location"
              placeholder="e.g., New York, NY"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              data-testid="input-edit-family-location"
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose} data-testid="button-cancel-edit-family">
              Cancel
            </Button>
            <Button type="submit" data-testid="button-save-family">
              Save Changes
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
