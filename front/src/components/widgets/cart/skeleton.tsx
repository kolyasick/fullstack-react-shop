import React from "react";
import ContentLoader, { type IContentLoaderProps } from "react-content-loader";

export const CartSkeleton: React.FC<IContentLoaderProps> = (props) => (
  <ContentLoader
    speed={1.3}
    viewBox="0 0 400 100"
    backgroundColor="#ececec"
    foregroundColor="#c0c0c0"
    {...props}
  >
    <rect x="134" y="35" rx="0" ry="0" width="1" height="1" />
    <rect x="0" y="0" rx="10" ry="10" width="100" height="100" />
    <rect x="120" y="0" rx="5" ry="5" width="160" height="15" />
    <rect x="120" y="66" rx="10" ry="10" width="89" height="32" />
    <rect x="240" y="80" rx="5" ry="5" width="66" height="16" />
    <rect x="298" y="0" rx="5" ry="5" width="19" height="20" />
  </ContentLoader>
);
