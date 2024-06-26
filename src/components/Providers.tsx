import { FC, ReactNode } from 'react'
import { Toaster } from 'sonner'

interface ProvidersProps {
  children: ReactNode
}

const Providers: FC<ProvidersProps> = ({ children }) => {
  return (
    <>
      <Toaster position="bottom-right" expand={false} />
      {children}
    </>
  )
}

export default Providers
