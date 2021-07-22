import { GetStaticProps } from 'next';
import Layout from '../../components/Layout';
import { getAllPostIds, getPostData } from '../../lib/posts';
import { ParsedUrlQuery } from 'querystring';

export const getStaticPaths = async () => {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
};

interface PostParams extends ParsedUrlQuery {
  id: string;
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as PostParams;

  const postData = getPostData(id);
  return {
    props: {
      postData,
    },
  };
};

interface PostProps {
  postData: {
    id: string;
    title: string;
    date: string;
  };
}

export default function Post({ postData }: PostProps) {
  return (
    <Layout>
      {postData.title}
      <br />
      {postData.id}
      <br />
      {postData.date}
    </Layout>
  );
}
