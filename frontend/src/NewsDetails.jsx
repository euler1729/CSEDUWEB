import { useParams } from "react-router-dom";
import useGetSingleNews from "./hook/News/useGetSingleNews";

const NewsDetails = () => {
    const {id} = useParams();
    const [news,] = useGetSingleNews(id);
    return (
    <>
       <div className="px-5 py-2 shadow-lg w-full ">
        <div className="pr-4">
            <img
            src={news?.photo}
            className="rounded-lg w-full "
            alt="News Photo"
            />
        </div>
        <div className="p-2 mx-10">
            <p>{news.date}</p>
            <p className="text-2xl font-semibold my-2">{news.news_title}</p>
            <p>{ news.description }</p>
        </div>
        </div>
    </>
    );
};

export default NewsDetails;