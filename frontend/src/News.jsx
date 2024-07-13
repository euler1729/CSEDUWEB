import  { useState } from 'react';
import NewsLong from './component/NewsLong';
import useGetAllNews from './hook/News/useGetAllNews';
import ReactPaginate from 'react-paginate';
import Banner from './component/Banner';

const News = () => {
  const [news,] = useGetAllNews();
  const [currentPage, setCurrentPage] = useState(0);

  const newsPerPage = 3; // Number of news items per page
  const offset = currentPage * newsPerPage;
  const currentNews = news.slice(offset, offset + newsPerPage);
  const pageCount = Math.ceil(news.length / newsPerPage);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  return (
    <div>
      <Banner title={"News"} activePage={"News"} />
      <div className="mx-10 my-10 space-y-5">
      {currentNews.map((item) => {
        return <NewsLong news={item} key={item.id} />;
      })}
      <ReactPaginate
        previousLabel={'Previous'}
        nextLabel={'Next'}
        breakLabel={'...'}
        breakClassName={'break-me'}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={'pagination flex justify-center space-x-2 mt-8'}
        pageClassName={'page-item'}
        pageLinkClassName={'page-link py-2 px-4 border rounded-lg text-blue-500 hover:bg-blue-100'}
        previousClassName={'page-item'}
        previousLinkClassName={'page-link py-2 px-4 border rounded-lg text-blue-500 hover:bg-blue-100'}
        nextClassName={'page-item'}
        nextLinkClassName={'page-link py-2 px-4 border rounded-lg text-blue-500 hover:bg-blue-100'}
        activeClassName={'active'}
        activeLinkClassName={' bg-[#ecb31d] text-white'}
      />
    </div>
    </div>
  );
};

export default News;
