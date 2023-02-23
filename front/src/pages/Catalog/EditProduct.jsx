import './Catalog.styles.scss'
import { useParams } from 'react-router-dom'
import { useGetProductQuery, useUpdateProductMutation, useDeleteProductMutation } from './productApiSlice'
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { BsTrash } from 'react-icons/bs';
import { BiSave } from 'react-icons/bi'

const FormInputBlock = ({st,sets,name,dec,id,t}) => {
    const onUsernameChanged = e => sets(e.target.value)
    return(
        <>
        <label className="form_label" htmlFor={id}>
            {name} <span className="nowrap">{dec}</span></label>
        <input
            className={`form_input`}
            id={id}
            name={id}
            type={t === "n" ? "number" : "text"}
            autoComplete="off"
            value={st}
            onChange={onUsernameChanged}
        />
        </>
    )
}
const EditProductIner = ({product}) => {
    const navigate = useNavigate()
    const [updateUser, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateProductMutation()

    const [deleteUser, {
        isSuccess: isDelSuccess,
        isError: isDelError,
        error: delerror
    }] = useDeleteProductMutation()

    const [title, setTitle] = useState(product?.title)
    const [description, setdescription] = useState(product?.description)
    const [price, setPrice] = useState(product?.price)
    const [quantity, setQuantity] = useState(product?.quantity)
    const [minoder, setMinoder] = useState(product?.minoder)
    const [disabled, setDisabled] = useState(product?.disabled)


    useEffect(() => {
        if (isSuccess || isDelSuccess) {
            setTitle('')
            navigate('/dash/catalog')
        }

    }, [isSuccess, isDelSuccess, navigate])


    const onSaveUserClicked = async (e) => {
        await updateUser({ id: product.id,title,description,price,quantity,minoder,disabled  })
    }

    const onDeleteUserClicked = async () => {
        await deleteUser({ id: product.id })
    }

    let canSave = !isLoading
    const errClass = (isError || isDelError) ? "errmsg" : "offscreen"
    const errContent = (error?.data?.message || delerror?.data?.message) ?? ''

    const content = (
        <>
            <form className="edit_form" onSubmit={e => e.preventDefault()}>
                <p className={errClass}>{errContent}</p>
                <div className="form__title_row">
                    <h2>Rediģēt preces "{product?.title}" informāciju</h2>
                    <div className="form_action_buttons">
                        <button
                            className="icon_button_save"
                            title="Save"
                            onClick={onSaveUserClicked}
                            disabled={!canSave}
                        >
                            <BiSave/>
                        </button>
                        <button
                            className="icon_button_delite"
                            title="Delete"
                            onClick={onDeleteUserClicked}
                        >
                            <BsTrash/>
                        </button>
                    </div>
                </div>

                {
                    <>
                    <FormInputBlock st={title} sets={setTitle} name="Nosaukums:" dec="[3-20 burti]" t="t" id="name"/>
                    <FormInputBlock st={description} sets={setdescription} name="Apraksts:" dec="[līdz 250 vārdi]" t="t" id="dec"/>
                    <FormInputBlock st={price} sets={setPrice} name="Cena:" dec="" t="n" id="price"/>
                    <FormInputBlock st={quantity} sets={setQuantity} name="Daudzums:" dec="" t="n" id="quantity"/>
                    <FormInputBlock st={minoder} sets={setMinoder} name="Minimālais dadzums:" dec="" t="n" id="minoder"/>
                    </>
                
                }


                <label className="form_label flex" htmlFor="user-active">
                    Categorija ir aktivizēta: &nbsp;
                    <input
                        className="form__checkbox"
                        id="user-active"
                        name="user-active"
                        type="checkbox"
                        checked={disabled}
                        onChange={()=>setDisabled(prev => !prev)}
                    />
                </label>


            </form>
        </>
    )

    return content
  }
  
const EditProduct = ( ) => {
    const { id } = useParams()
    const { product } = useGetProductQuery("productList", {
        
        selectFromResult: ({ data })  => ({
            
            product: data?.entities[id]
        })
    })
    if(!product) return <h1>Loading...</h1>
    return <EditProductIner product={product}/>
    
}
export default EditProduct
  

  