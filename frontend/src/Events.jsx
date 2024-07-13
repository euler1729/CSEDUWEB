import Banner from "./component/Banner";
import EventsLong from "./component/EventsLong";
import useGetAllEvents from "./hook/Events/useGetAllEvents";
import  { useState } from 'react';
import ReactPaginate from 'react-paginate';

const Events = () => {
  const [events,] = useGetAllEvents();
  const [currentPage, setCurrentPage] = useState(0);

  const eventsPerPage = 5; // Number of news items per page
  const offset = currentPage * eventsPerPage;
  const currentEvents = events.slice(offset, offset + eventsPerPage);
  const pageCount = Math.ceil(events.length / eventsPerPage);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  return (
    <><Banner title={"Events"} activePage={"Events"} />
    <div className="mx-10 my-10 space-y-5">
       {currentEvents.map((item) => {
        return <EventsLong events={item} key={item.id}></EventsLong>;
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
    </>
  );
};

export default Events;
