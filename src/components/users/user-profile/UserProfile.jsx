import { useEffect } from 'react';
import { UserInfo } from '../user-info/UserInfo';
import { UserRents } from '../user-rents/UserRents';

export function UserProfile({computedMatch}){

    return(
        <>
        <UserInfo userId={computedMatch.params.id} />
        <UserRents computedMatch={computedMatch} />
        </>
    )
}