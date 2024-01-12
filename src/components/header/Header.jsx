import "./Header.css"

function Header(props) {
    return (
        <div className="header">
            {/*<div className="headerTitles">*/}
            {/*    <span className="headerTitleSm">React & Spring Boot</span>*/}
            {/*    <span className="headerTitleLg">Blog</span>*/}
            {/*</div>*/}
            <img className="headerImg"
                 src="https://images.pexels.com/photos/1591056/pexels-photo-1591056.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                 alt="tiles spelling BLOG"
            />
        </div>
    );
}

export default Header;
