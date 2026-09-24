import { getActivities } from "@/features";
import { withCookies } from "@/lib/server/withCookies";

import { ActivityCardList } from "@/widgets";
import { cookies } from "next/headers";

export const metadata = {
  title: "Главная | VmeSte",
  description: "Найдите компанию для активностей",
};

// export const getCookieHeader = async (): Promise<string> => {
//   const cookieStore = await cookies();
//   let cookieHeader = "";
//   cookieStore.getAll().forEach((cookie, index) => {
//     if (index > 0) cookieHeader += "; ";
//     cookieHeader += `${cookie.name}=${cookie.value}`;
//   });
//   return cookieHeader;
// };

export default async function HomePage() {
  // const cookieHeader = await getCookieHeader();
  // const activities = await getActivities(cookieHeader);
  const activities = await withCookies(getActivities);


  return (
    <div style={{ height: "100%" }}>
      <ActivityCardList activityCardList={activities} />
    </div>
  );
}
