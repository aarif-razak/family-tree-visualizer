import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import type { Family } from "./FamilyNode";

interface AddMemberDialogProps {
  open: boolean;
  onClose: () => void;
  onAdd: (data: {
    name: string;
    relationship: string;
    age?: number;
    relativeOf?: {
      familyId: string;
      familyName: string;
      relationship: string;
    };
  }) => void;
  families: Family[];
  currentFamilyId: string;
}

export function AddMemberDialog({ open, onClose, onAdd, families, currentFamilyId }: AddMemberDialogProps) {
  const [name, setName] = useState("");
  const [relationship, setRelationship] = useState("");
  const [age, setAge] = useState("");
  const [relativeOfFamily, setRelativeOfFamily] = useState("");
  const [relativeOfRelationship, setRelativeOfRelationship] = useState("");

  const otherFamilies = (families || []).filter(f => f.id !== currentFamilyId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && relationship.trim()) {
      const selectedRelativeFamily = families.find(f => f.id === relativeOfFamily);
      
      onAdd({
        name,
        relationship,
        age: age ? parseInt(age) : undefined,
        relativeOf: relativeOfFamily && relativeOfRelationship && selectedRelativeFamily ? {
          familyId: relativeOfFamily,
          familyName: selectedRelativeFamily.name,
          relationship: relativeOfRelationship,
        } : undefined,
      });
      setName("");
      setRelationship("");
      setAge("");
      setRelativeOfFamily("");
      setRelativeOfRelationship("");
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent data-testid="dialog-add-member" className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Family Member</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="member-name">Name</Label>
            <Input
              id="member-name"
              placeholder="e.g., John Smith"
              value={name}
              onChange={(e) => setName(e.target.value)}
              data-testid="input-member-name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="member-relationship">Relationship (in this family)</Label>
            <Input
              id="member-relationship"
              placeholder="e.g., Father, Mother, Son, Daughter"
              value={relationship}
              onChange={(e) => setRelationship(e.target.value)}
              data-testid="input-member-relationship"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="member-age">Age (Optional)</Label>
            <Input
              id="member-age"
              type="number"
              placeholder="e.g., 45"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              data-testid="input-member-age"
            />
          </div>

          {otherFamilies.length > 0 && (
            <>
              <div className="border-t pt-4">
                <h4 className="text-sm font-medium mb-3">Related to Another Family (Optional)</h4>
                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label htmlFor="relative-family">Family</Label>
                    <Select value={relativeOfFamily} onValueChange={setRelativeOfFamily}>
                      <SelectTrigger id="relative-family" data-testid="select-relative-family">
                        <SelectValue placeholder="Select a family" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">None</SelectItem>
                        {otherFamilies.map(family => (
                          <SelectItem key={family.id} value={family.id}>
                            {family.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {relativeOfFamily && (
                    <div className="space-y-2">
                      <Label htmlFor="relative-relationship">Relationship to that family</Label>
                      <Input
                        id="relative-relationship"
                        placeholder="e.g., Brother, Sister, Uncle, Aunt"
                        value={relativeOfRelationship}
                        onChange={(e) => setRelativeOfRelationship(e.target.value)}
                        data-testid="input-relative-relationship"
                      />
                    </div>
                  )}
                </div>
              </div>
            </>
          )}

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose} data-testid="button-cancel-member">
              Cancel
            </Button>
            <Button type="submit" data-testid="button-submit-member">
              Add Member
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
