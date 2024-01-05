import React from "react";

import { Layout } from "antd";

import { CustomHeader } from "./components/Header/Header";
import { CustomContent } from "./components/Content/Content";

export const CustomLayout: React.FC = () => {
  return (
    <Layout style={{ height: "100vh", overflowX: "hidden" }}>
      <CustomHeader />
      <Layout>
        <CustomContent />
      </Layout>
    </Layout>
  );
};
