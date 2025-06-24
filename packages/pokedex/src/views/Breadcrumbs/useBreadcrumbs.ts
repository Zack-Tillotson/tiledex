"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export interface LinkWord {
  label: string
  href: string
}

const STORAGE_KEY = 'priorRoute'

const routeGroupToLabel = {
  'types': 'Type',
  'abilities': 'Ability',
  'generation': 'Generation',
  'search': 'Search',
  'pokemon': 'Pokemon',
}

export function useBreadcrumbs() {

  const currentRoute = usePathname()
  const [priorRoute, updatePriorRoute] = useState('')

  useEffect(() => {
    const storedRouteRaw = sessionStorage.getItem(STORAGE_KEY) || ''
    updatePriorRoute(storedRouteRaw)
    
    sessionStorage.setItem(STORAGE_KEY, currentRoute)
  }, [currentRoute])

  if(!priorRoute) {
    return null
  }

  const priorRouteGroup = priorRoute.split('/')[2]
  const label = routeGroupToLabel[priorRouteGroup as keyof typeof routeGroupToLabel]
  
  if(!label) {
    return null
  }
  
  return {
    label: label,
    href: priorRoute,
  }
}