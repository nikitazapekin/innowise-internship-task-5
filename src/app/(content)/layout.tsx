import type { ReactNode } from "react";

import Header from "../_components/Header";

interface ContentLayoutProps {
  children: ReactNode;
}

const ContentLayout = ({ children }: ContentLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">{children}</main>
    </div>
  );
};

export default ContentLayout;
