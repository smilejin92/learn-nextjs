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
  />
)
```

&nbsp;  

### Metadata

