// import { apiClient } from "@/lib";
// import { cookies } from 'next/headers';
import { IActivityCollection } from "@/shared";

// export const getActivities = async (): Promise<IActivityCollection[]> => {
//   //   const response = await apiClient.get("/api/activities");
//   //   return response.data;
//   console.log("getActivities: start");

//   try {
//     const response = await apiClient.get("/api/activities");
//     console.log("getActivities: response status", response.status);
//     console.log("getActivities: response data", response.data);
//     console.log("getActivities: is array?", Array.isArray(response.data));

//     return Array.isArray(response.data) ? response.data : [];
//   } catch (error) {
//     console.error("getActivities: error", error);
//     return [];
//   }
// };


// export const getActivities = async (): Promise<IActivityCollection[]> => {
//   console.log("getActivities: Выполняется запрос напрямую через fetch...");
//   try {
//     // Используем абсолютный URL. В Node.js (при SSR) это важно.
//     const url = new URL('/api/activities', 'http://localhost:3000');
//     const response = await fetch(url.toString());

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     const data = await response.json();
//     console.log("getActivities: Данные получены, это массив?", Array.isArray(data));
//     return Array.isArray(data) ? data : [];
//   } catch (error) {
//     console.error("getActivities: Ошибка при выполнении запроса", error);
//     return []; // В любом случае возвращаем пустой массив
//   }
// };

// export const getActivities = async (): Promise<IActivityCollection[]> => {
//   console.log("getActivities: Выполняется запрос напрямую через fetch с передачей cookie...");
//   try {
//     // Получаем куки от входящего запроса
//     const cookieStore = cookies();
//     const cookieHeader = cookieStore.toString(); // Превращаем куки в строку для заголовка

//     const url = new URL('/api/activities', process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000');
//     const response = await fetch(url.toString(), {
//       headers: {
//         Cookie: cookieHeader, // Передаём куки в запрос
//       },
//     });

//     if (!response.ok) {
//       // Если вернулась не 200 ОК, пробуем получить текст ошибки
//       const errorText = await response.text();
//       throw new Error(`HTTP error! status: ${response.status}, body: ${errorText.substring(0, 100)}`);
//     }

//     const data = await response.json();
//     console.log("getActivities: Данные получены, это массив?", Array.isArray(data));
//     return Array.isArray(data) ? data : [];
//   } catch (error) {
//     console.error("getActivities: Ошибка при выполнении запроса", error);
//     return []; // В любом случае возвращаем пустой массив
//   }
// };

export const getActivities = async (
  cookieHeader?: string
): Promise<IActivityCollection[]> => {
  console.log("getActivities: Выполняется запрос...");

  try {
    const url = new URL('/api/activities', process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000');
    const headers: HeadersInit = {};

    if (cookieHeader) {
      headers.Cookie = cookieHeader;
    }

    const response = await fetch(url.toString(), {
      headers,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("getActivities error:", error);
    return [];
  }
};