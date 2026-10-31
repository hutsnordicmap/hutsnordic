import DropBox from "../DropBox";

export default async function Page({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  return <DropBox token={token} />;
}
