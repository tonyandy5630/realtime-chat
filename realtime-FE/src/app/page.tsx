import JoinChat from "./_JoinChat";

export const metadata = {
  title: "Join chat",
};

export default function Home() {
  return (
    <main className='flex min-h-screen min-w-screen flex-col items-center justify-between p-24'>
      <JoinChat />
    </main>
  );
}
