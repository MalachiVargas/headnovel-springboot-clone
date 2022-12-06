import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { Session } from 'next-auth'
import { getSession } from 'next-auth/react'
import Head from 'next/head'
import { Feed } from '../components/Feed'
import { Header } from '../components/Header'
import { Login } from '../components/Login'
import { RightSideBar } from '../components/RightSideBar'
import { Sidebar } from '../components/Sidebar'

export default function Home({
  userSession
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  if (!userSession) {
    return <Login />
  }
  return (
    <div>
      <Head>
        <title>My-Facebook-Clone</title>
        <meta
          name="A Facebook clone to showcase my skills in building REST APIs with Java and Spring Boot connected to a NextJS/Typescript-React front end."
          content="Social media app clone"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="flex bg-gray-100">
        <Sidebar />
        <Feed />
        <RightSideBar />
      </main>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<{
  userSession: Session | null
}> = async (context) => {
  const userSession = await getSession(context)
  return {
    props: { userSession }
  }
}
