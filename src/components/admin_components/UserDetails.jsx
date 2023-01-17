import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import { getOwnedPetsApi } from '../../api/petsApi';

export default function UserDetails({user}) {

    const { id, first_name, last_name, email, phone, is_admin, registered_at, bio } = user;

    const [ownedPets, setOwnedPets] = useState([]);

    async function getOwnedPets() {
        const res = await getOwnedPetsApi(id);
        console.log('res.data', res.data);
        setOwnedPets(res.data);
    }
    

    useEffect(() => {
        getOwnedPets();
        const timer = setTimeout(() => {
          console.log('ownedPets', ownedPets)
        }, 1000);
        return () => clearTimeout(timer);
      }, []);

  return (
    <div>
        <div className='text-center'>
            <h3>{first_name} {last_name} ({ is_admin ? "admin" : "user" })</h3>
        </div>
        <div className='d-flex justify-content-between'>
            <div>
                <h6>Phone: <a href={`tel:${phone}`}>{phone}</a></h6>
                <h6>Email: <a href={`mailto:${email}?subject=Fuck off`}>{email}</a></h6>         
                { bio && <h6>Bio: {bio}</h6>}
            </div>
            <h6>Registered on {registered_at.split('T')[0]} at {registered_at.split('T')[1].slice(0, 8)}</h6>
        </div>
         <div>
            { ownedPets?.length !== 0 &&
            <>
            <hr/>
            <h5>List of pets owned by the user:</h5>
            <table className='owned-pets'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th></th>
                        <th>Adoption Status</th>
                    </tr>
                </thead>
                <tbody>
                    { ownedPets && 
                    ownedPets.map(pet => (
                        <tr key={pet.id}>
                            <td><Link to={`/pets/${pet.id}`} target="_blank" rel="noopener noreferrer">{pet.name}</Link></td>
                            <td>{pet.type}, {pet.age}  year{pet.age !== 1 ? 's' : ''}</td>
                            <td>{pet.adoptionStatus}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </>
            }
         </div>
    </div>
  )
}
