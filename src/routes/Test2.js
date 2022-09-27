const Test2 = (props) => {
    return (
        <div>
            I'm parent
            <div>{props.children}</div>
        </div>
    )
}
export default Test2;