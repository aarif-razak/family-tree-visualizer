import { useState } from "react";
import { ChevronDown, ChevronUp, MapPin, Pencil, Plus, Trash2, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MemberRow, type Member } from "./MemberRow";

export interface Family {
  id: string;
  name: string;
  location?: string;
  members: Member[];
  position: { x: number; y: number };
  parentId?: string;
}

interface FamilyNodeProps {
  family: Family;
  onEdit: (family: Family) => void;
  onDelete: (id: string) => void;
  onAddMember: (familyId: string) => void;
  onEditMember: (familyId: string, member: Member) => void;
  onDeleteMember: (familyId: string, memberId: string) => void;
  onAddChild: (parentId: string) => void;
}

export function FamilyNode({
  family,
  onEdit,
  onDelete,
  onAddMember,
  onEditMember,
  onDeleteMember,
  onAddChild,
}: FamilyNodeProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card
      className="w-60 shadow-lg hover-elevate"
      style={{
        position: "absolute",
        left: family.position.x,
        top: family.position.y,
      }}
      data-testid={`card-family-${family.id}`}
    >
      <CardHeader className="p-3 pb-2 space-y-0">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold truncate" data-testid={`text-family-name-${family.id}`}>
              {family.name}
            </h3>
            {family.location && (
              <div className="flex items-center gap-1 mt-1">
                <MapPin className="h-3 w-3 text-muted-foreground" />
                <span className="text-xs font-mono text-muted-foreground" data-testid={`text-family-location-${family.id}`}>
                  {family.location}
                </span>
              </div>
            )}
          </div>
          <div className="flex gap-1">
            <Button
              size="icon"
              variant="ghost"
              className="h-7 w-7"
              onClick={() => onEdit(family)}
              data-testid={`button-edit-family-${family.id}`}
            >
              <Pencil className="h-3 w-3" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="h-7 w-7"
              onClick={() => setIsExpanded(!isExpanded)}
              data-testid={`button-expand-family-${family.id}`}
            >
              {isExpanded ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-3 pt-2 space-y-2">
        {!isExpanded ? (
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-xs" data-testid={`badge-member-count-${family.id}`}>
              <Users className="h-3 w-3 mr-1" />
              {family.members.length} {family.members.length === 1 ? "member" : "members"}
            </Badge>
          </div>
        ) : (
          <div className="space-y-1">
            {family.members.map((member) => (
              <MemberRow
                key={member.id}
                member={member}
                onEdit={(m) => onEditMember(family.id, m)}
                onDelete={(id) => onDeleteMember(family.id, id)}
              />
            ))}
            <Button
              variant="outline"
              size="sm"
              className="w-full mt-2"
              onClick={() => onAddMember(family.id)}
              data-testid={`button-add-member-${family.id}`}
            >
              <Plus className="h-3 w-3 mr-1" />
              Add Member
            </Button>
          </div>
        )}

        <div className="flex gap-2 pt-1">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={() => onAddChild(family.id)}
            data-testid={`button-add-child-family-${family.id}`}
          >
            <Plus className="h-3 w-3 mr-1" />
            Add Child Family
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8"
            onClick={() => onDelete(family.id)}
            data-testid={`button-delete-family-${family.id}`}
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
