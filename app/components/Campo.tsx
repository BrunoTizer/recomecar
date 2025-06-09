type CampoProps = React.InputHTMLAttributes<HTMLInputElement>;

export default function Input(props: CampoProps) {
  return <input className="border rounded px-3 py-2" {...props} />;
}
