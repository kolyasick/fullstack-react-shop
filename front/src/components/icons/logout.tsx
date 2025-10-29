import type { SVGProps } from "react";

function Logout(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      {...props}
    >
      {/* Icon from Feather Icon by Megumi Hano - https://github.com/feathericon/feathericon/blob/master/LICENSE */}
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M9.586 11L7.05 8.464L8.464 7.05l4.95 4.95l-4.95 4.95l-1.414-1.414L9.586 13H3v-2zM11 3h8c1.1 0 2 .9 2 2v14c0 1.1-.9 2-2 2h-8v-2h8V5h-8z"
      ></path>
    </svg>
  );
}

export default Logout;
