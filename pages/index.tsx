import Head from 'next/head';
import Layout, { siteTitle } from '../components/Layout';
import utilStyles from '../styles/utils.module.css';
import { getSortedPostsData } from '../lib/posts';
import { GetStaticProps, GetStaticPropsContext } from 'next';

// 빌드 시 Post 데이터를 요청
export const getStaticProps: GetStaticProps = (
  context: GetStaticPropsContext,
) => {
  console.log(context);
  const allPostsData = getSortedPostsData();

  return {
    props: {
      allPostsData,
    },
  };
};

interface Post {
  title: string;
  date: string;
  id: string;
}

interface HomeProps {
  allPostsData: Post[];
}

export default function Home({ allPostsData }: HomeProps) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Next.js를 열심히 공부해보자</p>
        <p>
          (This is a sample website - you’ll be building a site like this on{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              {title}
              <br />
              {id}
              <br />
              {date}
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
