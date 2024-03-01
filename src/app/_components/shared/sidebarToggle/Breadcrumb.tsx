
import NavigationToggle from './NavigationToggle'


import React, { ReactNode } from 'react'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

type TBreadCrumbProps = {
  homeElement: ReactNode,
  separator: ReactNode,
  containerClasses?: string,
  listClasses?: string,
  activeClasses?: string,
  capitalizeLinks?: boolean
}

export default function Breadcrumb({homeElement, separator, containerClasses, listClasses, activeClasses, capitalizeLinks}: TBreadCrumbProps) {

  const paths = usePathname()
    const pathNames = paths.split('/').filter( path => path )


  return (

    <div>
    <ul className={containerClasses}>
        <li className={listClasses}><Link href={'/'}>{homeElement}</Link></li>
        {pathNames.length > 0 && separator}
    {
        pathNames.map( (link, index) => {
            let href = `/${pathNames.slice(0, index + 1).join('/')}`
            let itemClasses = paths === href ? `${listClasses} ${activeClasses}` : listClasses
            let itemLink = capitalizeLinks ? link[0].toUpperCase() + link.slice(1, link.length) : link
            return (
                <React.Fragment key={index}>
                    <li className={itemClasses} >
                        <Link href={href}>{itemLink}</Link>
                    </li>
                    {pathNames.length !== index + 1 && separator}
                </React.Fragment>
            )
        })
    }
    </ul>
</div>
   
  // <>
  //       {/* <!-- Breadcrumb --> */}
  //       <ol className="ms-3 flex items-center whitespace-nowrap" aria-label="Breadcrumb">
  //         <li className="flex items-center text-sm text-gray-800 dark:text-gray-400">
  //           Dashboard
  //           <svg className="flex-shrink-0 mx-3 overflow-visible size-2.5 text-gray-400 dark:text-gray-600" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  //             <path d="M5 1L10.6869 7.16086C10.8637 7.35239 10.8637 7.64761 10.6869 7.83914L5 14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
  //           </svg>
  //         </li>
  //         <li className="text-sm font-semibold text-gray-800 truncate dark:text-gray-400" aria-current="page">
  //           Dashboard
  //         </li>
  //       </ol>
  //       {/* <!-- End Breadcrumb --> */}
  //       </>
  )
}
