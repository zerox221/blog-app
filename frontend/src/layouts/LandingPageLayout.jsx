import { Outlet } from "react-router-dom"

const LandingPageLayout = ()=>{
    return (
        <div className="h-screen w-full">
            <Outlet/>
        </div>
    )
}

export default LandingPageLayout