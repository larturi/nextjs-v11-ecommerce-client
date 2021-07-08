export const registerApi = async (formData) => {
   try {
      const url = `${process.env.NEXT_PUBLIC_BASE_PATH}/auth/local/register`;

      console.log(url);
      const params = {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify(formData),
      };
      const response = await fetch(url, params);
      const result = await response.json();
      console.log(result);
   } catch (error) {
      console.error(error);
      return null;
   }
};
