type props = {
    children: React.ReactNode;
}

export default function Heading(props: props) {
  return (
    <h1 className="text-3xl font-bold font-raleway dark:text-white">{props.children}</h1>
  );
}