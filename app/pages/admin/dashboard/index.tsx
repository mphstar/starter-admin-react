import { TbTrendingDown, TbTrendingUp } from "react-icons/tb";
import type { Route } from "./+types";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";

// export async function clientLoader({ request }: Route.LoaderArgs) {
//   const url = new URL(request.url);

//   return { pathname: url.pathname };
// }

// export function HydrateFallback() {
//   return <div>Loading...</div>;
// }

const index = () => {
  return (
    <div className="flex flex-1 flex-col space-y-2 p-4">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">
          Hi, Welcome back 👋
        </h2>
      </div>
      <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs md:grid-cols-2 lg:grid-cols-4">
        <Card className="@container/card">
          <CardHeader>
            <CardDescription>Total Student</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              239
            </CardTitle>
            <CardAction>
              <Badge variant="outline">
                <TbTrendingUp />
                +12.5%
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
              Trending up this month <TbTrendingUp className="size-4" />
            </div>
            <div className="text-muted-foreground">
              Siswa dalam 6 bulan terakhir
            </div>
          </CardFooter>
        </Card>
        <Card className="@container/card">
          <CardHeader>
            <CardDescription>Total Employee</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              120
            </CardTitle>
            <CardAction>
              <Badge variant="outline">
                <TbTrendingDown />
                -5%
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
              Turun 5% bulan ini <TbTrendingDown className="size-4" />
            </div>
            <div className="text-muted-foreground">Pegawai aktif saat ini</div>
          </CardFooter>
        </Card>
        <Card className="@container/card">
          <CardHeader>
            <CardDescription>Total Kelas</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              32
            </CardTitle>
            <CardAction>
              <Badge variant="outline">
                <TbTrendingUp />
                +8%
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
              Kelas bertambah <TbTrendingUp className="size-4" />
            </div>
            <div className="text-muted-foreground">
              Data kelas tahun ajaran ini
            </div>
          </CardFooter>
        </Card>
        <Card className="@container/card">
          <CardHeader>
            <CardDescription>Total Users</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              1,560
            </CardTitle>
            <CardAction>
              <Badge variant="outline">
                <TbTrendingUp />
                +4.5%
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
              Pengguna aktif naik <TbTrendingUp className="size-4" />
            </div>
            <div className="text-muted-foreground">Total user terdaftar</div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default index;
