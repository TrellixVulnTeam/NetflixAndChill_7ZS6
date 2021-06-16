import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Pagination = (props) => {
  const pageNumbers = [];

  const paginate = () => {
    for (var i = 1; i <= Math.ceil(props.pages / 100); i++) {
      pageNumbers.push(i);
    }
  };
  return (
    <div>
      {paginate()}

      
        <div id="pagination" className='d-flex justify-content-center'>
          {pageNumbers
            .filter((number) => number <= props.end && number >= props.start)
            .map((num) => (
              <div className="page-item" key={num}>
                {(num === props.curPage && (
                  <Link
                    to={`/movies/${num}`}

                    style={{
                      color: "pink",
                    }}
                    onClick={() => {
                      props.setCurPage(num);
                    }}
                  >
                    {num}
                  </Link>
                )) || (
                  <Link
                    to={`/movies/${num}`}
                    
                    onClick={() => {
                      props.setCurPage(num);
                      props.setPending(true);
                    }}
                  >
                    {num}
                  </Link>
                )}
              </div>
            ))}


        </div>
        <p className='text-center'>{Math.floor(props.pages / 100)} total pages</p>
    </div>
  );
};

export default Pagination;
