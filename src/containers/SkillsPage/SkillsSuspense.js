import React, { lazy, Suspense } from 'react'

import LoadingIndicator from 'components/LoadingIndicator'

const LazySkills = lazy(() => import('./Skills'))

export default (props) => (
  <Suspense fallback={<LoadingIndicator/>}>
    <LazySkills {...props} />
  </Suspense>
)


