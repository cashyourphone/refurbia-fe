import Hero from "@/components/hero";
import { baseUrl, version } from '@/config/config';
import { FC } from "react";
 const Home:FC = async ()=> {
   const response = await fetch(`${baseUrl}/${version}/mobile/get-brands`);
   const { data } = await response.json();
  return (
    <>
      <Hero allBrands={data}/>
    </>
  );
}

export default Home;