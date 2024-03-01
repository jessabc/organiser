import React from 'react'

export default function MainContent( {children}) {
  return (
    // <!-- Content -->
    <div className="w-full pt-10 px-4 sm:px-6 md:px-8 lg:ps-72 
    ">
      {/* <!-- Page Heading --> */}
     {children}
      {/* <!-- End Page Heading --> */}
    </div>
    // <!-- End Content -->
  )
}
