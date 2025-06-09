type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>;

export default function Select(props: SelectProps) {
  return (
    <select className="border rounded px-3 py-3 text-base" {...props}>
      {props.children}
    </select>
  );
}
