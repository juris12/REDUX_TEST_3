import './StoreCategory.styles.scss'
import { useParams } from 'react-router-dom'
import { useGetCategorysQuery } from "../../pages/Categorys/CategoryApiSlice"
import { Link } from 'react-router-dom'

const StoreCategory = () => {
  const { id } = useParams()
  const {
    data: categorys,
    isLoading,
    isSuccess,
    isError,
    error
} = useGetCategorysQuery('notesList')
let content
let meincat
if (isLoading) content = <h1>Loading... </h1>

if (isError) {
    content = <p className="errmsg">{error?.data?.message}</p>
}
let primecat = []
const {  entities } = categorys

if(isSuccess && entities[id]){
  Object.keys(entities).forEach(val => {
      if(entities[val].parentCategory === id){
      primecat.push({
          id: entities[val].id,
          title: entities[val].title,
          imgurl: entities[val].imgurl,
          child: []
      })
      }
  });
  Object.keys(entities).forEach(val => {
    primecat.forEach(vll => {
      if(entities[val].parentCategory === vll.id){
        vll.child.push({
            id: entities[val].id,
            title: entities[val].title,
            imgurl: entities[val].imgurl,
            child: []
        })
        }
    })
  });
  content = (
    <>
    <h1 className='store_cat_title' style={{backgroundImage: `url(${entities[id].imgurl})`}}>{entities[id].title}</h1>
    <div className='store_cat_outer' >
        {primecat.map((val) => (
            <div className='store_cat_iner'>
              <Link to={`/${val.id}`} className="store_cat_img" ><img src={val.imgurl} alt={val.title} /></Link>
              <div className='store_cat_iner_links'>
                <h3><Link to={`/${val.id}`}>{val.title}</Link></h3>
                {val.child.map((vall) => (
                    <span><Link to={`/${vall.id}`}>{vall.title}</Link></span>
                ))}
              </div>
            </div>
        ))}
    </div>
    </>
  )
}
  return <div className='outer_store_comp'>{content}</div>
}

export default StoreCategory