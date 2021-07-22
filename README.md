# Next.js

리액트 프레임워크. 아래의 기능을 제공한다.

- page 기반 라우팅 시스템 (+다이나믹 라우팅)
- pre-rendering (SSG, SSR)
- 코드 스플릿팅
- CSR with optimized prefetching
- CSS, SASS 모듈 지원 + CSS-in-JS 라이브러리 지원
- 개발환경 Fast refresh
- API 라우트

&nbsp;

## 1. [페이지 내비게이션](https://nextjs.org/docs/routing/introduction)

- 코드 스플릿팅
- client-side 내비게이션
- prefetching

&nbsp;

Next.js에서 [페이지](https://nextjs.org/docs/basic-features/pages)는 `pages` 디렉토리에 위치한 React 컴포넌트이다. 각 페이지의 라우트는 해당 페이지의 파일 이름과 관련이 있다.

- `pages/index.js` 파일은 `/` 경로에 해당한다.
- `pages/posts/first-post.js` 파일은 `/posts/first-post` 경로에 해당한다.

각 페이지 컴포넌트의 이름은 요구에 맞게 작성하면된다. 주의해야 할 것은 해당 페이지 컴포넌트를 `export default` 해야한다는 점이다.

&nbsp;

### [링크 컴포넌트](https://nextjs.org/docs/api-reference/next/link)

보통 페이지 사이를 이동 할 때 `a` 태그를 사용한다. 반면, Next.js에서는 `next/link` 컴포넌트를 import하여 `a` 태그를 wrap하여 사용한다. Next.js의 Link 컴포넌트는 앱 내에서 client-side 내비게이션을 가능하게한다.

```tsx
import Link from 'next/link';

<h1 className="title">
  Read{' '}
  <Link href="/posts/first-post">
    <a>this page!</a>
  </Link>
</h1>;
```

위 예제와 같이 `a` 태그의 `href` 어트리뷰트는 `Link` 컴포넌트에 작성한다. 만약 외부 페이지로 이동해야 할 경우, `a` 태그만 그대로 사용하면된다. 또한, `className`과 같은 prop을 작성해야 할 경우, `a` 태그에 작성한다.

&nbsp;

> **client-side navigation**
>
> 페이지 이동이 JavaScript로 구현되어 있다. 브라우저의 기본 내비게이팅 속도보다 빠르다. 이 때 새로운 html 페이지를 요청하지 않는다.

&nbsp;

### 코드 스플릿팅 & prefetching

Next.js는 자동으로 코드 스플릿팅을 지원한다. 따라서 각 페이지에 필요한 자바스크립트 파일만을 로드한다. 각 페이지에 필요한 자바스크립트만을 로드한다는 뜻은, 각 페이지가 독립되어 있다는 뜻이다. 특정 페이지에서 에러가 발생하여도 다른 페이지는 정상 동작한다.

또한 Next.js는 프로덕션 환경에서, `Link` 컴포넌트가 뷰포트에 노출되어 있을 때, 해당 링크의 페이지에 필요한 코드를 백그라운드에서 prefetch한다. 따라서 `Link` 컴포넌트를 클릭했을 때, 이미 해당 링크의 페이지에 필요한 코드가 로드되어 있으며, 페이지 이동 속도는 매우 빠르다.

&nbsp;

## 2. Assets, Metadata, CSS

Next.js는 `public` 디렉토리 안에 위치한 [static assets(ex. images) 제공 할 수 있다](https://nextjs.org/docs/basic-features/static-file-serving). `public` 안의 파일은 `pages` 디렉토리와 같이 앱 루트에서 접근 가능하다.

또한 `public` 디렉토리는 Google Site Verification을 위한 `robots.txt` 파일을 포함 할 수 있다. 

&nbsp;  

### 최적화되지 않은 이미지

일반적으로 HTML 파일에서 이미지를 삽입 할 때 `img` 태그를 사용한다.

```html
<img src="/images/profile.jpg" alt="Your Name" />
```

하지만 위와 같이 이미지를 삽입 할 경우 아래의 작업을 직접 처리해야한다.

* 스크린 사이즈에 맞게 이미지를 반응형으로 스타일링
* 이미지 최적화
* 뷰포트에 해당 이미지 영역이 노출될 경우에만 이미지를 로드

Next.js의 `Image` 컴포넌트를 사용하면 위의 작업을 모두 처리 할 수 있다.

&nbsp;  

### Image 컴포넌트

Next.js의 이미지 최적화는 빌드 시 처리되는 것이 아니라, 사용자가 요구했을 때(lazy-loaded) 수행한다. 때문에 빌드 시간과 페이지 로딩 시간에 영향을 주지 않는다. 더 자세한 내용은 [이 곳](https://nextjs.org/docs/basic-features/image-optimization)에서 확인 가능하다.

```tsx
import Image from 'next/image'

const YourComponent = () => (
  <Image
    src="/images/profile.jpg" // public 디렉토리 기준
    height={144} // must
    width={144} // must
    alt="Your Name" // must
    priority // if true, preloaded
  />
)
```

&nbsp;  

### Metadata

페이지의 메타데이터를 수정하기 위해서는 Next.js의[ `Head` 컴포넌트](https://nextjs.org/docs/api-reference/next/head)를 사용한다.

```tsx
import Head from 'next/head';

const HeadComponent = () => (
	<Head>
    <title>First post</title>
  </Head>
);
```

만약 `html` 태그를 수정하고 싶다면 (ex. `lang` 어트리뷰트) `page/_document.js` 파일을 생성하여 설정 할 수 있다. 자세한 내용은 [이 곳](https://nextjs.org/docs/advanced-features/custom-document)에서 확인 할 수 있다.

&nbsp;  

### CSS 스타일링

Next.js는 기본적으로 `styled-jsx` 라이브러리를 지원한다. `styled-jsx` 는 리액트 컴포넌트 내부에 스타일을 작성 할 수 있도록하며, 작성한 스타일은 스코핑된다.

```tsx
<style jsx>{`
	...
`}</style>
```

`styled-jsx` 외에 기본적으로 CSS, SASS 모듈(`*.module.css`, `*.module.scss`)을 지원하며, `styled-components` 혹은 `emotion` 과 같은 CSS-in-JS 라이브러리도 설치 후 사용 가능하다.

&nbsp;  

CSS, SASS 모듈 사용 시 아래와 같이 import하여 사용한다.

```tsx
import styles from './layout.module.css'

export default function Layout({ children }) {
  return <div className={styles.container}>{children}</div>
}
```

CSS, SASS 모듈 사용 시 유니크한 클래스 네임을 자동으로 생성한다. 때문에 선택자 이름이 중복될 염려를 하지 않아도 된다. 또한, Next.js에서 지원하는 코드 스플릿팅은 CSS, SASS 모듈에도 해당된다. 즉, 로드된 페이지에 필요한 스타일만을 로드한다. 앱 빌드 시 자바스크립트 번들에서 해당 스타일을 추출하여 `.css` 파일로 로드된다.

&nbsp;  

**전역 스타일**

전역 스타일은 `pages/_app.js` 파일(`App` 컴포넌트)에만 추가한다. 이 곳에 추가된 전역 스타일은 말 그대로 모든 페이지의 컴포넌트 스타일에 영향을 미친다. App 컴포넌트에는 전역 스타일 뿐만 아니라, 여러 페이지에서 공통으로 사용되는 상태도 관리될 수 있다.

```tsx
// pages/_app.tsx

import '../styles/globals.css'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp;
```

&nbsp;  

## 3. Pre-rendering & Data Fetching

### Pre-rendering

기본적으로 Next.js는 앱 내 모든 페이지를 pre-render한다. 이 말은, Next.js가 각 페이지에 해당하는 HTML 파일을 미리 생성해놓는다는 것이다. pre-rendering은 SEO, 성능 측면에서 client-side JavaScript를 사용한 페이지 렌더링보다 더 우세하다.

각 HTML 파일은 해당 페이지에 필요한 최소한의 자바스크립트 코드와 맵핑되어 있으며, 브러우저에 의해 해당 페이지가 로드되면 해당 페이지에 필요한 자바스크립트 코드가 실행되어 페이지를 interactive하게 만든다. 이 과정을 **hydration**이라 한다.

Pre-rendering이 적용된 페이지와 그렇지 않은 페이지의 차이점은 아래와 같다.

<img src="/Users/smilejin92/Desktop/pre-rendering.png" alt="pre-rendering" style="zoom:33%;" />

<img src="/Users/smilejin92/Desktop/no-pre-rendering.png" alt="no-pre-rendering" style="zoom:33%;" />

&nbsp;   

### Pre-rendering의 두 가지 종류

Next.js에서 사용하는 pre-rendering 방법은 크게 두 가지이다. 두 방법의 차이점은 **HTML 파일 생성 시점**이다.

* [Static Generation](https://nextjs.org/docs/basic-features/pages#static-generation-recommended): 빌드 타임에 HTML 파일을 생성한다. 이후 발생하는 요청마다 해당 HTML 파일을 재사용한다.
* [Server-side Rendering](https://nextjs.org/docs/basic-features/pages#server-side-rendering): 매 요청 시 HTML 파일을 생성한다.

<img src="/Users/smilejin92/Desktop/static-generation.png" alt="static-generation" style="zoom:33%;" />

<img src="/Users/smilejin92/Desktop/server-side-rendering.png" alt="server-side-rendering" style="zoom:33%;" />

> dev 모드에서는 static generation을 사용해도 매 요청 시 HTML 파일을 생성한다.

&nbsp;  

Next.js에서는 각 페이지 별로 어떤 pre-rendering 방법을 쓸 것인지 선택 할 수 있다. 따라서 static generation과 server-side rendering 두 방법을 모두 사용하는 "hybrid" 앱을 만들 수도 있다.

&nbsp;  

### Static Generation과 Server-side Rendering의 사용 시점

Next.js의 문서에서는 가능한 static generation을 사용하는 것을 권장한다. 페이지를 1회 빌드하여 재사용 할 수 있기 때문이다. 응답 속도, 서버 성능 측면에서 모두 유리하다.

**만약 사용자의 요청 전에, 페이지를 미리 pre-render해도된다면** static generation을 사용한다. static generation을 적용 할 수 있는 페이지의 예는 아래와 같다.

* 마케팅 페이지
* 블로그 포스트
* 온라인 쇼핑몰 상품 리스트
* 도움말, 이용 약관 등

&nbsp;  

**만약 사용자의 요청 전에 페이지를 미리 pre-render하면 안될 경우**, Server-side rendering을 사용한다. 예를 들어, 해당 페이지의 컨텐츠가 매우 동적이고, 매 요청 시 변경될 수 있다면 static generation은 적합하지 않다. 이러한 경우, 페이지 컨텐츠는 항상 최신 상태를 유지 할 수 있지만, 페이지 응답 속도가 저하 될 수 있기 때문에 pre-render하지 않고 **client-side 자바스크립트를 사용하여 컨텐츠를 업데이트 할 수도 있다.**

&nbsp;  

### Static Generation with/out Data

Next.js에서 데이터를 요청하지 않는 페이지는 기본적으로 static generation이 적용된다 (prod 빌드 시). 반면, 특정 데이터가 없을 시 렌더링 할 수 없는 페이지도 존재한다.

<img src="/Users/smilejin92/Desktop/static-generation-with-data.png" alt="static-generation-with-data" style="zoom:33%;" />

이러한 페이지의 경우 `getStaticProps` 함수를 사용하여 해당 페이지에 필요한 정보를 빌드 타임때 요청할 수 있다.

&nbsp;  

### Static Generation - getStaticProps를 사용하여 데이터 요청하기

1. 페이지 컴포넌트와 같은 위치에 `getStaticProps` async 함수를 export
2. `getStaticProps` 함수 내부에서 데이터 요청 후 페이지 컴포넌트에 주입 될 prop 객체를 반환

```tsx
export async function getStaticProps() {
  // 파일 시스템, API, DB 등 외부 데이터를 요청
  const response = await fetch('...');
  const data = await res.json();

  // props 키에 맵핑된 값은 페이지 컴포넌트의 props에 주입 됨
  return {
    props: {
      data
    }
  }
}

// 페이지 컴포넌트
export default function Home({ data }) { ... }
```

&nbsp;  

`getStaticProps` 함수 내부에서 DB 쿼리 문도 작성 할 수있다. `getStaticProps` 함수는 server-side에서만 실행되며, client-side에서 절대 실행되지 않는다 (JS 번들에 포함되지도 않는다).

```tsx
import someDatabaseSDK from 'someDatabaseSDK'

const databaseClient = someDatabaseSDK.createClient(...)

export async function getSortedPostsData() {
  // Instead of the file system,
  // fetch post data from a database
  return databaseClient.query('SELECT posts...')
}
```

&nbsp;  

`getStaticProps` 함수는 오직 페이지 컴포넌트의 위치에서만 export 될 수 있다. 리액트는 페이지를 렌더하기 위해 필요한 데이터를 먼저 확보해야하기 때문이다.

&nbsp;  

### SSR - getServerSideProps를 사용하여 데이터 요청하기

만약 빌드 시 특정 데이터를 요청하는 것이 아니라, request time에 요청해야한다면 Server-side rendering을 사용 할 수 있다.

<img src="/Users/smilejin92/Desktop/server-side-rendering-with-data.png" alt="server-side-rendering-with-data" style="zoom:33%;" />

```javascript
export async function getServerSideProps(context) {
  return {
    props: {
      // props for your component
    }
  }
}
```

`getServerSideProps` 함수에 전달되는 `context` 매개변수는 요청에 관련된 정보를 담고있다.

```json
// context
{
  req: IncomingMessage {
    _readableState: ReadableState {
      objectMode: false,
      highWaterMark: 16384,
      buffer: BufferList { head: null, tail: null, length: 0 },
      length: 0,
      pipes: [],
      flowing: null,
      ended: true,
      endEmitted: false,
      reading: false,
      sync: true,
      needReadable: false,
      emittedReadable: false,
      readableListening: false,
      resumeScheduled: false,
      errorEmitted: false,
      emitClose: true,
      autoDestroy: false,
      destroyed: false,
      errored: null,
      closed: false,
      closeEmitted: false,
      defaultEncoding: 'utf8',
      awaitDrainWriters: null,
      multiAwaitDrain: false,
      readingMore: true,
      decoder: null,
      encoding: null,
      [Symbol(kPaused)]: null
    },
    _events: [Object: null prototype] { end: [Function: clearRequestTimeout] },
    _eventsCount: 1,
    _maxListeners: undefined,
    socket: Socket {
      connecting: false,
      _hadError: false,
      _parent: null,
      _host: null,
      _readableState: [ReadableState],
      _events: [Object: null prototype],
      _eventsCount: 8,
      _maxListeners: undefined,
      _writableState: [WritableState],
      allowHalfOpen: true,
      _sockname: null,
      _pendingData: null,
      _pendingEncoding: '',
      server: [Server],
      _server: [Server],
      parser: [HTTPParser],
      on: [Function: socketListenerWrap],
      addListener: [Function: socketListenerWrap],
      prependListener: [Function: socketListenerWrap],
      _paused: false,
      _httpMessage: [ServerResponse],
      timeout: 0,
      [Symbol(async_id_symbol)]: 12258,
      [Symbol(kHandle)]: [TCP],
      [Symbol(kSetNoDelay)]: false,
      [Symbol(lastWriteQueueSize)]: 0,
      [Symbol(timeout)]: Timeout {
        _idleTimeout: -1,
        _idlePrev: null,
        _idleNext: null,
        _idleStart: 105919,
        _onTimeout: null,
        _timerArgs: undefined,
        _repeat: null,
        _destroyed: true,
        [Symbol(refed)]: false,
        [Symbol(kHasPrimitive)]: false,
        [Symbol(asyncId)]: 12304,
        [Symbol(triggerId)]: 12301
      },
      [Symbol(kBuffer)]: null,
      [Symbol(kBufferCb)]: null,
      [Symbol(kBufferGen)]: null,
      [Symbol(kCapture)]: false,
      [Symbol(kBytesRead)]: 0,
      [Symbol(kBytesWritten)]: 0,
      [Symbol(RequestTimeout)]: undefined
    },
    httpVersionMajor: 1,
    httpVersionMinor: 1,
    httpVersion: '1.1',
    complete: true,
    headers: {
      host: 'localhost:3000',
      connection: 'keep-alive',
      'sec-ch-ua': '" Not;A Brand";v="99", "Google Chrome";v="91", "Chromium";v="91"',
      'sec-ch-ua-mobile': '?0',
      'upgrade-insecure-requests': '1',
      'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36',
      accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
      'sec-fetch-site': 'none',
      'sec-fetch-mode': 'navigate',
      'sec-fetch-user': '?1',
      'sec-fetch-dest': 'document',
      'accept-encoding': 'gzip, deflate, br',
      'accept-language': 'en-US,en;q=0.9,ko;q=0.8,la;q=0.7'
    },
    rawHeaders: [
      'Host',
      'localhost:3000',
      'Connection',
      'keep-alive',
      'sec-ch-ua',
      '" Not;A Brand";v="99", "Google Chrome";v="91", "Chromium";v="91"',
      'sec-ch-ua-mobile',
      '?0',
      'Upgrade-Insecure-Requests',
      '1',
      'User-Agent',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36',
      'Accept',
      'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
      'Sec-Fetch-Site',
      'none',
      'Sec-Fetch-Mode',
      'navigate',
      'Sec-Fetch-User',
      '?1',
      'Sec-Fetch-Dest',
      'document',
      'Accept-Encoding',
      'gzip, deflate, br',
      'Accept-Language',
      'en-US,en;q=0.9,ko;q=0.8,la;q=0.7'
    ],
    trailers: {},
    rawTrailers: [],
    aborted: false,
    upgrade: false,
    url: '/test',
    method: 'GET',
    statusCode: null,
    statusMessage: null,
    client: Socket {
      connecting: false,
      _hadError: false,
      _parent: null,
      _host: null,
      _readableState: [ReadableState],
      _events: [Object: null prototype],
      _eventsCount: 8,
      _maxListeners: undefined,
      _writableState: [WritableState],
      allowHalfOpen: true,
      _sockname: null,
      _pendingData: null,
      _pendingEncoding: '',
      server: [Server],
      _server: [Server],
      parser: [HTTPParser],
      on: [Function: socketListenerWrap],
      addListener: [Function: socketListenerWrap],
      prependListener: [Function: socketListenerWrap],
      _paused: false,
      _httpMessage: [ServerResponse],
      timeout: 0,
      [Symbol(async_id_symbol)]: 12258,
      [Symbol(kHandle)]: [TCP],
      [Symbol(kSetNoDelay)]: false,
      [Symbol(lastWriteQueueSize)]: 0,
      [Symbol(timeout)]: Timeout {
        _idleTimeout: -1,
        _idlePrev: null,
        _idleNext: null,
        _idleStart: 105919,
        _onTimeout: null,
        _timerArgs: undefined,
        _repeat: null,
        _destroyed: true,
        [Symbol(refed)]: false,
        [Symbol(kHasPrimitive)]: false,
        [Symbol(asyncId)]: 12304,
        [Symbol(triggerId)]: 12301
      },
      [Symbol(kBuffer)]: null,
      [Symbol(kBufferCb)]: null,
      [Symbol(kBufferGen)]: null,
      [Symbol(kCapture)]: false,
      [Symbol(kBytesRead)]: 0,
      [Symbol(kBytesWritten)]: 0,
      [Symbol(RequestTimeout)]: undefined
    },
    _consuming: false,
    _dumped: false,
    cookies: [Getter/Setter],
    __NEXT_INIT_QUERY: {},
    [Symbol(kCapture)]: false,
    [Symbol(RequestTimeout)]: undefined
  },
  res: <ref *1> ServerResponse {
    _events: [Object: null prototype] { finish: [Function: bound resOnFinish] },
    _eventsCount: 1,
    _maxListeners: undefined,
    outputData: [],
    outputSize: 0,
    writable: true,
    destroyed: false,
    _last: false,
    chunkedEncoding: false,
    shouldKeepAlive: true,
    _defaultKeepAlive: true,
    useChunkedEncodingByDefault: true,
    sendDate: true,
    _removedConnection: false,
    _removedContLen: false,
    _removedTE: false,
    _contentLength: null,
    _hasBody: true,
    _trailer: '',
    finished: false,
    _headerSent: false,
    socket: Socket {
      connecting: false,
      _hadError: false,
      _parent: null,
      _host: null,
      _readableState: [ReadableState],
      _events: [Object: null prototype],
      _eventsCount: 8,
      _maxListeners: undefined,
      _writableState: [WritableState],
      allowHalfOpen: true,
      _sockname: null,
      _pendingData: null,
      _pendingEncoding: '',
      server: [Server],
      _server: [Server],
      parser: [HTTPParser],
      on: [Function: socketListenerWrap],
      addListener: [Function: socketListenerWrap],
      prependListener: [Function: socketListenerWrap],
      _paused: false,
      _httpMessage: [Circular *1],
      timeout: 0,
      [Symbol(async_id_symbol)]: 12258,
      [Symbol(kHandle)]: [TCP],
      [Symbol(kSetNoDelay)]: false,
      [Symbol(lastWriteQueueSize)]: 0,
      [Symbol(timeout)]: Timeout {
        _idleTimeout: -1,
        _idlePrev: null,
        _idleNext: null,
        _idleStart: 105919,
        _onTimeout: null,
        _timerArgs: undefined,
        _repeat: null,
        _destroyed: true,
        [Symbol(refed)]: false,
        [Symbol(kHasPrimitive)]: false,
        [Symbol(asyncId)]: 12304,
        [Symbol(triggerId)]: 12301
      },
      [Symbol(kBuffer)]: null,
      [Symbol(kBufferCb)]: null,
      [Symbol(kBufferGen)]: null,
      [Symbol(kCapture)]: false,
      [Symbol(kBytesRead)]: 0,
      [Symbol(kBytesWritten)]: 0,
      [Symbol(RequestTimeout)]: undefined
    },
    _header: null,
    _keepAliveTimeout: 5000,
    _onPendingData: [Function: bound updateOutgoingData],
    _sent100: false,
    _expect_continue: false,
    statusCode: 200,
    flush: [Function: flush],
    write: [Function: write],
    end: [Function: end],
    on: [Function: on],
    writeHead: [Function: writeHead],
    [Symbol(kCapture)]: false,
    [Symbol(kNeedDrain)]: false,
    [Symbol(corked)]: 0,
    [Symbol(kOutHeaders)]: null
  },
  query: {},
  resolvedUrl: '/test',
  locales: undefined,
  locale: undefined,
  defaultLocale: undefined
}
```

SSR 사용 시 주의해야 할 점은 서버가 매 요청을 처리하여 HTML을 생성하기 때문에 응답 시간이 느려지며, compute된 결과를 CDN에 캐싱하기 위해서는 추가 작업이 필요하다.

&nbsp;  

### Client-side rendering

만약 데이터를 pre-render하지 않아도 된다면, client-side rendering을 사용 할 수 있다.

* static generation을 사용하여 데이터가 필요하지 않은 영역을 pre-render
* 페이지 로드 시 client-side 자바스크립트를 사용하여 데이터 요청 후, 남은 영역을 렌더

<img src="/Users/smilejin92/Desktop/client-side-rendering.png" alt="client-side-rendering" style="zoom:33%;" />

이러한 방법은 대시보드 같은 페이지를 다룰 때 잘 사용된다. 대시보드 페이지는 private하며, 사용자마다 페이지에 표시되는 컨텐츠가 다르고, SEO와는 관계 없기 때문에 pre-render될 필요가 없다. 표시되는 데이터 역시 빠른 주기로 업데이트될 수 있기 때문에 client-side rendering을 사용하는 것이 ssr을 사용하는 것 보다 더 나은 선택이 될 수 있다.

&nbsp;  

