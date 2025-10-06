import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useEffect } from "react";
import type { Member } from "./MemberRow";
import type { Family } from "./FamilyNode";

interface EditMemberDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: {
    name: string;
    relationship: string;
    age?: number;
    relativeOf?: {
      familyId: string;
      familyName: string;
      relationship: string;
    };
  }) => void;
  member: Member | null;
  families: Family[];
  currentFamilyId: string;
}

export function EditMemberDialog({ open, onClose, onSave, member, families, currentFamilyId }: EditMemberDialogProps) {
  const [name, setName] = useState("");
  const [relationship, setRelationship] = useState("");
  const [age, setAge] = useState("");
  const [relativeOfFamily, setRelativeOfFamily] = useState("");
  const [relativeOfRelationship, setRelativeOfRelationship] = useState("");

  const otherFamilies = (families || []).filter(f => f.id !== currentFamilyId);

  useEffect(() => {
    if (member) {
      setName(member.name);
      setRelationship(member.relationship);
      setAge(member.age?.toString() || "");
      setRelativeOfFamily(member.relativeOf?.familyId || "");
      setRelativeOfRelationship(member.relativeOf?.relationship || "");
    }
  }, [member]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && relationship.trim()) {
      const selectedRelativeFamily = families.find(f => f.id === relativeOfFamily);
      
      onSave({
        name,
        relationship,
        age: age ? parseInt(age) : undefined,
        relativeOf: relativeOfFamily && relativeOfRelationship && selectedRelativeFamily ? {
          familyId: relativeOfFamily,
          familyName: selectedRelativeFamily.name,
          relationship: relativeOfRelationship,
        } : undefined,
      });
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent data-testid="dialog-edit-member" className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Family Member</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="edit-member-name">Name</Label>
            <Input
              id="edit-member-name"
              placeholder="e.g., John Smith"
              value={name}
              onChange={(e) => setName(e.target.value)}
              data-testid="input-edit-member-name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-member-relationship">Relationship (in this family)</Label>
            <Input
              id="edit-member-relationship"
              placeholder="e.g., Father, Mother, Son, Daughter"
              value={relationship}
              onChange={(e) => setRelationship(e.target.value)}
              data-testid="input-edit-member-relationship"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-member-age">Age (Optional)</Label>
            <Input
              id="edit-member-age"
              type="number"
              placeholder="e.g., 45"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              data-testid="input-edit-member-age"
            />
          </div>

          {otherFamilies.length > 0 && (
            <>
              <div className="border-t pt-4">
                <h4 className="text-sm font-medium mb-3">Related to Another Family (Optional)</h4>
                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label htmlFor="edit-relative-family">Family</Label>
                    <Select value={relativeOfFamily} onValueChange={setRelativeOfFamily}>
                      <SelectTrigger id="edit-relative-family" data-testid="select-edit-relative-family">
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
                      <Label htmlFor="edit-relative-relationship">Relationship to that family</Label>
                      <Input
                        id="edit-relative-relationship"
                        placeholder="e.g., Brother, Sister, Uncle, Aunt"
                        value={relativeOfRelationship}
                        onChange={(e) => setRelativeOfRelationship(e.target.value)}
                        data-testid="input-edit-relative-relationship"
                      />
                    </div>
                  )}
                </div>
              </div>
            </>
          )}

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose} data-testid="button-cancel-edit-member">
              Cancel
            </Button>
            <Button type="submit" data-testid="button-save-member">
              Save Changes
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
