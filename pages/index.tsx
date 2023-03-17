import Avatar from "@/components/Avatar";
import Form from "@/components/Form";
import Header from "@/components/Header";
import PostsFeed from "@/components/Posts/PostsFeed";

export default function Home() {
  return (
    <>
      <Header title="Home" />
      <Form placeholder="What's happening?" />
      <PostsFeed />
    </>
  );
}
