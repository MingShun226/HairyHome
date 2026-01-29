import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Benefits from "@/components/Benefits";
import PetCollection from "@/components/PetCollection";
import HowWeServe from "@/components/HowWeServe";
import Ticker from "@/components/Ticker";
import Footer from "@/components/Footer";
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className={styles.container}>
        <Hero />
        <Benefits />
        <PetCollection />
        <HowWeServe />
      </main>
      <Ticker />
      <Footer />
    </>
  );
}
