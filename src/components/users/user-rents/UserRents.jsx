import { Button } from "react-bootstrap";

export function UserRents(){
    return(
        <div className="container">
            <h2 style={{fontFamily: "-moz-initial"}}>Rents</h2>
            <Button>All</Button>
            <Button>Waiting</Button>
            <Button>In procces</Button>
            <Button>Old</Button>
        </div>
    )
}