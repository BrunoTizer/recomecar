type FeedbackProps = { children: React.ReactNode; className?: string };

export default function Feedback({ children, className }: FeedbackProps) {
  return (
    <div className={`text-center mt-16 ${className || ""}`}>{children}</div>
  );
}
