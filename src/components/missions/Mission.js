import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export const Missions = () => {

    const [missions, setMissions] = useState([])
    const navigate = useNavigate()

    useEffect(
        () => {
            fetch(`http://localhost:8088/mission?programId=${1}`)
            .then(response => response.json())
            .then((missionArray) => {
                setMissions(missionArray)
            })
        },
        []
    )

    return <>

    <h2>Missions</h2>

    <article className="missions">
            {
                missions.map(
                    (mission) => {
                        return <section className="mission" key={`mission--${mission.id}`}>
                            <button onClick={() => navigate("/missions")}>{mission.name}</button>
                            
                        </section>
                    }
                )
            }
        </article>

        {/* <form>
            <input
                required autoFocus
                type="text"
                className="form-control"
                placeholder="Name of Program"
                value={input}
                onChange={
                    (e) => {
                        setInput(e.target.value)
                    }
                } />
            <button
                onClick={(e) => addProgram(e)}
                className="btn btn-primary">
                Add Program
            </button>
        </form> */}
    
    </>
    
}