export const getLastGamesApi = async (limit) => {
   try {
      const limitItems = `_limit=${limit}`;
      const sortItems = `_sort=created_at:desc`;
      const url = `${process.env.NEXT_PUBLIC_BASE_PATH}/games?${limitItems}&${sortItems}`;
      const response = await fetch(url);
      const games = await response.json();
      return games;
   } catch (error) {
      console.error(error);
      return null;
   }
};

export const getGamesPlatformApi = async (platform, limit, start) => {
   try {
      const limitItems = `_limit=${limit}`;
      const sortItems = `_sort=created_at:desc`;
      const startItems = `_start=${start}`;
      const url = `${process.env.NEXT_PUBLIC_BASE_PATH}/games?platform.url=${platform}&${limitItems}&${sortItems}&${startItems}`;
      const response = await fetch(url);
      const games = await response.json();
      return games;
   } catch (error) {
      console.error(error);
      return null;
   }
};

export const getTotalGamesPlatformApi = async (platform) => {
   try {
      const url = `${process.env.NEXT_PUBLIC_BASE_PATH}/games/count?platform.url=${platform}`;
      const response = await fetch(url);
      const result = await response.json();
      return result;
   } catch (error) {
      console.error(error);
      return null;
   }
};
