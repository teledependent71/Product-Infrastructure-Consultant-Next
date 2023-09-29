import React from 'react'
import Head from 'next/head'

import { DataProvider, Repeater } from '@teleporthq/react-components'

import testPageResource from '../resources/test-page'

const TestPage = (props) => {
  return (
    <>
      <div className="test-page-container">
        <Head>
          <title>test-page - Product Infrastructure Consultant</title>
          <meta
            property="og:title"
            content="test-page - Product Infrastructure Consultant"
          />
        </Head>
        <DataProvider
          renderSuccess={(context_u7z7ajx) => (
            <>
              <h1>{context_u7z7ajx?.Name}</h1>
            </>
          )}
          initialData={props.contextU7z7ajxProp}
          persistDataDuringLoading={true}
          key={props?.contextU7z7ajxProp?.id}
        />
      </div>
      <style jsx>
        {`
          .test-page-container {
            width: 100%;
            display: flex;
            overflow: auto;
            min-height: 100vh;
            align-items: center;
            flex-direction: column;
          }
        `}
      </style>
    </>
  )
}

export default TestPage

export async function getStaticProps(context) {
  try {
    const contextU7z7ajxProp = await testPageResource({
      ...context?.params,
    })
    return {
      props: {
        contextU7z7ajxProp: contextU7z7ajxProp?.data?.[0],
      },
    }
  } catch (errro) {
    return {
      notFound: true,
    }
  }
}
