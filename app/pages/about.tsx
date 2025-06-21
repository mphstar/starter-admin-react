
import type { Route } from "../+types/root";

export async function clientLoader({ context }: Route.LoaderArgs) {
  let team = await fetch("https://jsonplaceholder.typicode.com/todos/1", {
    method: "GET",
  });

  const result = await team.json();

  return { data: result };
}

export function HydrateFallback() {
  return <div>Loading...</div>;
}

const about = ({ loaderData }: Route.ComponentProps) => {
  const { data } = loaderData as unknown as { data: any };

  console.log("About Page Loader Data", data);
  


  return (
    <div>
      <h1 className="text-2xl font-bold">{data.title}</h1>
    </div>
  );
};

export default about;
