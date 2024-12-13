import Footer from "@/components/ui/Footer";
import Header from "@/components/ui/Header";
import React from "react";

function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Header />
      <div className="lg:max-w-[100%] sm:max-w-[100%] mx-auto mt-20">
        {children}
      </div>
      <Footer />
    </div>
  );
}

export default Layout;
