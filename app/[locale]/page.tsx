
import Footer from "@/components/ui/Footer";
import Home from "@/components/ui/Home";
import Partners from "@/components/ui/Partners";

export default function Page() {
  return (
    <>
      <Home partners={<Partners />} />
      <Footer />
    </>
  );
}
