import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async context => {
  console.log(context);
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await response.json();

  return {
    props: {
      posts: data,
    },
  };
};

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface TestProps {
  posts: Post[];
}

export default function Test({ posts }: TestProps) {
  return <div>{JSON.stringify(posts)}</div>;
}
