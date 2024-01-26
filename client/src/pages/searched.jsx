import React from 'react'
import { useParams } from 'react-router-dom'
import Pop from '../components/pop';
import SkeletonCard from '../components/skeletonCard';
import { Link, useNavigate, useLocation } from 'react-router-dom';

function Searched(props) {
    const [loading, setLoading] = React.useState(true);
    const location = useLocation();
    const navigate = useNavigate();
    let { search } = useParams();
    const [res, setRes] = React.useState([]);
    const [userId, setUserId] = React.useState("");
    const getUser_Id = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/user/getUser_Id', {
                method: 'GET',
                credentials: 'include'
            });
            if ((response.status == 401)) {
                navigate('/', { state: { from: location }, replace: true });
            }
            const data = await response.json();
            setUserId(data.id);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    const getRes = async () => {
        try {
            const api = await fetch(`http://localhost:5000/api/recipe/search?text=${search}`, {
                method: 'GET',
                credentials: 'include'
            });
            if (api.status == 401) {
                navigate('/', { state: { from: location }, replace: true });
            }
            const data = await api.json();
            setRes(data.recipes);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
        }

    };
    React.useEffect(() => {
        getRes();
        getUser_Id();
    }, []);

    const disp = res && res.length === 0 ? "No Recipes Here":res.map((food) => {
        return <Pop userId={userId} favFood={props.favFood} setFavFood={props.setFavFood} pop={res} key={food._id} popFood={food} />
    })

    return (
        <div className='pop-cont'>
            <h2>Results for {search}</h2>
            <div className='popular'>
                {loading && <><SkeletonCard /><SkeletonCard /><SkeletonCard /><SkeletonCard /><SkeletonCard /></>}
                {disp}
            </div>
        </div>
    );
}

export default Searched
