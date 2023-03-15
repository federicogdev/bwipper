import useLoginModal from "@/hooks/useLoginModal";
import React, { useCallback, useState } from "react";
import Input from "../Input";
import Modal from "../Modal";

type Props = {};

const LoginModal = (props: Props) => {
  const loginModal = useLoginModal();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      //login

      loginModal.onClose();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [loginModal]);

  const loginBodyContent = (
    <div className="flex flex-col gap-4">
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

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      onClose={loginModal.onClose}
      onSubmit={onSubmit}
      title="Login"
      body={loginBodyContent}
      actionLabel="Submit"
    />
  );
};

export default LoginModal;
