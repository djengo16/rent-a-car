import { RentCard } from "../rent-card/RentCard";
export function RentsList({rentalsFiltered, setRentals}) {

  return (
    <div className="container" >
      {rentalsFiltered.length !== 0 &&
        rentalsFiltered.map((x) => {
          return <RentCard key={x.id} info={x} setRentals={setRentals} />
        })}
    </div>
  );
}
