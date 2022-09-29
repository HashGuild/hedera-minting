export const CheckSolid = function (props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 29 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <ellipse cx="14.5" cy="14.5703" rx="14.5" ry="14.5703" fill="#D3D3D3" />

      <path
        d="M6 15.1612L11.4118 20.5992L22.2353 9.04346"
        stroke="#878787"
        strokeWidth="1.35294"
      />
    </svg>
  );
};
