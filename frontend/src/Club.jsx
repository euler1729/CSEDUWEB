import Banner from "./component/Banner";
import ClubCard from "./component/ClubCard";
const clubDescription =[
    `Though the name says CSEDU Students’ Club, it is not confined only within the CSEDU perimeter. It is a platform for all the students (whether in CSE or not) interested in technology across our country. The club is organized and managed by a group of energetic and enthusiastic students of the Department of Computer Science & Engineering of the University of Dhaka.
    This club is the voice of the students of CSEDU. It represents them and their thoughts are expressed through it. Our motto is "Innovation; better nation". The club is motivated towards building a better nation through innovation. 'Innovation' represents our innovative ideas, and they will be used for the betterment of the nation. In the middle ';' represents our CSE studies.` ,
    `Though the name says CSEDU Students’ Club, it is not confined only within the CSEDU perimeter. It is a platform for all the students (whether in CSE or not) interested in technology across our country. The club is organized and managed by a group of energetic and enthusiastic students of the Department of Computer Science & Engineering of the University of Dhaka.
    This club is the voice of the students of CSEDU. It represents them and their thoughts are expressed through it. Our motto is "Innovation; better nation". The club is motivated towards building a better nation through innovation. 'Innovation' represents our innovative ideas, and they will be used for the betterment of the nation. In the middle ';' represents our CSE studies.`,
    `Though the name says CSEDU Students’ Club, it is not confined only within the CSEDU perimeter. It is a platform for all the students (whether in CSE or not) interested in technology across our country. The club is organized and managed by a group of energetic and enthusiastic students of the Department of Computer Science & Engineering of the University of Dhaka.
    This club is the voice of the students of CSEDU. It represents them and their thoughts are expressed through it. Our motto is "Innovation; better nation". The club is motivated towards building a better nation through innovation. 'Innovation' represents our innovative ideas, and they will be used for the betterment of the nation. In the middle ';' represents our CSE studies.`
]
const Club = () => {
    return (
        <>
            <Banner imageUrl={"/Img/club.png"} title="Student Activities" activePage="Club" ></Banner>
            <div className="mx-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 my-10">
                    <ClubCard title={"CSEDU Students' Club"} image={"/Img/studentclub.png"} description={clubDescription[0]} colorCode={"#0076a3"}></ClubCard>
                    <ClubCard title={"Developmet Club"} image={"/Img/development.jpg"} description={clubDescription[1]} colorCode={"#f7941d"}></ClubCard>
                    <ClubCard title={"Informatics Club "} image={"/Img/cseduic.png"} description={clubDescription[2]} colorCode={"#1e6f16"}></ClubCard>
                </div>
            </div>
        </>

    );
};

export default Club;