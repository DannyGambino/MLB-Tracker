import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"

// Declare and define the Programs functional component
export const Programs = () => {

    // Declare state variables using the useState Hook
    const [programs, setPrograms] = useState([])
    const [user, setUser] = useState({})
    const [input, setInput] = useState("")
    const [userPrograms, setUserPrograms] = useState([])

    // Create a navigate function using the useNavigate Hook from react-router-dom
    const navigate = useNavigate()

    const getPrograms = () => {
        fetch(`http://localhost:8088/program`)
            .then(response => response.json())
            .then((programArray) => {

                // Update the programOptions and programs state with the response from the server
                setPrograms(programArray)
                if (input === "") {

                    // If the input state is an empty string, set it with the id of the first program in the programArray
                    setInput(programArray[0].id);
                }
            })
    }

    const getUserPrograms = () => {
        fetch(`http://localhost:8088/userPrograms?userId=${JSON.parse(localStorage.getItem("user")).id}`)
            .then(response => response.json())
            .then((userPrograms) => {

                setUserPrograms(userPrograms)
            })
    }

    // Declare and define the addProgram function
    const addProgram = (e) => {

        e.preventDefault() // Prevent the default form submit action

        // Prepare the new user object with the new program added to its programs array
        const newUserProgram = {
            programId: parseInt(input),
            userId: user.id
        }

        fetch(`http://localhost:8088/userPrograms`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newUserProgram)
        })
            .then(response => response.json())
            .then(result => {

                getUserPrograms()
            })

        fetch(`http://localhost:8088/missionSets?programId=${parseInt(input)}`)
            .then(response => response.json())
            .then((set) => {
                set.userId = user.id
                console.log(set)
                return fetch(`http://localhost:8088/mission`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(set)
                })
            })
    }

    // Fetch the user data from the server when the component mounts
    useEffect(
        () => {
            fetch(`http://localhost:8088/users?id=${JSON.parse(localStorage.getItem("user")).id}`)
                .then(response => response.json())
                .then((user) => {

                    // Update the user state with the response from the server
                    setUser(user[0])
                })
        },
        [] // empty dependency array ensures this useEffect runs only once, when the component mounts
    )

    // Fetch the program data from the server when the component mounts
    useEffect(
        () => {
            getPrograms()
        },
        [] // empty dependency array ensures this useEffect runs only once, when the component mounts
    )

    useEffect(
        () => {
            getUserPrograms()
        },
        []
    )

    // Define a function to remove a program
    const deleteProgram = (programId) => {


    }

    // Return the JSX to render
    return <>

        <h2>Programs</h2>

        {/* Map over the programs array to render a list of programs */}
        <article className="programs">
            {
                programs.filter(program => userPrograms.some(userProgram => userProgram.programId === program.id)).map(
                    (program) => {
                        return <section className="program" key={`program--${program.id}`}>

                            {/* On clicking a program, navigate to the /missions route */}

                            <button onClick={() => navigate("/missions")}>{program.name}</button>
                            <button
                                onClick={() => deleteProgram(program.id)}
                                className="btn btn-primary">
                                Delete
                            </button>
                        </section>
                    }
                )
            }
        </article>

        {/* Form to add a program */}
        <form>
            <select
                required autoFocus
                className="form-control"
                placeholder="placeholder"
                value={input}
                onChange={(e) => {

                    // On changing the select input, update the input state with the selected option's value
                    setInput(e.target.value);
                }}
            >

                {/* Map over the programOptions array to render a list of program options */}
                {programs.filter(program => userPrograms.some(userProgram => userProgram.programId !== program.id)).map(program => <option key={program.id} value={program.id}>{program.name}</option>)}
            </select>

            {/* On clicking the Add Program button, call the addProgram function */}
            <button
                onClick={(e) => addProgram(e)}
                className="btn btn-primary">
                Add Program
            </button>

        </form>
    </>
}
