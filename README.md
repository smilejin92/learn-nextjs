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

## 페이지 내비게이션

- 코드 스플릿팅
- client-side 내비게이션
- prefetching

&nbsp;

Next.js에서 페이지는 `pages` 디렉토리에 위치한 React 컴포넌트이다. 각 페이지의 라우트는 해당 페이지의 파일 이름과 관련이 있다.

- `pages/index.js` 파일은 `/` 경로에 해당한다.
- `pages/posts/first-post.js` 파일은 `/posts/first-post` 경로에 해당한다.

각 페이지 컴포넌트의 이름은 요구에 맞게 작성하면된다. 주의해야 할 것은 해당 페이지 컴포넌트를 `export default` 해야한다는 점이다.

&nbsp;

### 링크 컴포넌트

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
