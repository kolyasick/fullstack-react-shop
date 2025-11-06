import ContentLoader, { type IContentLoaderProps } from "react-content-loader";

export const HeaderSkeleton: React.FC<IContentLoaderProps> = (props) => (
  <ContentLoader
    speed={1.3}
    width={30}
    height={30}
    viewBox="0 0 30 30"
    backgroundColor="#ececec"
    foregroundColor="#c0c0c0"
    {...props}
  >
    <rect x="134" y="35" rx="0" ry="0" width="1" height="1" />
    <circle cx="15" cy="15" r="15" />
  </ContentLoader>
);
