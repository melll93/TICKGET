import {Link, useParams} from 'react-router-dom'

function ProductsDetails(props){
    let {id} =useParams();
  
    return(
      <>
      <div className="container">
        <div className="row">
          <div className="cols-md-6">
          <img src={'../images_key/fev'+[id]+'.PNG'} width="50%" alt="상품사진" />
          </div>
                <h2>
                    상품 상세페이지......
                    </h2>
                    <a href={"/payment/"+[id]}>
           <h2>
            결제하기
            </h2>
            </a>
          </div>
        </div>
       </>
    )
  }

export default ProductsDetails;