import './Global.scss'
import { Provider } from 'react-redux'
import store from './Redux/Store'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import Application from './Application'
import { Toaster } from 'react-hot-toast'
import Loader from './Components/Common/Loader'
// import Home from './screens/Home'
// import { io } from "socket.io-client";

/**CREATE STORE PERSIST INSTANCE */
let persistor = persistStore(store)

// export const socket: any = io("Your Socket URL comes here", {
//   reconnection: true,
//   transports: ["websocket"],
// });

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Toaster />
        <Loader />
        <Application />
        {/* <Home /> */}
      </PersistGate>
    </Provider>
  )
}

export default App
