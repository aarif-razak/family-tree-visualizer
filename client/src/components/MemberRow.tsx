import { Pencil, Trash2, User, Link2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export interface Member {
  id: string;
  name: string;
  relationship: string;
  age?: number;
  relativeOf?: {
    familyId: string;
    familyName: string;
    relationship: string;
  };
}

interface MemberRowProps {
  member: Member;
  onEdit: (member: Member) => void;
  onDelete: (id: string) => void;
}

export function MemberRow({ member, onEdit, onDelete }: MemberRowProps) {
  return (
    <div className="group flex flex-col gap-1 p-2 rounded-md hover-elevate">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-member-node flex-shrink-0" />
        <User className="h-4 w-4 text-muted-foreground flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="font-medium text-sm" data-testid={`text-member-name-${member.id}`}>
              {member.name}
            </span>
            <span className="text-xs text-muted-foreground" data-testid={`text-member-relationship-${member.id}`}>
              {member.relationship}
            </span>
            {member.age && (
              <span className="text-xs text-muted-foreground" data-testid={`text-member-age-${member.id}`}>
                {member.age}y
              </span>
            )}
          </div>
        </div>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            size="icon"
            variant="ghost"
            className="h-7 w-7"
            onClick={() => onEdit(member)}
            data-testid={`button-edit-member-${member.id}`}
          >
            <Pencil className="h-3 w-3" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="h-7 w-7"
            onClick={() => onDelete(member.id)}
            data-testid={`button-delete-member-${member.id}`}
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      </div>
      
      {member.relativeOf && (
        <div className="flex items-center gap-1 ml-6 pl-2">
          <Link2 className="h-3 w-3 text-muted-foreground" />
          <Badge variant="outline" className="text-xs" data-testid={`badge-relative-${member.id}`}>
            {member.relativeOf.relationship} of {member.relativeOf.familyName}
          </Badge>
        </div>
      )}
    </div>
  );
}
