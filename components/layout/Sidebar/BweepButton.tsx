import useLoginModal from "@/hooks/useLoginModal";
import { useCallback } from "react";
import { FaFeather } from "react-icons/fa";

const BweepButton = () => {
  const loginModal = useLoginModal();

  const onClick = useCallback(() => {
    return loginModal.onOpen();
  }, [loginModal]);

  return (
    <div onClick={onClick}>
      <div
        className="
        mt-6
        lg:hidden 
        rounded-full 
        h-12
        w-12
        p-3
        flex
        items-center
        justify-center 
        bg-orange-500 
        hover:bg-opacity-80 
        transition 
        cursor-pointer
      "
      >
        <FaFeather size={24} color="white" />
      </div>
      <div
        className="
        mt-6
        hidden 
        lg:block 
        px-4
        py-2
        rounded-full
        bg-orange-500
        hover:bg-opacity-90 
        cursor-pointer
      "
      >
        <p
          className="
            hidden 
            lg:block 
            text-center
            font-semibold
            text-white 
            text-[20px]
        "
        >
          Bweep
        </p>
      </div>
    </div>
  );
};

export default BweepButton;
