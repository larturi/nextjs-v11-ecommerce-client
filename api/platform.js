export const getPlatformApi = async () => {
   try {
      const url = `${process.env.NEXT_PUBLIC_BASE_PATH}/platforms?_sort=position:asc`;
      const response = await fetch(url);
      const platform = await response.json();
      return platform;
   } catch (error) {
      console.error(error);
      return null;
   }
};
