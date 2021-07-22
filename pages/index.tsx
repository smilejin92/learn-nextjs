import Head from 'next/head';
import Layout, { siteTitle } from '../components/Layout';
import utilStyles from '../styles/utils.module.css';
import { getSortedPostsData } from '../lib/posts';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import Date from '../components/Date';

// 빌드 시 Post 데이터를 요청
export const getStaticProps: GetStaticProps = () => {
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
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
