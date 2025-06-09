type CampoProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  id?: string;
};

export default function Campo({ label, id, ...props }: CampoProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={id} className="text-green-900 font-medium">
          {label}
        </label>
      )}
      <input id={id} {...props} className="border rounded px-3 py-2" />
    </div>
  );
}
