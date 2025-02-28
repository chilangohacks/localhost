import { Skeleton } from "./Skeleton";

const MenuSkeleton = () => (
  <>
    <ul className="flex flex-row items-center space-x-5">
      <div className="hidden md:flex flex-row space-x-5"></div>
      <li>
        <a>
          <Skeleton className="w-[48px] max-w-full" />
        </a>
      </li>
      <li>
        <a>
          <Skeleton className="w-[72px] max-w-full" />
        </a>
      </li>
      <li>
        <a>
          <Skeleton className="w-[56px] max-w-full" />
        </a>
      </li>
    </ul>
  </>
);

export default MenuSkeleton;
