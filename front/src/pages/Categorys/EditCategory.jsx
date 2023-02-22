import './Categorys.sytles.scss'
import { useNavigate } from 'react-router-dom'


const EditCategory = () => {

    return (
      <>
      <h1>Rediģēt kategorius</h1>
      <div className='center width_100'>
        <div className='m_auto width_60'>
          <div className='categorija_indiv' style={{backgroundColor:'rgb(243, 243, 243)'}}>
            <span>Nosaukums</span>
            <span></span>
          </div>
          
        </div>
      </div>
      </>
    )
  }
  
  export default EditCategory
  

  