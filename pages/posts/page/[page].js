import React from 'react'
import Head from 'next/head'

import { DataProvider, Repeater } from '@teleporthq/react-components'
import PropTypes from 'prop-types'

import postsPageInitialPaths3b087Resource from '../../../resources/posts-page-initial-paths-3b087'
import postsPageInitialPropsA2b9aResource from '../../../resources/posts-page-initial-props-a2b9a'

const Posts1 = (props) => {
  return (
    <>
      <div className="posts1-container">
        <Head>
          <title>Posts - Product Infrastructure Consultant</title>
          <meta
            property="og:title"
            content="Posts - Product Infrastructure Consultant"
          />
        </Head>
        <DataProvider
          renderSuccess={(params) => (
            <>
              <Repeater
                items={params}
                renderItem={(PostsEntities) => (
                  <>
                    <div className="posts1-container1">
                      <h1>{PostsEntities?.Title}</h1>
                      <span>{PostsEntities?.Title}</span>
                      <span>{PostsEntities?.Preview}</span>
                    </div>
                  </>
                )}
              />
            </>
          )}
          initialData={props.postsEntities}
          persistDataDuringLoading={true}
          key={props?.pagination?.page}
        />
      </div>
      <style jsx>
        {`
          .posts1-container {
            width: 100%;
            display: flex;
            overflow: auto;
            min-height: 100vh;
            align-items: center;
            flex-direction: column;
          }
          .posts1-container1 {
            gap: 12px;
            width: 100%;
            display: flex;
            align-items: center;
            flex-direction: column;
          }
        `}
      </style>
    </>
  )
}

Posts1.defaultProps = {
  postsEntities: [],
}

Posts1.propTypes = {
  postsEntities: PropTypes.array,
}

export default Posts1

export async function getStaticPaths() {
  try {
    const response = await postsPageInitialPaths3b087Resource({})
    const totalCount = response?.meta?.pagination?.total
    const pagesCount = Math.ceil(totalCount / 10)
    return {
      paths: Array.from(
        {
          length: pagesCount,
        },
        (_, i) => ({
          params: {
            page: (i + 1).toString(),
          },
        })
      ),
      fallback: 'blocking',
    }
  } catch (error) {
    return {
      paths: [],
      fallback: 'blocking',
    }
  }
}

export async function getStaticProps(context) {
  try {
    const response = await postsPageInitialPropsA2b9aResource({
      ...context?.params,
      start: (context.params.page - 1) * 10,
    })
    if (!response) {
      return {
        notFound: true,
      }
    }
    return {
      props: {
        postsEntities: response,
        ...response?.meta,
      },
      revalidate: 60,
    }
  } catch (error) {
    return {
      notFound: true,
    }
  }
}
