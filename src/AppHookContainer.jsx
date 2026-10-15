
import AppRouter from './AppRouter'
import GlobalProvider from './GlobalProvider'
import App from './App'

export default function AppHookContainer() {
    return (


        <div className=''>
            <GlobalProvider>
                <AppRouter>
                    <App />
                </AppRouter>
            </GlobalProvider>
        </div>

    )
}


