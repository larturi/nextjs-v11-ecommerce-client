import React from 'react';
import Head from 'next/head';

const Seo = (props) => {
   const { title, description } = props;
   return (
      <Head>
         <title>{title}</title>
         <meta name='description' content={description} />
      </Head>
   );
};

export default Seo;

Seo.defaultProps = {
   title: 'Gaming: E-commerce de tus juegos favoritos',
   description: 'Sitio no comercial, desarrollado con fines académicos.',
};
