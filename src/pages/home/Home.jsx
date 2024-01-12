import "./Home.css"
import Header from "../../components/header/Header";
import Articles from "../../components/articles/Articles";

function Home(props) {
    return (
        <>
            <Header/>
            <div className="home">
                <Articles/>
                {/*<Sidebar/>*/}
            </div>
        </>
    );
}

export default Home;
