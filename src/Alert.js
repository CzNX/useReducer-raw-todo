
const Alert = ({msg,type}) => {

    return (
        
        <div className='alert'>
            <p className={`alert-text ${type}`}>{msg}</p>            
        </div>
    )
}

export default Alert
