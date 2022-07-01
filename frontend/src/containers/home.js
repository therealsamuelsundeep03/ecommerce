import Nav from "../components/navfiles/nav";
import LandingPage from "../components/landingpage";


function Home(){
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    return (
      <>
      {
        isLoggedIn ? 
        (<>
            {/* header section */}
            <Nav />
            <LandingPage />
        </>) : (
            window.location.replace("/login") 
        )
      }
      </>
    ) 
}

export default Home;

 