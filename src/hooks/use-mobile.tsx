
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean>(
    typeof window !== 'undefined' ? window.innerWidth < MOBILE_BREAKPOINT : false
  )

  React.useEffect(() => {
    if (typeof window === 'undefined') return

    // Use a more efficient resize listener with debounce
    const updateMobile = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    
    // Debounce function to limit execution
    let timeoutId: number | null = null
    const debouncedResize = () => {
      if (timeoutId) {
        window.clearTimeout(timeoutId)
      }
      timeoutId = window.setTimeout(updateMobile, 100)
    }

    window.addEventListener("resize", debouncedResize, { passive: true })
    
    return () => {
      window.removeEventListener("resize", debouncedResize)
      if (timeoutId) window.clearTimeout(timeoutId)
    }
  }, [])

  return isMobile
}
