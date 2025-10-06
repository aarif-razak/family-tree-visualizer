import { MemberRow } from '../MemberRow';

export default function MemberRowExample() {
  const member = {
    id: '1',
    name: 'John Smith',
    relationship: 'Father',
    age: 45
  };

  return (
    <div className="w-64 bg-card p-2 rounded-lg">
      <MemberRow
        member={member}
        onEdit={(m) => console.log('Edit member:', m)}
        onDelete={(id) => console.log('Delete member:', id)}
      />
    </div>
  );
}
