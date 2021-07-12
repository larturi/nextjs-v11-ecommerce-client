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
