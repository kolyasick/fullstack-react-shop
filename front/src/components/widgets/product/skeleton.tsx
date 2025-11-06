import ContentLoader, { type IContentLoaderProps } from "react-content-loader";

export const ProductSkeleton: React.FC<IContentLoaderProps> = (props) => (
  <ContentLoader
    speed={1.3}
    viewBox="0 0 352 452"
    backgroundColor="#ececec"
    foregroundColor="#c0c0c0"
    {...props}
  >
    <rect x="134" y="35" rx="0" ry="0" width="1" height="1" />
    <rect x="0" y="0" rx="10" ry="10" width="352" height="192" />
    <rect x="0" y="216" rx="0" ry="0" width="195" height="15" />
    <rect x="0" y="248" rx="0" ry="0" width="352" height="10" />
    <rect x="0" y="266" rx="0" ry="0" width="263" height="10" />
    <rect x="0" y="296" rx="0" ry="0" width="40" height="20" />
    <rect x="50" y="296" rx="0" ry="0" width="40" height="20" />
    <rect x="150" y="296" rx="0" ry="0" width="40" height="20" />
    <rect x="100" y="296" rx="0" ry="0" width="40" height="20" />
    <rect x="0" y="372" rx="0" ry="0" width="100" height="20" />
    <rect x="229" y="360" rx="0" ry="0" width="119" height="33" />
  </ContentLoader>
);
