import React from 'react';
import { Pagination as PaginationSemantic } from 'semantic-ui-react';
import { useRouter } from 'next/router';
import queryString from 'query-string';

const Pagination = (props) => {
   const { totalGames, page, limitPerPage } = props;
   const router = useRouter();
   const urlParse = queryString.parseUrl(router.asPath);

   const goToPage = (newPage) => {
      urlParse.query.page = newPage;
      const url = queryString.stringifyUrl(urlParse);
      router.push(url);
   };

   return (
      <div className='pagination'>
         <PaginationSemantic
            defaultActivePage={page}
            totalPages={Math.ceil(totalGames / limitPerPage)}
            firstItem={null}
            lastItem={null}
            onPageChange={(_, data) => goToPage(data.activePage)}
            boundaryRange={0}
            siblingRange={1}
            ellipsisItem={null}
         />
      </div>
   );
};

export default Pagination;
