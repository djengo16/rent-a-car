import {MdPhoneAndroid, MdEmail} from 'react-icons/md'
import {FaSellsy} from 'react-icons/fa'
import {Row, Col, Image} from 'react-bootstrap'
import {BsFillPersonFill} from 'react-icons/bs'
import { useEffect } from 'react';
import { useState } from 'react';
import { getUserById } from '../../../core/services/usersService';
import './userInfo.css'

export function UserInfo({userId}){
    const [user, setUser] = useState({});

    useEffect(()=> {
      getUserById(userId).then(res => {
        setUser(res.data)
      })
    }, [userId])


    return(
        <div id="profile-head">
        <div className="container">
            <Row className="profile-row">
                <Col lg={2} md={5} sm={12}>
                    <Image roundedCircle  id="avatar" alt="avatar" src={user.avatar} />
                </Col>
                <Col lg={3} md={3} sm={12}>
                    <p><BsFillPersonFill /> {user.fullName}</p>
                    <p><MdEmail /> {user.email}</p>
                    <p><MdPhoneAndroid /> +{user.phone}</p>
                    <p><FaSellsy /> {user.totalRents} rents in total</p>
                </Col>
                <span id="edit-icon">
                    {/* <Link to={`/profile/${params.id}/edit`}><GrEdit /></Link> */}
                </span>
            </Row>
        </div>
    </div>
    )
}