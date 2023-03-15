import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegisterModal";
import axios from "axios";
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import Input from "../Input";
import Modal from "../Modal";
import { signIn } from "next-auth/react";

type Props = {};

const RegisterModal = (props: Props) => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onToggle = useCallback(() => {
    if (isLoading) {
      return;
    }

    registerModal.onClose();
    loginModal.onOpen();
  }, [loginModal, registerModal, isLoading]);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      //makes request to /api/register in our api folder
      await axios.post("/api/register", {
        email,
        password,
        username,
        name,
      });

      toast.success("Account Created");

      //signs in after registering with NextAuth method like specified in [...nextauth].ts
      signIn("credentials", { email, password });

      registerModal.onClose();
    } catch (error) {
      toast.success("Something went wrong");

      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [registerModal, email, password, username, name]);

  const registerModalBodyContent = (
    <div className="flex flex-col gap-4">
      <Input
        placeholder="name"
        onChange={(e) => setName(e.target.value)}
        value={name}
        disabled={isLoading}
      />
      <Input
        placeholder="username"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
        disabled={isLoading}
      />
      <Input
        placeholder="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        disabled={isLoading}
      />
      <Input
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        type="password"
        disabled={isLoading}
      />
    </div>
  );

  const registerModalFooterContent = (
    <div className="text-neutral-400 text-center mt-4">
      <p>
        Already got an account?{" "}
        <span
          className="cursor-point text-orange-500 font-bold hover:underline cursor-pointer"
          onClick={onToggle}
        >
          Login
        </span>
      </p>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      onClose={registerModal.onClose}
      onSubmit={onSubmit}
      title="Register"
      body={registerModalBodyContent}
      actionLabel="Submit"
      footer={registerModalFooterContent}
    />
  );
};

export default RegisterModal;
