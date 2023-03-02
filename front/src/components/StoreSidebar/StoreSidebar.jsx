import './StoreSidebar.styles.scss'
import { Link, useNavigate } from 'react-router-dom'
import { useGetCategorysQuery } from "../../pages/Categorys/CategoryApiSlice"
import { IoIosArrowForward } from 'react-icons/io';

const IndividualCaetegory = ({cat,i,l}) => {
    
    return(
        <div className='stor_indi_cat'>
            <Link to="/dash">{cat.title}</Link>
            <IoIosArrowForward/>
            {cat.child.length > 1 &&
            <div className='stor_indi_right' style={i<=13?{ top: `${-5+(i*-37)}px`}:{bottom: `${0}px`}}>
                {cat.child.map((val) => (
                    <div className='stor_indi_right_sub'>
                    <h3><Link to="/dash">{val.title}</Link></h3>
                    {val.child.map((vall) => (
                        <span><Link to="/dash">{vall.title}</Link></span>
                    ))}</div>
                ))}
            </div>
            }
        </div>
    )
}
const StoreSidebar = () => {
    const {
        data: categorys,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetCategorysQuery('notesList', {
        pollingInterval: 15000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })
    let content

    if (isLoading) content = <h1>Loading... </h1>

    if (isError) {
        content = <p className="errmsg">{error?.data?.message}</p>
    }

    if(isSuccess){
    const {  entities } = categorys
    let primecat = []
    Object.keys(entities).forEach(val => {
        if(entities[val].parentCategory === undefined){
        primecat.push({
            id: entities[val].id,
            title: entities[val].title,
            child: []
        })
        }
    });
    primecat.forEach((value,i) => {
        Object.keys(entities).forEach(val => {
        if(entities[val].parentCategory === value.id){
            primecat[i].child.push({
            id: entities[val].id,
            title: entities[val].title,
            child: []
            })
        }
        });
    });
    primecat.forEach((value,i) => {
        value.child.map((valg,k) => {
            Object.keys(entities).forEach(val => {
                if(entities[val].parentCategory === valg.id){
                    primecat[i].child[k].child.push({
                    id: entities[val].id,
                    title: entities[val].title,
                    child: []
                    })
                }
                });
        })
    });
    let test = primecat.concat(primecat.concat(primecat.concat(primecat.concat(primecat))))
    content = test.map((val,i) => <IndividualCaetegory cat={val} l={test.length}i={i}/>)
    }
    return (
    <>
    <div className='stor_cat'>
        {content} 
    </div>
    </>
    )
}

export default StoreSidebar
