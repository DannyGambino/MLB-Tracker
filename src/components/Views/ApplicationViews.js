import { Outlet, Route, Routes } from "react-router-dom"
import { Programs } from "../programs/Programs"
import { Missions } from "../missions/Mission"

export const ApplicationViews = () => {
	return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1>MLB Tracker</h1>
                    <div>Total Progress</div>

                    <Outlet />
                </>
            }>

                <Route path="/programs" element={ <Programs /> }/>
                <Route path="/missions" element={ <Missions /> }/>
                
            </Route>
        </Routes>
    )
}