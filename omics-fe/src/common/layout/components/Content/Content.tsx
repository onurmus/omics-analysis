import React from "react";

import { Layout } from "antd";
import "./Content.css";
import { CustomRoutes } from "../Routes/Routes";

const { Content } = Layout;

export const CustomContent: React.FC = () => {
  return (
    <div className={`main-container`}>
      <Content style={{ overflow: "initial" }}>
        <div className="page-container">
          <CustomRoutes />
        </div>
      </Content>
    </div>
  );
};
