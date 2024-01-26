import React from 'react'
import { Link, useNavigate,useLocation } from 'react-router-dom';
import SkeletonSearch from '../components/skeletonSearch';

function Search() {
    const [loading,setLoading]=React.useState(true);
    const location = useLocation ();
    const [searchText, setSearchText] = React.useState('')
    const [searchOpt, setSearchOpt] = React.useState([])
    const navigate = useNavigate()
    const getSearchOpt = async () => {
        if (searchText.length > 0) {
            try {
                const api = await fetch(`http://localhost:5000/api/recipe/search?text=${searchText}`, {
                    method: 'GET',
                    credentials:'include'
                });
                console.log('called')
                if((api.status==401)){
                    navigate('/', { state: { from: location }, replace: true });
                }
                const data = await api.json();
                console.log(data.recipes);
                setLoading(false);
                setSearchOpt(data.recipes || []);
            } catch (error) {
                console.error('Error fetching data:', error);
                setSearchOpt([]);
            }
        }
    };
    React.useEffect(() => {
        let getData=setTimeout(()=>{
            getSearchOpt();
        },1000);
        return ()=> clearTimeout(getData)
    }, [searchText])
    const onChange = (event) => {
        setSearchText(event.target.value)
    }

    const handleClick = () => {
        setSearchText("")
    }

    const handleSubmit = (e) => {
        navigate('/home/searched/'+searchText)
        setSearchText("")
    }

    const Opt = searchOpt.map((opt) => {
        return <Link to={'/home/instructions'} onClick={handleClick} className="link" state={opt._id}>
            <div className="Opt">
                <img src={opt.image} alt="" />
                <div className="Opt-title">{opt.title}</div>
            </div>
        </Link>
    })
    return (
        <div>
            <div className="search">
                <form onSubmit={handleSubmit}>
                    <input className="searchInpt" placeholder="Search Recipes"  type="text" onChange={onChange} value={searchText} />
                </form>
                {searchText.length ? <div style={{ opacity: searchText ? 2 : 0 }} className="searchOption">
                    {loading && <><SkeletonSearch/><SkeletonSearch/><SkeletonSearch/></>}
                    {Opt}
                </div> : null}
            </div>
        </div>
    )
}

export default Search
