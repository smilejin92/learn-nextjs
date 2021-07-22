import { GetStaticProps } from 'next';
import Layout from '../../components/Layout';
import { getAllPostIds, getPostData } from '../../lib/posts';
import { ParsedUrlQuery } from 'querystring';
import Head from 'next/head';
import Date from '../../components/Date';
import utilStyles from '../../styles/utils.module.css';

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

  const postData = await getPostData(id);
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
    contentHtml: string;
  };
}

export default function Post({ postData }: PostProps) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
}
