import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
<div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
  <SignIn />
</div>
);
}