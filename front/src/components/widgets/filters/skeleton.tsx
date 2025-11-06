import ContentLoader, { type IContentLoaderProps } from "react-content-loader";

export const FilterSkeleton: React.FC<IContentLoaderProps> = (props) => (
  <ContentLoader
    speed={1.3}
    width={320}
    height={24}
    viewBox="0 0 320 24"
    backgroundColor="#ececec"
    foregroundColor="#c0c0c0"
    {...props}
  >
    <rect x="134" y="35" rx="0" ry="0" width="1" height="1" />
    <circle cx="10" cy="14" r="10" />
    <rect x="25" y="9" rx="5" ry="5" width="280" height="10" />
  </ContentLoader>
);
