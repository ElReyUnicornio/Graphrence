type props = {
    children: React.ReactNode;

}

export default function InputError(props: props) {
    if (!props.children) return null;
    return (
        <>
            <span className="font-raleway font-bold">Oops!</span> {props.children}
        </>
    );
}