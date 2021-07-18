/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Container, Grid, Image, Input } from 'semantic-ui-react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export const TopBar = () => {
   return (
      <div className='top-bar'>
         <Container>
            <Grid className='top-bar'>
               <Grid.Column width={8} className='top-bar__left'>
                  <Logo />
               </Grid.Column>
               <Grid.Column width={8} className='top-bar__right'>
                  <Search />
               </Grid.Column>
            </Grid>
         </Container>
      </div>
   );
};

const Logo = () => {
   return (
      <Link href='/'>
         <a>
            <Image
               src='https://games-ecommerce-s3.s3.sa-east-1.amazonaws.com/logo_7bf36aaa55.png?12329.300000011921'
               alt='logo'
               className='logo'
            />
         </a>
      </Link>
   );
};

const Search = () => {
   const [searchStr, setSearchStr] = useState('');
   const [load, setLoad] = useState(false);

   const router = useRouter();

   useEffect(() => {
      if (load) {
         router.push(`/search?query=${searchStr}`);
      }
      setLoad(true);
   }, [searchStr]);

   return (
      <Input
         id='search-game'
         value={router.query.query}
         onChange={(_, data) => setSearchStr(data.value)}
         icon={{ name: 'search' }}
      />
   );
};

export default TopBar;
