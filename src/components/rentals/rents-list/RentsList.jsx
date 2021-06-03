import { RentCard } from "../rent-card/RentCard";
export function RentsList({rentals}) {

  return (
    <div className="container">
      {rentals.length !== 0 &&
        rentals.map((x) => {
          return <RentCard key={x.id} info={x}></RentCard>;
        })}
    </div>
  );
}
