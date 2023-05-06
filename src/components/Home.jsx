import { Link } from "react-router-dom";
import homeimg from "../images/arrow2.png";

const Home = () => {
  return (
    <>
      <div className="home-bg d-flex flex-column align-items-center">
      <h1>Welcome to Taskly</h1>
      <h3>" Your Todo's on the cloud "</h3>
      <div className="d-flex" style={{marginTop: "30px"}}>
      <img src={homeimg} height={"150px"} width={"200px"} alt="My Image" style={{  filter: "invert(100%)"}} />
      <Link  className="rounded-circle btn6" variant="dark" size="sm" to="/todos" role="button">Go !</Link>
      </div>
      </div>
    </>
  );
};

export default Home;
