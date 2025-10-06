import { useState, useRef } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FamilyNode, type Family } from "./FamilyNode";
import { AddFamilyDialog } from "./AddFamilyDialog";
import { EditFamilyDialog } from "./EditFamilyDialog";
import { AddMemberDialog } from "./AddMemberDialog";
import { EditMemberDialog } from "./EditMemberDialog";
import { ZoomControls } from "./ZoomControls";
import type { Member } from "./MemberRow";

export function FamilyTreeCanvas() {
  const [families, setFamilies] = useState<Family[]>([]);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const [addFamilyOpen, setAddFamilyOpen] = useState(false);
  const [editFamilyOpen, setEditFamilyOpen] = useState(false);
  const [addMemberOpen, setAddMemberOpen] = useState(false);
  const [editMemberOpen, setEditMemberOpen] = useState(false);

  const [currentParentId, setCurrentParentId] = useState<string | undefined>();
  const [currentFamily, setCurrentFamily] = useState<Family | null>(null);
  const [currentFamilyForMember, setCurrentFamilyForMember] = useState<string | null>(null);
  const [currentMember, setCurrentMember] = useState<{ familyId: string; member: Member } | null>(null);

  const canvasRef = useRef<HTMLDivElement>(null);

  const handleAddFamily = (data: { name: string; location: string }) => {
    const newFamily: Family = {
      id: Date.now().toString(),
      name: data.name,
      location: data.location,
      members: [],
      position: {
        x: currentParentId ? 
          (families.find(f => f.id === currentParentId)?.position.x || 100) + 300 :
          100 + families.length * 320,
        y: currentParentId ?
          (families.find(f => f.id === currentParentId)?.position.y || 100) + 200 :
          100,
      },
      parentId: currentParentId,
    };
    setFamilies([...families, newFamily]);
    setCurrentParentId(undefined);
  };

  const handleEditFamily = (data: { name: string; location: string }) => {
    if (!currentFamily) return;
    setFamilies(families.map(f => {
      if (f.id === currentFamily.id) {
        return { ...f, name: data.name, location: data.location };
      }
      const updatedMembers = f.members.map(m => {
        if (m.relativeOf?.familyId === currentFamily.id) {
          return {
            ...m,
            relativeOf: {
              ...m.relativeOf,
              familyName: data.name,
            }
          };
        }
        return m;
      });
      return { ...f, members: updatedMembers };
    }));
  };

  const handleDeleteFamily = (id: string) => {
    setFamilies(families.filter(f => f.id !== id && f.parentId !== id).map(f => ({
      ...f,
      members: f.members.map(m => {
        if (m.relativeOf?.familyId === id) {
          const { relativeOf, ...rest } = m;
          return rest;
        }
        return m;
      })
    })));
  };

  const handleAddMember = (data: { 
    name: string; 
    relationship: string; 
    age?: number; 
    relativeOf?: { familyId: string; familyName: string; relationship: string };
  }) => {
    if (!currentFamilyForMember) return;
    const newMember: Member = {
      id: Date.now().toString(),
      name: data.name,
      relationship: data.relationship,
      age: data.age,
      relativeOf: data.relativeOf,
    };
    setFamilies(families.map(f =>
      f.id === currentFamilyForMember
        ? { ...f, members: [...f.members, newMember] }
        : f
    ));
    setCurrentFamilyForMember(null);
  };

  const handleEditMember = (data: { 
    name: string; 
    relationship: string; 
    age?: number; 
    relativeOf?: { familyId: string; familyName: string; relationship: string };
  }) => {
    if (!currentMember) return;
    setFamilies(families.map(f =>
      f.id === currentMember.familyId
        ? {
            ...f,
            members: f.members.map(m =>
              m.id === currentMember.member.id
                ? { 
                    ...m, 
                    name: data.name, 
                    relationship: data.relationship, 
                    age: data.age, 
                    relativeOf: data.relativeOf,
                  }
                : m
            ),
          }
        : f
    ));
  };

  const handleDeleteMember = (familyId: string, memberId: string) => {
    setFamilies(families.map(f =>
      f.id === familyId
        ? { ...f, members: f.members.filter(m => m.id !== memberId) }
        : f
    ));
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target === canvasRef.current) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPan({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    setZoom(Math.max(0.5, Math.min(2, zoom + delta)));
  };

  const drawConnections = () => {
    const connections: JSX.Element[] = [];
    families.forEach((family) => {
      if (family.parentId) {
        const parent = families.find(f => f.id === family.parentId);
        if (parent) {
          const x1 = parent.position.x + 240;
          const y1 = parent.position.y + 100;
          const x2 = family.position.x;
          const y2 = family.position.y + 100;
          
          const midX = (x1 + x2) / 2;
          
          connections.push(
            <path
              key={`${family.parentId}-${family.id}`}
              d={`M ${x1} ${y1} C ${midX} ${y1}, ${midX} ${y2}, ${x2} ${y2}`}
              stroke="hsl(var(--primary))"
              strokeWidth="2"
              fill="none"
              data-testid={`connection-${family.parentId}-${family.id}`}
            />
          );
        }
      }
    });
    return connections;
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-background">
      <div className="absolute top-0 left-0 right-0 h-16 bg-card border-b border-card-border flex items-center justify-between px-6 z-10">
        <h1 className="text-2xl font-bold" data-testid="text-app-title">Family Tree Visualizer</h1>
        <Button
          onClick={() => {
            setCurrentParentId(undefined);
            setAddFamilyOpen(true);
          }}
          data-testid="button-add-root-family"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Family
        </Button>
      </div>

      <div
        ref={canvasRef}
        className="absolute inset-0 top-16 cursor-move"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
        data-testid="canvas-family-tree"
      >
        <div
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
            transformOrigin: "0 0",
            width: "100%",
            height: "100%",
            position: "relative",
          }}
        >
          <svg
            className="absolute inset-0 pointer-events-none"
            style={{ width: "100%", height: "100%", overflow: "visible" }}
          >
            {drawConnections()}
          </svg>

          {families.map((family) => (
            <FamilyNode
              key={family.id}
              family={family}
              onEdit={(f) => {
                setCurrentFamily(f);
                setEditFamilyOpen(true);
              }}
              onDelete={handleDeleteFamily}
              onAddMember={(id) => {
                setCurrentFamilyForMember(id);
                setAddMemberOpen(true);
              }}
              onEditMember={(fId, member) => {
                setCurrentMember({ familyId: fId, member });
                setEditMemberOpen(true);
              }}
              onDeleteMember={handleDeleteMember}
              onAddChild={(parentId) => {
                setCurrentParentId(parentId);
                setAddFamilyOpen(true);
              }}
            />
          ))}
        </div>
      </div>

      <ZoomControls
        zoom={zoom}
        onZoomIn={() => setZoom(Math.min(zoom + 0.1, 2))}
        onZoomOut={() => setZoom(Math.max(zoom - 0.1, 0.5))}
        onReset={() => {
          setZoom(1);
          setPan({ x: 0, y: 0 });
        }}
      />

      <AddFamilyDialog
        open={addFamilyOpen}
        onClose={() => {
          setAddFamilyOpen(false);
          setCurrentParentId(undefined);
        }}
        onAdd={handleAddFamily}
        parentId={currentParentId}
      />

      <EditFamilyDialog
        open={editFamilyOpen}
        onClose={() => setEditFamilyOpen(false)}
        onSave={handleEditFamily}
        family={currentFamily}
      />

      <AddMemberDialog
        open={addMemberOpen}
        onClose={() => {
          setAddMemberOpen(false);
          setCurrentFamilyForMember(null);
        }}
        onAdd={handleAddMember}
        families={families}
        currentFamilyId={currentFamilyForMember || ""}
      />

      <EditMemberDialog
        open={editMemberOpen}
        onClose={() => setEditMemberOpen(false)}
        onSave={handleEditMember}
        member={currentMember?.member || null}
        families={families}
        currentFamilyId={currentMember?.familyId || ""}
      />
    </div>
  );
}
