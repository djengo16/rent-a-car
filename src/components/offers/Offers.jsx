import styles from './offers.module.css'
export function Offers(){
    return (
        <div className="container" id={styles["offersWrapper"]}>
            <h1 className={styles["offersText"]}>Offers</h1>
            <ul className={styles["offersList"]}>
                <li className={styles['offersListItem']}>Become a VIP CUSTOMER AND GET 15% Discount for every vehicle</li>
                <li>You can become VIP if you have rented a vehicle more than 3 times in the last 60 days.</li>
                <br/>
                <li className={styles['offersListItem']}>You can also get discount if the rental period is:</li>
                <li>More than 3 days - 5% discount.</li>
                <li>More than 5 days - 7% discount.</li>
                <li>More than 10 days - 10% discount.</li>
            </ul>
        </div>
    )
}