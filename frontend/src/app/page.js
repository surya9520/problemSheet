
import store from "@/store/store";
import Image from "next/image";
import { Provider } from "react-redux";
import DsaQuestionsTable from "./Home/page";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
   <>
   <Navbar/>  
   <DsaQuestionsTable/>
   </>
  );
}
