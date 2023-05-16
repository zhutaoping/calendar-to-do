interface Props {
  title: string;
  disabled?: boolean;
}

export default function SubmitButton({ title, disabled }: Props) {
  return (
    <button
      className="focus-ring mt-6 box-border w-full rounded-md bg-primary px-4 py-2 text-center text-sm text-white focus-visible:ring-0 disabled:animate-pulse disabled:cursor-not-allowed"
      type="submit"
      disabled={disabled}
    >
      {title}
    </button>
  );
}
