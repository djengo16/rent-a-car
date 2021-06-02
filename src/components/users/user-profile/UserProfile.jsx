import { UserInfo } from '../user-info/UserInfo';
import { UserRentals } from '../user-rents/UserRentals';

export function UserProfile({computedMatch}){

    return(
        <>
        <UserInfo userId={computedMatch.params.id} />
        <UserRentals computedMatch={computedMatch} />
        </>
    )
}