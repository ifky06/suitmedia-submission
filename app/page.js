import Navbar from "@/components/Navbar";
import Header from "@/components/Header";
import {Suspense} from "react";
import Loading from "@/app/loading";
import Profile from "@/models/Profile";
import ContentView from "@/components/ContentView";

export default async function Home() {
   const data = await Profile.getProfile();
  return (
      <>
          <Suspense fallback={<Loading />}>
          <Navbar profileName={data.nickname} />
          <Header />
          <ContentView />
          </Suspense>
      </>
  )
}
