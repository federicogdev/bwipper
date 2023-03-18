import { useRouter } from "next/router";
import { useCallback, useMemo } from "react";
import { formatDistanceToNowStrict } from "date-fns";

import Avatar from "../Avatar";

interface CommentItemProps {
  data: Record<string, any>;
}

const CommentItem: React.FC<CommentItemProps> = ({ data = {} }) => {
  const router = useRouter();

  const goToUser = useCallback(
    (ev: any) => {
      ev.stopPropagation();

      router.push(`/users/${data.user.id}`);
    },
    [router, data.user.id]
  );

  const createdAt = useMemo(() => {
    if (!data?.createdAt) {
      return null;
    }

    return formatDistanceToNowStrict(new Date(data.createdAt));
  }, [data.createdAt]);

  return (
    <div
      className="
        border-b-[1px] 
        border-neutral-800 
        p-5 
        cursor-pointer 
        hover:bg-neutral-900 
        transition
      "
    >
      <div className="flex flex-row items-start gap-3">
        <div className="flex">
          <Avatar userId={data.user.id} />
        </div>
        <div className="w-full">
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-row items-center">
              <h1
                className="text-white text-md  font-semibold cursor-pointer hover:underline"
                onClick={goToUser}
              >
                {data.user.name}
              </h1>
              <span
                className=" text-neutral-500 text-sm cursor-pointer hidden md:block ml-1"
                onClick={goToUser}
              >
                @{data.user.username}
              </span>
            </div>

            <span className="text-neutral-500 text-sm" onClick={goToUser}>
              {createdAt} ago
            </span>
          </div>
          <div className="text-white mt-1">{data.body}</div>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
