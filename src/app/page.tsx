import Hero from "@/components/hero";
import { baseUrl, version } from '@/config/config';
import { FC } from "react";
 const Home:FC = async ()=> {
   const response = await fetch(`${baseUrl}/${version}/mobile/get-brands`, {
     headers: {
       'Cache-Control': 'no-cache',
     },
   });
   const { data } = await response.json();
  return (
    <>
      <Hero allBrands={data}/>
    </>
  );
}

export default Home;