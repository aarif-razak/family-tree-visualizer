import { FamilyNode } from '../FamilyNode';

export default function FamilyNodeExample() {
  const family = {
    id: '1',
    name: 'The Smith Family',
    location: 'New York, NY',
    members: [
      { id: '1', name: 'John Smith', relationship: 'Father', age: 45 },
      { id: '2', name: 'Jane Smith', relationship: 'Mother', age: 43 },
      { id: '3', name: 'Mike Smith', relationship: 'Son', age: 18 },
    ],
    position: { x: 50, y: 50 }
  };

  return (
    <div className="relative w-full h-96 bg-background">
      <FamilyNode
        family={family}
        onEdit={(f) => console.log('Edit family:', f)}
        onDelete={(id) => console.log('Delete family:', id)}
        onAddMember={(id) => console.log('Add member to:', id)}
        onEditMember={(fId, m) => console.log('Edit member:', fId, m)}
        onDeleteMember={(fId, mId) => console.log('Delete member:', fId, mId)}
        onAddChild={(id) => console.log('Add child family to:', id)}
      />
    </div>
  );
}
