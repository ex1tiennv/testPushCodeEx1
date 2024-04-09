import { ReactNode } from 'react'

export interface IAuthLayout {
    children: ReactNode
}

//use for screen login, forgot-password, change-password

const AuthLayout = ({ children }: IAuthLayout) => {
    return (
        <div className="grid min-h-screen place-content-center bg-login-bg bg-cover bg-center">
            <div className="flex flex-col justify-center rounded-md bg-white p-8 shadow-lg md:w-[500px] md:max-w-md">
                {children}
            </div>
        </div>
    )
}

export default AuthLayout
