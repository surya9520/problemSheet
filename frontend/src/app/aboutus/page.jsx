import Navbar from "@/components/Navbar";

const AboutUs = () => {
    return (
        <>
        <Navbar/>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md text-center">
          <h1 className="text-3xl font-bold mb-4">About Us</h1>
          <p className="text-gray-700">
            Welcome to the DSA platform! Our goal is to help you master Data Structures and Algorithms
            through well-structured questions and tutorials.
          </p>
        </div>
      </div>
      </>
    );
  };
  
  export default AboutUs;
  