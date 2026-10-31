import Admin from "../../Admin";

export default async function Page({ params }: { params: Promise<{ key: string }> }) {
  const { key } = await params;
  return <Admin adminKey={key} />;
}
