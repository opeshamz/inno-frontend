import { ErrorBoundary } from "./components/ErrorBoundary";
import AppRouter from "./router/AppRouter";

function App() {

    return (
        <>
            <ErrorBoundary
                onReset={() => {
                    window.location.reload();
                }}
            >
                <AppRouter />
            </ErrorBoundary>
        </>
    );
}

export default App;
