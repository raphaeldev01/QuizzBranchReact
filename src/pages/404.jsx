import { FileX2 } from "lucide-react"
import Header from "../components/header/Header"


export default () => {
    return (
        <div>
            <Header />
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", gap: "10px", fontSize: "30px" }}>
                <FileX2 size="60px" />
                <h1>404</h1>
            </div>
        </div>
    )
}