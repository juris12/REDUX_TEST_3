import './Categorys.sytles.scss'
const Categorys = () => {
    const catarr = [
      {
        name: 'Dēļi',
        child:[
          {
            name: 'pussVagondēļi',
            child:[
              {
                name: 'Vagondēļi',
                child:null
              }
            ]
          }
        ]
      },
      {
        name: 'Brusas',
        child:null
      },
      {
        name: 'Plāksnes',
        child:[{
          name: 'OSb',
          child:null
        },
        {
          name: 'Saplāksnis',
          child:null
        }]
      },
    ]
    return (
      <>
      <h1>Katalogs</h1>
      <div className='center width_100'>
        <div className='m_auto width_60 category_outer'>
          
        </div>
      </div>
      </>
    )
  }
  
  export default Categorys
  