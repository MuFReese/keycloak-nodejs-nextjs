import Head from "next/head"
import NextNProgress from 'nextjs-progressbar'

interface ILayoutProps {
  children: React.ReactNode;
  title?: string;
}

export default function Layout({children, title}: ILayoutProps) {

  return(
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        />
      </Head>
      <NextNProgress color="#29D" startPosition={0.3} stopDelayMs={200} height={3} showOnShallow={true} />

      <div>{children}</div>
    </div>
  )
}